import { supabase } from './client';
import { Standard1Submission, Standard1Draft, Standard1Feedback, Standard1Grade } from '../../types/standard1';

export async function saveStandard1Draft(
  studentId: string,
  content: Standard1Submission['content']
): Promise<Standard1Draft> {
  const { data, error } = await supabase
    .from('standard1_drafts')
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

export async function submitStandard1Assessment(
  studentId: string,
  content: Standard1Submission['content']
): Promise<Standard1Submission> {
  const { data: submission, error: submissionError } = await supabase
    .from('standard1_submissions')
    .insert({
      student_id: studentId,
      content,
      submitted_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (submissionError) throw submissionError;

  const { error: assessmentError } = await supabase
    .from('standard1_assessments')
    .upsert({
      student_id: studentId,
      submission_id: submission.id,
      status: 'submitted',
      submitted_at: new Date().toISOString(),
    });

  if (assessmentError) throw assessmentError;

  return submission;
}

export async function getStandard1Assessment(studentId: string) {
  const { data: assessment, error: assessmentError } = await supabase
    .from('standard1_assessments')
    .select(`
      *,
      submission:standard1_submissions(*),
      draft:standard1_drafts(*)
    `)
    .eq('student_id', studentId)
    .single();

  if (assessmentError) throw assessmentError;

  const { data: feedback, error: feedbackError } = await supabase
    .from('standard1_feedback')
    .select('*')
    .eq('submission_id', assessment.submission_id);

  if (feedbackError) throw feedbackError;

  return {
    assessment,
    feedback: feedback || [],
  };
}

export async function gradeStandard1Submission(
  submissionId: string,
  instructorId: string,
  score: number,
  rubricScores: Standard1Grade['rubricScores']
): Promise<Standard1Grade> {
  const { data: grade, error: gradeError } = await supabase
    .from('standard1_grades')
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
    .from('standard1_assessments')
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

export async function resubmitStandard1Assessment(
  studentId: string,
  content: Standard1Submission['content'],
  previousSubmissionId: string
): Promise<Standard1Submission> {
  const { data: submission, error: submissionError } = await supabase
    .from('standard1_submissions')
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
    .from('standard1_assessments')
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

export async function getStandard1Feedback(submissionId: string): Promise<Standard1Feedback[]> {
  const { data, error } = await supabase
    .from('standard1_feedback')
    .select('*')
    .eq('submission_id', submissionId);

  if (error) throw error;
  return data || [];
}

export async function addStandard1Feedback(
  submissionId: string,
  instructorId: string,
  content: Standard1Feedback['content']
): Promise<Standard1Feedback> {
  const { data, error } = await supabase
    .from('standard1_feedback')
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