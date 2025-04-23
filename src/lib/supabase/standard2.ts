import { supabase } from './client';
import { Standard2Submission, Standard2Draft, Standard2Feedback, Standard2Grade } from '../../types/standard2';

export async function saveStandard2Draft(
  studentId: string,
  content: Standard2Submission['content']
): Promise<Standard2Draft> {
  const { data, error } = await supabase
    .from('standard2_drafts')
    .upsert({
      student_id: studentId,
      content,
      last_updated: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function submitStandard2Assessment(
  studentId: string,
  content: Standard2Submission['content']
): Promise<Standard2Submission> {
  const { data: submission, error: submissionError } = await supabase
    .from('standard2_submissions')
    .insert({
      student_id: studentId,
      content,
      submitted_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (submissionError) throw submissionError;

  const { error: assessmentError } = await supabase
    .from('standard2_assessments')
    .upsert({
      student_id: studentId,
      submission_id: submission.id,
      status: 'submitted',
      submitted_at: new Date().toISOString(),
    });

  if (assessmentError) throw assessmentError;

  return submission;
}

export async function getStandard2Assessment(studentId: string) {
  const { data: assessment, error: assessmentError } = await supabase
    .from('standard2_assessments')
    .select(`
      *,
      submission:standard2_submissions(*),
      draft:standard2_drafts(*)
    `)
    .eq('student_id', studentId)
    .single();

  if (assessmentError) throw assessmentError;

  const { data: feedback, error: feedbackError } = await supabase
    .from('standard2_feedback')
    .select('*')
    .eq('submission_id', assessment.submission_id);

  if (feedbackError) throw feedbackError;

  return {
    assessment,
    feedback: feedback || [],
  };
}

export async function gradeStandard2Submission(
  submissionId: string,
  instructorId: string,
  score: number,
  rubricScores: Standard2Grade['rubricScores']
): Promise<Standard2Grade> {
  const { data: grade, error: gradeError } = await supabase
    .from('standard2_grades')
    .insert({
      submission_id: submissionId,
      instructor_id: instructorId,
      score,
      rubric_scores: rubricScores,
      graded_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (gradeError) throw gradeError;

  const { error: assessmentError } = await supabase
    .from('standard2_assessments')
    .update({
      score,
      rubric_scores: rubricScores,
      graded_at: new Date().toISOString(),
      status: 'graded',
    })
    .eq('submission_id', submissionId);

  if (assessmentError) throw assessmentError;

  return grade;
}

export async function resubmitStandard2Assessment(
  studentId: string,
  content: Standard2Submission['content'],
  previousSubmissionId: string
): Promise<Standard2Submission> {
  const { data: submission, error: submissionError } = await supabase
    .from('standard2_submissions')
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
    .from('standard2_assessments')
    .update({
      submission_id: submission.id,
      status: 'resubmitted',
      submitted_at: new Date().toISOString(),
      attempt_number: supabase.raw('attempt_number + 1'),
    })
    .eq('student_id', studentId);

  if (assessmentError) throw assessmentError;

  return submission;
}

export async function getStandard2Feedback(submissionId: string): Promise<Standard2Feedback[]> {
  const { data, error } = await supabase
    .from('standard2_feedback')
    .select('*')
    .eq('submission_id', submissionId);

  if (error) throw error;
  return data || [];
}

export async function addStandard2Feedback(
  submissionId: string,
  instructorId: string,
  content: Standard2Feedback['content']
): Promise<Standard2Feedback> {
  const { data, error } = await supabase
    .from('standard2_feedback')
    .insert({
      submission_id: submissionId,
      instructor_id: instructorId,
      content,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
} 