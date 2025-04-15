'use client';

import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface Chapter {
  id: string;
  title: string;
  type: 'day1' | 'day2';
}

interface Standard {
  id: string;
  title: string;
  chapters: Chapter[];
}

export default function CurriculumConfig() {
  const [standards, setStandards] = useState<Standard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch standards data from API
    const fetchStandards = async () => {
      try {
        const response = await fetch('/api/curriculum/standards');
        const data = await response.json();
        setStandards(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load curriculum data');
        setLoading(false);
      }
    };

    fetchStandards();
  }, []);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    
    // Reorder chapters within the same standard
    if (source.droppableId === destination.droppableId) {
      const standard = standards.find(s => s.id === source.droppableId);
      if (!standard) return;

      const chapters = Array.from(standard.chapters);
      const [removed] = chapters.splice(source.index, 1);
      chapters.splice(destination.index, 0, removed);

      setStandards(standards.map(s => 
        s.id === source.droppableId 
          ? { ...s, chapters }
          : s
      ));
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Curriculum Configuration</h1>
          
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="space-y-6">
              {standards.map((standard) => (
                <div key={standard.id} className="bg-white rounded-lg border border-gray-200 p-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">{standard.title}</h2>
                  
                  <Droppable droppableId={standard.id}>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-2"
                      >
                        {standard.chapters.map((chapter, index) => (
                          <Draggable
                            key={chapter.id}
                            draggableId={chapter.id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="bg-gray-50 p-3 rounded-lg flex items-center justify-between"
                              >
                                <span className="text-gray-700">{chapter.title}</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  chapter.type === 'day1' 
                                    ? 'bg-blue-100 text-blue-800' 
                                    : 'bg-green-100 text-green-800'
                                }`}>
                                  {chapter.type === 'day1' ? 'Day 1' : 'Day 2'}
                                </span>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
} 