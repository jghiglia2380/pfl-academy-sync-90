import { supabase } from './client';
import {
  Standard3Submission,
  Standard3Draft,
  Standard3Feedback,
  Standard3Grade,
  CreditManagementSubmission,
} from '../../types/standard3';

export async function saveStandard3Draft(
  studentId: string,
  content: CreditManagementSubmission
): Promise<Standard3Draft> {
  const { data, error } = await supabase
    .from('standard3_drafts')
    .upsert(
      {
        student_id: studentId,
        content,
        last_updated: new Date().toISOString(),
      },
      { onConflict: 'student_id' }
    )
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function submitStandard3Assessment(
  studentId: string,
  content: CreditManagementSubmission
): Promise<Standard3Submission> {
  const { data: submission, error: submissionError } = await supabase
    .from('standard3_submissions')
    .insert({
      student_id: studentId,
      content,
      submitted_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (submissionError) throw submissionError;

  const { error: assessmentError } = await supabase
    .from('standard3_assessments')
    .upsert(
      {
        student_id: studentId,
        submission_id: submission.id,
        status: 'submitted',
        submitted_at: new Date().toISOString(),
      },
      { onConflict: 'student_id' }
    );

  if (assessmentError) throw assessmentError;

  return submission;
}

export async function getStandard3Assessment(
  studentId: string
): Promise<{
  assessment: any;
  feedback: Standard3Feedback[];
}> {
  const { data: assessment, error: assessmentError } = await supabase
    .from('standard3_assessments')
    .select(`
      *,
      submission:standard3_submissions(*),
      draft:standard3_drafts(*)
    `)
    .eq('student_id', studentId)
    .single();

  if (assessmentError) throw assessmentError;

  const { data: feedback, error: feedbackError } = await supabase
    .from('standard3_feedback')
    .select('*')
    .eq('submission_id', assessment.submission_id);

  if (feedbackError) throw feedbackError;

  return {
    assessment,
    feedback: feedback || [],
  };
}

export async function gradeStandard3Submission(
  submissionId: string,
  instructorId: string,
  score: number,
  rubric: {
    creditScoreAnalysis: number;
    creditReportAnalysis: number;
    creditManagementPlan: number;
  }
): Promise<Standard3Grade> {
  const { data: grade, error: gradeError } = await supabase
    .from('standard3_grades')
    .insert({
      submission_id: submissionId,
      instructor_id: instructorId,
      score,
      rubric,
      graded_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (gradeError) throw gradeError;

  const { error: assessmentError } = await supabase
    .from('standard3_assessments')
    .update({
      status: 'graded',
      score,
      rubric,
      graded_at: new Date().toISOString(),
    })
    .eq('submission_id', submissionId);

  if (assessmentError) throw assessmentError;

  return grade;
}

export async function resubmitStandard3Assessment(
  studentId: string,
  content: CreditManagementSubmission,
  previousSubmissionId: string
): Promise<Standard3Submission> {
  const { data: submission, error: submissionError } = await supabase
    .from('standard3_submissions')
    .insert({
      student_id: studentId,
      content,
      previous_submission_id: previousSubmissionId,
      submitted_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (submissionError) throw submissionError;

  const { error: assessmentError } = await supabase
    .from('standard3_assessments')
    .update({
      submission_id: submission.id,
      status: 'submitted',
      submitted_at: new Date().toISOString(),
      attempt_number: supabase.raw('attempt_number + 1'),
    })
    .eq('student_id', studentId);

  if (assessmentError) throw assessmentError;

  return submission;
}

export async function getStandard3Feedback(
  submissionId: string
): Promise<Standard3Feedback[]> {
  const { data, error } = await supabase
    .from('standard3_feedback')
    .select('*')
    .eq('submission_id', submissionId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function addStandard3Feedback(
  submissionId: string,
  instructorId: string,
  content: {
    creditScoreAnalysis: string;
    creditReportAnalysis: string;
    creditManagementPlan: string;
  }
): Promise<Standard3Feedback> {
  const { data, error } = await supabase
    .from('standard3_feedback')
    .insert({
      submission_id: submissionId,
      instructor_id: instructorId,
      content,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
} 