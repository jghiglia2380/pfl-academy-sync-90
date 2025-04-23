import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { Database } from '@/types/supabase';
import { Standard13Assessment, TeacherSupportConfig } from '@/types/standard13';
import { standard13Schema } from '@/schemas/standard13Schema';

const DEFAULT_VALUES: Standard13Assessment = {
  scenario1: {
    debtAnalysis: '',
    calculations: '',
    recommendations: '',
  },
  scenario2: {
    budgetPlan: '',
    prioritization: '',
    timeline: '',
  },
  scenario3: {
    strategies: '',
    implementation: '',
    monitoring: '',
  },
};

export function useStandard13Form(assessmentId?: string) {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [teacherSupport, setTeacherSupport] = useState<TeacherSupportConfig | null>(null);

  const form = useForm<Standard13Assessment>({
    resolver: zodResolver(standard13Schema),
    defaultValues: DEFAULT_VALUES,
  });

  const loadAssessment = useCallback(async () => {
    if (!assessmentId || !user) return;

    try {
      setIsLoading(true);

      // Load assessment data
      const { data: assessment, error } = await supabase
        .from('standard13_assessments')
        .select('*')
        .eq('id', assessmentId)
        .single();

      if (error) throw error;

      if (assessment) {
        form.reset({
          scenario1: assessment.scenario1,
          scenario2: assessment.scenario2,
          scenario3: assessment.scenario3,
        });
      }

      // Load teacher support configuration
      const { data: support } = await supabase
        .from('teacher_support_config')
        .select('*')
        .eq('standard_id', 'standard13')
        .eq('student_id', user.id)
        .single();

      if (support) {
        setTeacherSupport(support);
      }
    } catch (error) {
      console.error('Error loading assessment:', error);
      toast.error('Failed to load assessment');
    } finally {
      setIsLoading(false);
    }
  }, [assessmentId, user, supabase, form]);

  useEffect(() => {
    loadAssessment();
  }, [loadAssessment]);

  const saveDraft = async (data: Standard13Assessment) => {
    if (!user) return;

    try {
      const { error } = await supabase.from('standard13_assessments').upsert({
        id: assessmentId,
        user_id: user.id,
        status: 'draft',
        scenario1: data.scenario1,
        scenario2: data.scenario2,
        scenario3: data.scenario3,
      });

      if (error) throw error;

      // Update progress
      await supabase.from('standard13_progress').upsert({
        assessment_id: assessmentId,
        user_id: user.id,
        saved_responses: data,
        last_saved: new Date().toISOString(),
      });

      toast.success('Draft saved successfully');
    } catch (error) {
      console.error('Error saving draft:', error);
      toast.error('Failed to save draft');
    }
  };

  const submitAssessment = async (data: Standard13Assessment) => {
    if (!user) return;

    try {
      // Validate that all scenarios are complete
      const isComplete = Object.values(data).every(scenario => 
        Object.values(scenario).every(value => value.trim().length > 0)
      );

      if (!isComplete) {
        toast.error('Please complete all sections before submitting');
        return;
      }

      const { error } = await supabase.from('standard13_assessments').upsert({
        id: assessmentId,
        user_id: user.id,
        status: 'submitted',
        submitted_at: new Date().toISOString(),
        scenario1: data.scenario1,
        scenario2: data.scenario2,
        scenario3: data.scenario3,
      });

      if (error) throw error;

      toast.success('Assessment submitted successfully');
      router.push('/assessments/standard13/confirmation');
    } catch (error) {
      console.error('Error submitting assessment:', error);
      toast.error('Failed to submit assessment');
    }
  };

  return {
    form,
    isLoading,
    teacherSupport,
    saveDraft,
    submitAssessment,
  };
} 