import { supabase } from './client';
import {
  Standard5Submission,
  Standard5Draft,
  Standard5Feedback,
  Standard5Grade,
  RiskManagementSubmission,
} from '../../types/standard5';

export async function saveStandard5Draft(
  studentId: string,
  content: RiskManagementSubmission
): Promise<Standard5Draft> {
  const { data, error } = await supabase
    .from('standard5_drafts')
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

export async function submitStandard5Assessment(
  studentId: string,
  content: RiskManagementSubmission
): Promise<Standard5Submission> {
  const { data: submission, error: submissionError } = await supabase
    .from('standard5_submissions')
    .insert({
      student_id: studentId,
      content,
      submitted_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (submissionError) throw submissionError;

  const { error: assessmentError } = await supabase
    .from('standard5_assessments')
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

export async function getStandard5Assessment(
  studentId: string
): Promise<{
  assessment: any;
  feedback: Standard5Feedback[];
}> {
  const { data: assessment, error: assessmentError } = await supabase
    .from('standard5_assessments')
    .select(`
      *,
      submission:standard5_submissions(*),
      draft:standard5_drafts(*)
    `)
    .eq('student_id', studentId)
    .single();

  if (assessmentError) throw assessmentError;

  const { data: feedback, error: feedbackError } = await supabase
    .from('standard5_feedback')
    .select('*')
    .eq('submission_id', assessment.submission_id);

  if (feedbackError) throw feedbackError;

  return {
    assessment,
    feedback: feedback || [],
  };
}

export async function gradeStandard5Submission(
  submissionId: string,
  instructorId: string,
  score: number,
  rubric: {
    riskAssessment: number;
    riskManagementPlan: number;
  }
): Promise<Standard5Grade> {
  const { data: grade, error: gradeError } = await supabase
    .from('standard5_grades')
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
    .from('standard5_assessments')
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

export async function resubmitStandard5Assessment(
  studentId: string,
  content: RiskManagementSubmission,
  previousSubmissionId: string
): Promise<Standard5Submission> {
  const { data: submission, error: submissionError } = await supabase
    .from('standard5_submissions')
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
    .from('standard5_assessments')
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

export async function getStandard5Feedback(
  submissionId: string
): Promise<Standard5Feedback[]> {
  const { data, error } = await supabase
    .from('standard5_feedback')
    .select('*')
    .eq('submission_id', submissionId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function addStandard5Feedback(
  submissionId: string,
  instructorId: string,
  content: {
    riskAssessment: string;
    riskManagementPlan: string;
  }
): Promise<Standard5Feedback> {
  const { data, error } = await supabase
    .from('standard5_feedback')
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