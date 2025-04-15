'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface Teacher {
  id: string;
  name: string;
  email: string;
  permissions: {
    can_edit_curriculum: boolean;
    can_create_assessments: boolean;
    can_grade_assessments: boolean;
    can_view_reports: boolean;
  };
}

export default function TeacherPermissions() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const { data, error } = await supabase
        .from('teachers')
        .select('*');

      if (error) throw error;
      setTeachers(data || []);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setError('Failed to load teachers');
    } finally {
      setLoading(false);
    }
  };

  const handlePermissionChange = async (
    teacherId: string,
    permission: keyof Teacher['permissions'],
    value: boolean
  ) => {
    try {
      const { error } = await supabase
        .from('teachers')
        .update({
          permissions: {
            ...teachers.find(t => t.id === teacherId)?.permissions,
            [permission]: value
          }
        })
        .eq('id', teacherId);

      if (error) throw error;
      
      setTeachers(prev => prev.map(teacher => 
        teacher.id === teacherId
          ? {
              ...teacher,
              permissions: {
                ...teacher.permissions,
                [permission]: value
              }
            }
          : teacher
      ));
    } catch (error) {
      console.error('Error updating permission:', error);
      setError('Failed to update permission');
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
      <h1 className="text-2xl font-bold mb-6">Teacher Permissions</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Teacher
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Edit Curriculum
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Create Assessments
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Grade Assessments
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                View Reports
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                  <div className="text-sm text-gray-500">{teacher.email}</div>
                </td>
                {Object.entries(teacher.permissions).map(([permission, value]) => (
                  <td key={permission} className="px-6 py-4 whitespace-nowrap">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => handlePermissionChange(
                          teacher.id,
                          permission as keyof Teacher['permissions'],
                          e.target.checked
                        )}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                    </label>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 