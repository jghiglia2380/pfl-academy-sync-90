import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../types/supabase';
import { Standard6Submission, Standard6Assessment, Standard6Feedback } from '../../types/database';
import { TaxAnalysis, DeductionPlan, TaxStrategy } from '../../types/standard6';

const supabase = createClientComponentClient<Database>();

export async function saveStandard6Draft(
  studentId: string,
  data: {
    taxAnalysis: TaxAnalysis;
    deductionPlan: DeductionPlan;
    taxStrategy: TaxStrategy;
    calculationWorksheet?: string;
  }
) {
  const { data: draft, error } = await supabase
    .from('standard6_drafts')
    .upsert({
      student_id: studentId,
      content: data,
      last_updated: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return draft;
}

export async function submitStandard6Assessment(
  studentId: string,
  data: {
    taxAnalysis: TaxAnalysis;
    deductionPlan: DeductionPlan;
    taxStrategy: TaxStrategy;
    calculationWorksheet?: string;
    attachments?: string[];
  }
) {
  const { data: submission, error: submissionError } = await supabase
    .from('standard6_submissions')
    .insert({
      student_id: studentId,
      content: data,
      submitted_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (submissionError) throw submissionError;

  const { error: assessmentError } = await supabase
    .from('standard6_assessments')
    .upsert({
      student_id: studentId,
      submission_id: submission.id,
      status: 'submitted',
      max_score: 100,
      submitted_at: new Date().toISOString(),
      last_updated: new Date().toISOString(),
    });

  if (assessmentError) throw assessmentError;

  return submission;
}

export async function getStandard6Assessment(studentId: string): Promise<Standard6Assessment | null> {
  const { data, error } = await supabase
    .from('standard6_assessments')
    .select(`
      *,
      submission:standard6_submissions(*),
      draft:standard6_drafts(*),
      feedback:standard6_feedback(*)
    `)
    .eq('student_id', studentId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // No rows found
    throw error;
  }

  return data;
}

export async function gradeStandard6Submission(
  submissionId: string,
  instructorId: string,
  data: {
    score: number;
    feedback: string;
    rubricScores: {
      taxAnalysis: number;
      deductionPlanning: number;
      strategyDevelopment: number;
    };
    status: 'graded' | 'resubmit_requested';
  }
) {
  const { error: gradeError } = await supabase
    .from('standard6_grades')
    .upsert({
      submission_id: submissionId,
      instructor_id: instructorId,
      score: data.score,
      rubric_scores: data.rubricScores,
      graded_at: new Date().toISOString(),
    });

  if (gradeError) throw gradeError;

  const { error: feedbackError } = await supabase
    .from('standard6_feedback')
    .insert({
      submission_id: submissionId,
      instructor_id: instructorId,
      content: data.feedback,
      created_at: new Date().toISOString(),
    });

  if (feedbackError) throw feedbackError;

  const { error: assessmentError } = await supabase
    .from('standard6_assessments')
    .update({
      status: data.status,
      current_score: data.score,
      graded_at: new Date().toISOString(),
      instructor_id: instructorId,
      last_updated: new Date().toISOString(),
    })
    .eq('submission_id', submissionId);

  if (assessmentError) throw assessmentError;
}

export async function resubmitStandard6Assessment(
  studentId: string,
  originalSubmissionId: string,
  data: {
    taxAnalysis: TaxAnalysis;
    deductionPlan: DeductionPlan;
    taxStrategy: TaxStrategy;
    calculationWorksheet?: string;
    attachments?: string[];
  }
) {
  // Get the current assessment to increment attempt number
  const { data: currentAssessment, error: assessmentError } = await supabase
    .from('standard6_assessments')
    .select('attempt_number')
    .eq('student_id', studentId)
    .single();

  if (assessmentError) throw assessmentError;

  const { data: submission, error: submissionError } = await supabase
    .from('standard6_submissions')
    .insert({
      student_id: studentId,
      content: data,
      submitted_at: new Date().toISOString(),
      previous_submission_id: originalSubmissionId,
    })
    .select()
    .single();

  if (submissionError) throw submissionError;

  const { error: updateError } = await supabase
    .from('standard6_assessments')
    .update({
      submission_id: submission.id,
      status: 'resubmitted',
      current_score: null,
      submitted_at: new Date().toISOString(),
      graded_at: null,
      attempt_number: (currentAssessment?.attempt_number || 1) + 1,
      last_updated: new Date().toISOString(),
    })
    .eq('student_id', studentId);

  if (updateError) throw updateError;

  return submission;
}

export async function getStandard6Feedback(submissionId: string): Promise<Standard6Feedback[]> {
  const { data, error } = await supabase
    .from('standard6_feedback')
    .select(`
      *,
      instructor:profiles(*)
    `)
    .eq('submission_id', submissionId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function addStandard6Feedback(
  submissionId: string,
  instructorId: string,
  feedback: string
) {
  const { data, error } = await supabase
    .from('standard6_feedback')
    .insert({
      submission_id: submissionId,
      instructor_id: instructorId,
      content: feedback,
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
} 