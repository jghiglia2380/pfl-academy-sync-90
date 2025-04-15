'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Quiz } from '@/types/assessment';

export function QuizLibrary() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      id: '1',
      title: 'Standard 1.1 Quiz',
      timeLimit: 15,
      standards: ['1.1'],
      questions: [
        { type: 'multiple_choice', text: 'What is the definition of financial literacy?', options: ['A', 'B', 'C', 'D'], correctAnswer: 'A' },
        { type: 'short_response', text: 'Explain the importance of financial literacy in daily life.', correctAnswer: '' },
      ],
      difficulty: 'medium',
      version: 1,
      isRandomized: true,
      questionPoolSize: 10,
      questionsToShow: 5,
    },
    {
      id: '2',
      title: 'Standard 1.2 Quiz',
      timeLimit: 20,
      standards: ['1.2'],
      questions: [
        { type: 'situational', text: 'You have $1000 to invest. What would you do?', correctAnswer: '' },
        { type: 'fill_in_blank', text: 'The first step in financial planning is to ___ your goals.', correctAnswer: 'set' },
      ],
      difficulty: 'easy',
      version: 1,
      isRandomized: false,
      questionPoolSize: 0,
      questionsToShow: 0,
    },
    // Add more default quizzes as needed
  ]);

  const [standards, setStandards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newQuiz, setNewQuiz] = useState<Partial<Quiz>>({
    title: '',
    difficulty: 'medium',
    standards: [],
    version: 1,
    isRandomized: false,
    questionPoolSize: 0,
    questionsToShow: 0,
    questions: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [quizzesResponse, standardsResponse] = await Promise.all([
        supabase.from('assessments').select('*').eq('type', 'quiz'),
        supabase.from('standards').select('*')
      ]);

      if (quizzesResponse.error) throw quizzesResponse.error;
      if (standardsResponse.error) throw standardsResponse.error;

      setQuizzes(quizzesResponse.data || []);
      setStandards(standardsResponse.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddQuiz = async () => {
    try {
      const { data, error } = await supabase
        .from('assessments')
        .insert([{ ...newQuiz, type: 'quiz' }])
        .select()
        .single();

      if (error) throw error;
      
      setQuizzes([...quizzes, data]);
      setShowAddModal(false);
      setNewQuiz({
        title: '',
        difficulty: 'medium',
        standards: [],
        version: 1,
        isRandomized: false,
        questionPoolSize: 0,
        questionsToShow: 0,
        questions: [],
      });
    } catch (error) {
      console.error('Error adding quiz:', error);
      setError('Failed to add quiz');
    }
  };

  const handleCreateNewVersion = async (quizId: string) => {
    try {
      const originalQuiz = quizzes.find(q => q.id === quizId);
      if (!originalQuiz) return;

      const newVersion = {
        ...originalQuiz,
        version: originalQuiz.version + 1,
        questions: originalQuiz.questions.map(q => ({
          ...q,
          id: undefined,
          version: originalQuiz.version + 1
        }))
      };

      const { data, error } = await supabase
        .from('assessments')
        .insert([newVersion])
        .select()
        .single();

      if (error) throw error;
      
      setQuizzes([...quizzes, data]);
    } catch (error) {
      console.error('Error creating new version:', error);
      setError('Failed to create new version');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{quiz.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {quiz.timeLimit} minutes • {quiz.difficulty} difficulty
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-500">
                    <i className="fas fa-eye"></i>
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-500">
                    <i className="fas fa-edit"></i>
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {quiz.standards.map((standard) => (
                    <span key={standard} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {standard}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {quiz.questions.map((question, index) => (
                    <span
                      key={index}
                      className={`question-type-badge ${
                        question.type === 'multiple_choice'
                          ? 'multiple-choice'
                          : question.type === 'short_response'
                          ? 'short-response'
                          : question.type === 'situational'
                          ? 'situational'
                          : 'fill-blank'
                      } px-2 py-1 rounded-full text-xs font-medium`}
                    >
                      {question.type === 'multiple_choice'
                        ? 'MC'
                        : question.type === 'short_response'
                        ? 'SR'
                        : question.type === 'situational'
                        ? 'ST'
                        : 'FB'}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Version {quiz.version}
                  {quiz.isRandomized && (
                    <span className="ml-2">
                      • {quiz.questionsToShow} of {quiz.questionPoolSize} questions
                    </span>
                  )}
                </div>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Deploy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Quiz Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
            <h2 className="text-xl font-semibold mb-4">Create New Quiz</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={newQuiz.title}
                  onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Difficulty</label>
                <select
                  value={newQuiz.difficulty}
                  onChange={(e) => setNewQuiz({ ...newQuiz, difficulty: e.target.value as Quiz['difficulty'] })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="difficult">Difficult</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Standards</label>
                <select
                  value={newQuiz.standards}
                  onChange={(e) => setNewQuiz({ ...newQuiz, standards: e.target.value.split(',') })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select standards</option>
                  {standards.map((standard) => (
                    <option key={standard.id} value={standard.id}>
                      {standard.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newQuiz.isRandomized}
                    onChange={(e) => setNewQuiz({ ...newQuiz, isRandomized: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Enable Question Randomization
                  </label>
                </div>

                {newQuiz.isRandomized && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Question Pool Size
                      </label>
                      <input
                        type="number"
                        value={newQuiz.questionPoolSize}
                        onChange={(e) => setNewQuiz({ ...newQuiz, questionPoolSize: Number(e.target.value) })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Questions to Show
                      </label>
                      <input
                        type="number"
                        value={newQuiz.questionsToShow}
                        onChange={(e) => setNewQuiz({ ...newQuiz, questionsToShow: Number(e.target.value) })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddQuiz}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Create Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 