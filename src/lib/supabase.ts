import { createClient } from '@supabase/supabase-js';
import { Standard8Submission, Standard8Evaluation } from '../types/standard8';
import { Standard9Submission, Standard9Evaluation } from '../types/standard9';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for common operations
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
};

export const getUserRole = async () => {
  const user = await getCurrentUser();
  if (!user) return null;
  
  const { data, error } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();
    
  if (error) throw error;
  return data?.role;
};

export const isAdmin = async () => {
  const role = await getUserRole();
  return role === 'admin';
};

export const isTeacher = async () => {
  const role = await getUserRole();
  return role === 'teacher';
};

// Type definitions
export type User = {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'teacher' | 'student';
};

export type Teacher = {
  id: string;
  permissions: {
    canEditCurriculum: boolean;
    canManageAssessments: boolean;
    canViewReports: boolean;
  };
  classes: string[];
};

export type Standard = {
  id: string;
  title: string;
  description?: string;
  order_index: number;
};

export type Chapter = {
  id: string;
  standard_id: string;
  title: string;
  type: 'day1' | 'day2';
  order_index: number;
  content?: any;
};

export type Assessment = {
  id: string;
  title: string;
  description?: string;
  type: 'quiz' | 'midterm' | 'final' | 'project' | 'participation';
  standard_id?: string;
  chapter_id?: string;
  questions: any[];
  time_limit?: number;
  created_by: string;
};

export type GradeWeighting = {
  id: string;
  quizzes: number;
  midterms: number;
  finals: number;
  projects: number;
  participation: number;
};

// Database schema for Standard 8
export const standard8Schema = {
  submissions: {
    table: 'standard8_submissions',
    columns: {
      id: 'uuid primary key default uuid_generate_v4()',
      student_id: 'uuid references auth.users(id)',
      status: 'text check (status in (\'draft\', \'submitted\', \'graded\'))',
      credit_card_analysis: 'jsonb',
      online_shopping_security: 'jsonb',
      digital_purchase_strategy: 'jsonb',
      grade: 'jsonb',
      created_at: 'timestamp with time zone default timezone(\'utc\'::text, now())',
      updated_at: 'timestamp with time zone default timezone(\'utc\'::text, now())'
    }
  },
  evaluations: {
    table: 'standard8_evaluations',
    columns: {
      id: 'uuid primary key default uuid_generate_v4()',
      submission_id: 'uuid references standard8_submissions(id)',
      evaluator_id: 'uuid references auth.users(id)',
      credit_card_analysis: 'jsonb',
      security_assessment: 'jsonb',
      strategy_development: 'jsonb',
      total_score: 'numeric',
      feedback: 'text',
      created_at: 'timestamp with time zone default timezone(\'utc\'::text, now())'
    }
  }
};

// Database functions
export const standard8Db = {
  // Student functions
  async getSubmission(studentId: string) {
    const { data, error } = await supabase
      .from(standard8Schema.submissions.table)
      .select('*')
      .eq('student_id', studentId)
      .single();
    
    if (error) throw error;
    return data;
  },

  async saveSubmission(submission: Partial<Standard8Submission>) {
    const { data, error } = await supabase
      .from(standard8Schema.submissions.table)
      .upsert(submission)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async submitSubmission(submissionId: string) {
    const { data, error } = await supabase
      .from(standard8Schema.submissions.table)
      .update({ status: 'submitted' })
      .eq('id', submissionId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Instructor functions
  async getSubmissionsForGrading() {
    const { data, error } = await supabase
      .from(standard8Schema.submissions.table)
      .select('*, student:student_id(*)')
      .eq('status', 'submitted');
    
    if (error) throw error;
    return data;
  },

  async saveEvaluation(evaluation: Standard8Evaluation) {
    const { data, error } = await supabase
      .from(standard8Schema.evaluations.table)
      .insert(evaluation)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateSubmissionGrade(submissionId: string, grade: Standard8Submission['grade']) {
    const { data, error } = await supabase
      .from(standard8Schema.submissions.table)
      .update({ 
        status: 'graded',
        grade 
      })
      .eq('id', submissionId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

// Standard 9 Database Schema
const standard9Schema = {
  submissions: {
    id: 'uuid primary key default uuid_generate_v4()',
    student_id: 'text not null',
    status: 'text not null check (status in (\'draft\', \'submitted\', \'graded\'))',
    investment_analysis: 'jsonb not null',
    retirement_planning: 'jsonb not null',
    education_planning: 'jsonb not null',
    emergency_fund: 'jsonb not null',
    grade: 'jsonb',
    created_at: 'timestamp with time zone default timezone(\'utc\'::text, now())',
    updated_at: 'timestamp with time zone default timezone(\'utc\'::text, now())'
  },
  evaluations: {
    id: 'uuid primary key default uuid_generate_v4()',
    submission_id: 'uuid references standard9_submissions(id)',
    evaluator_id: 'text not null',
    investment_analysis: 'jsonb not null',
    retirement_planning: 'jsonb not null',
    education_planning: 'jsonb not null',
    emergency_fund: 'jsonb not null',
    total_score: 'integer not null',
    feedback: 'text',
    created_at: 'timestamp with time zone default timezone(\'utc\'::text, now())'
  }
};

// Standard 9 Database Functions
export const standard9Db = {
  // Student Functions
  getSubmission: async (studentId: string) => {
    const { data, error } = await supabase
      .from('standard9_submissions')
      .select('*')
      .eq('student_id', studentId)
      .single();
    
    if (error) throw error;
    return data;
  },

  saveSubmission: async (submission: Standard9Submission) => {
    const { data, error } = await supabase
      .from('standard9_submissions')
      .upsert({
        ...submission,
        updated_at: new Date().toISOString()
      });
    
    if (error) throw error;
    return data;
  },

  submitSubmission: async (submissionId: string) => {
    const { data, error } = await supabase
      .from('standard9_submissions')
      .update({ status: 'submitted' })
      .eq('id', submissionId);
    
    if (error) throw error;
    return data;
  },

  // Instructor Functions
  getSubmissionsForGrading: async () => {
    const { data, error } = await supabase
      .from('standard9_submissions')
      .select('*')
      .eq('status', 'submitted');
    
    if (error) throw error;
    return data;
  },

  saveEvaluation: async (evaluation: Standard9Evaluation & { submissionId: string; evaluatorId: string }) => {
    const { data, error } = await supabase
      .from('standard9_evaluations')
      .insert({
        submission_id: evaluation.submissionId,
        evaluator_id: evaluation.evaluatorId,
        investment_analysis: evaluation.investmentAnalysis,
        retirement_planning: evaluation.retirementPlanning,
        education_planning: evaluation.educationPlanning,
        emergency_fund: evaluation.emergencyFund,
        total_score: evaluation.totalScore,
        feedback: evaluation.feedback
      });
    
    if (error) throw error;
    return data;
  },

  updateSubmissionGrade: async (submissionId: string, grade: { score: number; feedback: string; gradedBy: string; gradedAt: string }) => {
    const { data, error } = await supabase
      .from('standard9_submissions')
      .update({
        status: 'graded',
        grade: grade
      })
      .eq('id', submissionId);
    
    if (error) throw error;
    return data;
  }
}; 