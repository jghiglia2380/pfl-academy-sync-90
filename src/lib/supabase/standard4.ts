import { supabase } from './client';
import {
  Standard4Submission,
  Standard4Draft,
  Standard4Feedback,
  Standard4Grade,
  InvestmentPlanningSubmission,
} from '../../types/standard4';

export async function saveStandard4Draft(
  studentId: string,
  content: InvestmentPlanningSubmission
): Promise<Standard4Draft> {
  const { data, error } = await supabase
    .from('standard4_drafts')
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

export async function submitStandard4Assessment(
  studentId: string,
  content: InvestmentPlanningSubmission
): Promise<Standard4Submission> {
  const { data: submission, error: submissionError } = await supabase
    .from('standard4_submissions')
    .insert({
      student_id: studentId,
      content,
      submitted_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (submissionError) throw submissionError;

  const { error: assessmentError } = await supabase
    .from('standard4_assessments')
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

export async function getStandard4Assessment(
  studentId: string
): Promise<{
  assessment: any;
  feedback: Standard4Feedback[];
}> {
  const { data: assessment, error: assessmentError } = await supabase
    .from('standard4_assessments')
    .select(`
      *,
      submission:standard4_submissions(*),
      draft:standard4_drafts(*)
    `)
    .eq('student_id', studentId)
    .single();

  if (assessmentError) throw assessmentError;

  const { data: feedback, error: feedbackError } = await supabase
    .from('standard4_feedback')
    .select('*')
    .eq('submission_id', assessment.submission_id);

  if (feedbackError) throw feedbackError;

  return {
    assessment,
    feedback: feedback || [],
  };
}

export async function gradeStandard4Submission(
  submissionId: string,
  instructorId: string,
  score: number,
  rubric: {
    investmentAnalysis: number;
    investmentStrategy: number;
    investmentPlan: number;
  }
): Promise<Standard4Grade> {
  const { data: grade, error: gradeError } = await supabase
    .from('standard4_grades')
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
    .from('standard4_assessments')
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

export async function resubmitStandard4Assessment(
  studentId: string,
  content: InvestmentPlanningSubmission,
  previousSubmissionId: string
): Promise<Standard4Submission> {
  const { data: submission, error: submissionError } = await supabase
    .from('standard4_submissions')
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
    .from('standard4_assessments')
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

export async function getStandard4Feedback(
  submissionId: string
): Promise<Standard4Feedback[]> {
  const { data, error } = await supabase
    .from('standard4_feedback')
    .select('*')
    .eq('submission_id', submissionId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function addStandard4Feedback(
  submissionId: string,
  instructorId: string,
  content: {
    investmentAnalysis: string;
    investmentStrategy: string;
    investmentPlan: string;
  }
): Promise<Standard4Feedback> {
  const { data, error } = await supabase
    .from('standard4_feedback')
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