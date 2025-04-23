import { useState, useEffect } from 'react';
import { useSupabase } from '@/hooks/useSupabase';
import { useAuth } from '@/hooks/useAuth';
import { Standard15Assessment, AssessmentStatus } from '@/types/standard15';
import { standard15Schema } from '@/schemas/standard15Schema';
import { useAutoSave } from '@/hooks/useAutoSave';
import { useToast } from '@/hooks/useToast';

const AUTOSAVE_INTERVAL = 30000; // 30 seconds

export const useStandard15Form = (initialData?: Standard15Assessment) => {
  const { supabase } = useSupabase();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [formState, setFormState] = useState<Standard15Assessment>(
    initialData || {
      status: AssessmentStatus.Draft,
      financialAnalysis: [],
      brandStrategy: [],
      careerProgression: [],
      lastSaved: null,
      submittedAt: null,
      studentId: user?.id,
    }
  );
  const [isLoading, setIsLoading] = useState(!initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Auto-save functionality
  useAutoSave({
    data: formState,
    onSave: handleSaveDraft,
    interval: AUTOSAVE_INTERVAL,
    enabled: formState.status === AssessmentStatus.Draft,
  });

  useEffect(() => {
    if (!initialData && user?.id) {
      loadExistingDraft();
    }
  }, [user?.id]);

  async function loadExistingDraft() {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('standard15_assessments')
        .select('*')
        .eq('student_id', user?.id)
        .eq('status', AssessmentStatus.Draft)
        .single();

      if (error) throw error;

      if (data) {
        setFormState(data);
      }
    } catch (err) {
      console.error('Error loading draft:', err);
      // Don't show error for missing draft
      if (err.code !== 'PGRST116') {
        setError(err);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSaveDraft() {
    try {
      setIsSaving(true);
      const now = new Date().toISOString();
      const dataToSave = {
        ...formState,
        lastSaved: now,
        updatedAt: now,
      };

      const { error } = await supabase
        .from('standard15_assessments')
        .upsert({
          ...dataToSave,
          student_id: user?.id,
          status: AssessmentStatus.Draft,
        });

      if (error) throw error;

      setFormState(dataToSave);
      showToast('Draft saved successfully', 'success');
    } catch (err) {
      console.error('Error saving draft:', err);
      setError(err);
      showToast('Failed to save draft', 'error');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSubmit() {
    try {
      setIsSaving(true);
      
      // Validate form data
      const validationResult = standard15Schema.safeParse(formState);
      if (!validationResult.success) {
        throw new Error('Please complete all required fields');
      }

      const now = new Date().toISOString();
      const dataToSubmit = {
        ...formState,
        status: AssessmentStatus.Submitted,
        submittedAt: now,
        updatedAt: now,
      };

      const { error } = await supabase
        .from('standard15_assessments')
        .upsert({
          ...dataToSubmit,
          student_id: user?.id,
        });

      if (error) throw error;

      setFormState(dataToSubmit);
      showToast('Assessment submitted successfully', 'success');
    } catch (err) {
      console.error('Error submitting assessment:', err);
      setError(err);
      showToast(err.message || 'Failed to submit assessment', 'error');
    } finally {
      setIsSaving(false);
    }
  }

  function handleAddRow(section: keyof Standard15Assessment) {
    setFormState(prev => ({
      ...prev,
      [section]: [...prev[section], {}],
    }));
  }

  function handleUpdateField(
    section: keyof Standard15Assessment,
    rowIndex: number,
    field: string,
    value: any
  ) {
    setFormState(prev => ({
      ...prev,
      [section]: prev[section].map((row, idx) =>
        idx === rowIndex ? { ...row, [field]: value } : row
      ),
    }));
  }

  function resetForm() {
    setFormState({
      status: AssessmentStatus.Draft,
      financialAnalysis: [],
      brandStrategy: [],
      careerProgression: [],
      lastSaved: null,
      submittedAt: null,
      studentId: user?.id,
    });
    setError(null);
  }

  return {
    formState,
    isLoading,
    isSaving,
    error,
    handleSubmit,
    handleSaveDraft,
    handleAddRow,
    handleUpdateField,
    resetForm,
  };
};

export default useStandard15Form; 