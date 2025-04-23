import { createClient } from '@supabase/supabase-js';
import {
  Standard3Submission,
  Standard3Draft,
  Standard3Feedback,
  Standard3Grade,
  TeacherConfig,
  Hint,
  SampleAnswer,
  Version,
  ProgressTracking,
  ScaffoldingLevel,
  HintVisibility,
  AssessmentStatus
} from '../types/standard3';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// CRUD Operations for Submissions
export const createSubmission = async (submission: Omit<Standard3Submission, 'id' | 'submittedAt'>) => {
  const { data, error } = await supabase
    .from('standard3_submissions')
    .insert([submission])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getSubmission = async (id: string) => {
  const { data, error } = await supabase
    .from('standard3_submissions')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

export const updateSubmission = async (id: string, submission: Partial<Standard3Submission>) => {
  const { data, error } = await supabase
    .from('standard3_submissions')
    .update(submission)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteSubmission = async (id: string) => {
  const { error } = await supabase
    .from('standard3_submissions')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

// Draft Management
export const createDraft = async (draft: Omit<Standard3Draft, 'id' | 'lastUpdated'>) => {
  const { data, error } = await supabase
    .from('standard3_drafts')
    .insert([draft])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getDraft = async (id: string) => {
  const { data, error } = await supabase
    .from('standard3_drafts')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

export const updateDraft = async (id: string, draft: Partial<Standard3Draft>) => {
  const { data, error } = await supabase
    .from('standard3_drafts')
    .update(draft)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Teacher Configuration
export const updateTeacherConfig = async (submissionId: string, config: TeacherConfig) => {
  const { data, error } = await supabase
    .from('standard3_submissions')
    .update({ teacher_config: config })
    .eq('id', submissionId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Hints Management
export const getHints = async (section: string) => {
  const { data, error } = await supabase
    .from('standard3_hints')
    .select('*')
    .eq('section', section)
    .order('order', { ascending: true });
  
  if (error) throw error;
  return data;
};

export const updateHintVisibility = async (hintId: string, visibility: HintVisibility) => {
  const { data, error } = await supabase
    .from('standard3_hints')
    .update({ visibility })
    .eq('id', hintId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Sample Answers
export const getSampleAnswers = async (section: string) => {
  const { data, error } = await supabase
    .from('standard3_sample_answers')
    .select('*')
    .eq('section', section)
    .eq('is_visible', true);
  
  if (error) throw error;
  return data;
};

export const toggleSampleAnswerVisibility = async (answerId: string, isVisible: boolean) => {
  const { data, error } = await supabase
    .from('standard3_sample_answers')
    .update({ is_visible: isVisible })
    .eq('id', answerId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Progress Tracking
export const updateProgress = async (submissionId: string, progress: ProgressTracking) => {
  const { data, error } = await supabase
    .from('standard3_submissions')
    .update({ progress })
    .eq('id', submissionId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Version History
export const createVersion = async (version: Omit<Version, 'id' | 'createdAt'>) => {
  const { data, error } = await supabase
    .from('standard3_versions')
    .insert([version])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getVersions = async (submissionId: string) => {
  const { data, error } = await supabase
    .from('standard3_versions')
    .select('*')
    .eq('submission_id', submissionId)
    .order('version_number', { ascending: false });
  
  if (error) throw error;
  return data;
};

// Feedback and Grading
export const createFeedback = async (feedback: Omit<Standard3Feedback, 'id' | 'createdAt' | 'updatedAt'>) => {
  const { data, error } = await supabase
    .from('standard3_feedback')
    .insert([feedback])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const createGrade = async (grade: Omit<Standard3Grade, 'id' | 'gradedAt'>) => {
  const { data, error } = await supabase
    .from('standard3_grades')
    .insert([grade])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Auto-save functionality
export const autoSaveDraft = async (draftId: string, content: Standard3Draft['content']) => {
  const { data, error } = await supabase
    .from('standard3_drafts')
    .update({ 
      content,
      last_updated: new Date().toISOString()
    })
    .eq('id', draftId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Status Management
export const updateStatus = async (submissionId: string, status: AssessmentStatus) => {
  const { data, error } = await supabase
    .from('standard3_submissions')
    .update({ status })
    .eq('id', submissionId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}; 