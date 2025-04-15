import { createClient } from '@supabase/supabase-js';

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