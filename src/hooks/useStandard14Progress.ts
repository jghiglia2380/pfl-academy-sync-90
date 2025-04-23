import { useState, useEffect } from 'react';
import { Progress } from '../types/standard14';
import { standard14Service } from '../services/standard14';

export const useStandard14Progress = (assessmentId: string) => {
  const [progress, setProgress] = useState<Progress[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const data = await standard14Service.getProgress(assessmentId);
        setProgress(data);
      } catch (error) {
        console.error('Error loading progress:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProgress();
  }, [assessmentId]);

  const updateProgress = async (sectionId: string, status: string, timeSpent: number) => {
    try {
      const updated = await standard14Service.updateProgress({
        assessmentId,
        sectionId,
        status,
        timeSpent
      });
      setProgress(prev => prev.map(p => 
        p.sectionId === sectionId ? updated : p
      ));
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  return {
    progress,
    isLoading,
    updateProgress
  };
}; 