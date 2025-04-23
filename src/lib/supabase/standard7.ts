import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/lib/database.types';
import {
  BorrowingSubmission,
  Standard7Assessment,
  Standard7Draft,
  Standard7Feedback,
  Standard7Grade,
  Standard7Submission
} from '@/types/standard7';

export async function saveStandard7Draft(
  supabase: SupabaseClient<Database>,
  studentId: string,
  content: Partial<BorrowingSubmission>
): Promise<Standard7Draft> {
  const { data, error } = await supabase
    .from('standard7_drafts')
    .upsert({
      student_id: studentId,
      content,
      last_updated: new Date().toISOString()
    })
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

export async function submitStandard7Assessment(
  supabase: SupabaseClient<Database>,
  studentId: string,
  content: BorrowingSubmission,
  assessmentId: string
): Promise<{ submission: Standard7Submission; assessment: Standard7Assessment }> {
  const { data: submission, error: submissionError } = await supabase
    .from('standard7_submissions')
    .insert({
      student_id: studentId,
      content
    })
    .select('*')
    .single();

  if (submissionError) throw submissionError;

  const { data: assessment, error: assessmentError } = await supabase
    .from('standard7_assessments')
    .update({
      submission_id: submission.id,
      status: 'submitted',
      submitted_at: new Date().toISOString()
    })
    .eq('id', assessmentId)
    .select('*')
    .single();

  if (assessmentError) throw assessmentError;

  return { submission, assessment };
}

export async function getStandard7Assessment(
  supabase: SupabaseClient<Database>,
  assessmentId: string
): Promise<Standard7Assessment> {
  const { data, error } = await supabase
    .from('standard7_assessments')
    .select(`
      *,
      submission:standard7_submissions(*),
      draft:standard7_drafts(*),
      grade:standard7_grades(*),
      feedback:standard7_feedback(*)
    `)
    .eq('id', assessmentId)
    .single();

  if (error) throw error;
  return data;
}

export async function gradeStandard7Submission(
  supabase: SupabaseClient<Database>,
  submissionId: string,
  instructorId: string,
  score: number,
  rubric: Standard7Grade['rubric'],
  assessmentId: string
): Promise<{ grade: Standard7Grade; assessment: Standard7Assessment }> {
  const { data: grade, error: gradeError } = await supabase
    .from('standard7_grades')
    .insert({
      submission_id: submissionId,
      instructor_id: instructorId,
      score,
      rubric
    })
    .select('*')
    .single();

  if (gradeError) throw gradeError;

  const { data: assessment, error: assessmentError } = await supabase
    .from('standard7_assessments')
    .update({
      status: 'completed',
      score,
      rubric,
      graded_at: new Date().toISOString()
    })
    .eq('id', assessmentId)
    .select('*')
    .single();

  if (assessmentError) throw assessmentError;

  return { grade, assessment };
}

export async function resubmitStandard7Assessment(
  supabase: SupabaseClient<Database>,
  studentId: string,
  content: BorrowingSubmission,
  previousSubmissionId: string,
  assessmentId: string
): Promise<{ submission: Standard7Submission; assessment: Standard7Assessment }> {
  const { data: submission, error: submissionError } = await supabase
    .from('standard7_submissions')
    .insert({
      student_id: studentId,
      content,
      previous_submission_id: previousSubmissionId
    })
    .select('*')
    .single();

  if (submissionError) throw submissionError;

  const { data: assessment, error: assessmentError } = await supabase
    .from('standard7_assessments')
    .update({
      submission_id: submission.id,
      status: 'submitted',
      submitted_at: new Date().toISOString(),
      attempt_number: supabase.sql`attempt_number + 1`
    })
    .eq('id', assessmentId)
    .select('*')
    .single();

  if (assessmentError) throw assessmentError;

  return { submission, assessment };
}

export async function getStandard7Feedback(
  supabase: SupabaseClient<Database>,
  submissionId: string
): Promise<Standard7Feedback[]> {
  const { data, error } = await supabase
    .from('standard7_feedback')
    .select('*')
    .eq('submission_id', submissionId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
}

export async function addStandard7Feedback(
  supabase: SupabaseClient<Database>,
  submissionId: string,
  instructorId: string,
  content: string
): Promise<Standard7Feedback> {
  const { data, error } = await supabase
    .from('standard7_feedback')
    .insert({
      submission_id: submissionId,
      instructor_id: instructorId,
      content
    })
    .select('*')
    .single();

  if (error) throw error;
  return data;
} 