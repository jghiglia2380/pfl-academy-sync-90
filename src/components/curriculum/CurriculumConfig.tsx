'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface Standard {
  id: string;
  title: string;
  description: string;
  chapters: Chapter[];
}

interface Chapter {
  id: string;
  title: string;
  content: string;
  order: number;
}

export default function CurriculumConfig() {
  const [standards, setStandards] = useState<Standard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStandard, setSelectedStandard] = useState<Standard | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStandard, setNewStandard] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    fetchStandards();
  }, []);

  const fetchStandards = async () => {
    try {
      const { data, error } = await supabase
        .from('standards')
        .select('*, chapters(*)')
        .order('id');

      if (error) throw error;
      setStandards(data || []);
    } catch (error) {
      console.error('Error fetching standards:', error);
      setError('Failed to load standards');
    } finally {
      setLoading(false);
    }
  };

  const handleAddStandard = async () => {
    try {
      const { data, error } = await supabase
        .from('standards')
        .insert([newStandard])
        .select()
        .single();

      if (error) throw error;
      
      setStandards([...standards, data]);
      setShowAddModal(false);
      setNewStandard({ title: '', description: '' });
    } catch (error) {
      console.error('Error adding standard:', error);
      setError('Failed to add standard');
    }
  };

  const handleAddChapter = async (standardId: string) => {
    try {
      const { data, error } = await supabase
        .from('chapters')
        .insert([{
          standard_id: standardId,
          title: 'New Chapter',
          content: '',
          order: standards.find(s => s.id === standardId)?.chapters.length || 0
        }])
        .select()
        .single();

      if (error) throw error;
      
      setStandards(prev => prev.map(standard => 
        standard.id === standardId
          ? { ...standard, chapters: [...standard.chapters, data] }
          : standard
      ));
    } catch (error) {
      console.error('Error adding chapter:', error);
      setError('Failed to add chapter');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Curriculum Configuration</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Standard
        </button>
      </div>

      <div className="space-y-6">
        {standards.map((standard) => (
          <div key={standard.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold">{standard.title}</h2>
                <p className="text-gray-600 mt-1">{standard.description}</p>
              </div>
              <button
                onClick={() => handleAddChapter(standard.id)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Add Chapter
              </button>
            </div>

            <div className="space-y-4">
              {standard.chapters.map((chapter) => (
                <div key={chapter.id} className="border rounded p-4">
                  <h3 className="font-medium">{chapter.title}</h3>
                  <p className="text-gray-600 mt-1">{chapter.content}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Standard Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Add New Standard</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={newStandard.title}
                  onChange={(e) => setNewStandard({ ...newStandard, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={newStandard.description}
                  onChange={(e) => setNewStandard({ ...newStandard, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddStandard}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add Standard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 