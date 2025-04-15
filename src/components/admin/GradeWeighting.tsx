'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface GradeWeighting {
  quizzes: number;
  midterms: number;
  finals: number;
  projects: number;
  participation: number;
}

export default function GradeWeighting() {
  const [weights, setWeights] = useState<GradeWeighting>({
    quizzes: 30,
    midterms: 20,
    finals: 30,
    projects: 15,
    participation: 5
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWeights();
  }, []);

  const fetchWeights = async () => {
    try {
      const { data, error } = await supabase
        .from('grade_weighting')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;
      if (data) setWeights(data);
    } catch (error) {
      console.error('Error fetching weights:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWeightChange = (category: keyof GradeWeighting, value: number) => {
    setWeights(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const total = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
    if (total !== 100) {
      setError('Total weights must equal 100%');
      return;
    }

    try {
      const { error } = await supabase
        .from('grade_weighting')
        .insert([weights]);

      if (error) throw error;
      alert('Grade weights updated successfully!');
    } catch (error) {
      console.error('Error updating weights:', error);
      setError('Failed to update grade weights');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Grade Weighting Configuration</h1>
      
      <form onSubmit={handleSubmit} className="max-w-2xl">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {Object.entries(weights).map(([category, weight]) => (
            <div key={category} className="flex items-center justify-between">
              <label className="text-lg font-medium capitalize">
                {category}
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={weight}
                  onChange={(e) => handleWeightChange(category as keyof GradeWeighting, Number(e.target.value))}
                  className="w-48"
                />
                <span className="w-12 text-right">{weight}%</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
} 