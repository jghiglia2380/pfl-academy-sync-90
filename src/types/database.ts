import { Database } from './supabase';

export type Standard6Submission = Database['public']['Tables']['standard6_submissions']['Row'];
export type Standard6Draft = Database['public']['Tables']['standard6_drafts']['Row'];
export type Standard6Feedback = Database['public']['Tables']['standard6_feedback']['Row'];
export type Standard6Grade = Database['public']['Tables']['standard6_grades']['Row'];

export interface Standard6SubmissionWithRelations extends Standard6Submission {
  feedback?: Standard6Feedback[];
  grade?: Standard6Grade;
  student_profile?: Database['public']['Tables']['profiles']['Row'];
}

export interface Standard6Assessment {
  id: string;
  student_id: string;
  submission_id?: string;
  draft_id?: string;
  status: 'draft' | 'submitted' | 'graded' | 'resubmit_requested' | 'resubmitted';
  current_score?: number;
  max_score: number;
  submitted_at?: string;
  graded_at?: string;
  instructor_id?: string;
  feedback_count: number;
  attempt_number: number;
  last_updated: string;
} 