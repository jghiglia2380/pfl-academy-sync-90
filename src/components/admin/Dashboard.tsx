'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { ActivityLog, Teacher, Standard } from '@/types';

export default function AdminDashboard() {
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [standards, setStandards] = useState<Standard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [logsResponse, teachersResponse, standardsResponse] = await Promise.all([
        supabase.from('activity_log').select('*').order('created_at', { ascending: false }).limit(10),
        supabase.from('teachers').select('*'),
        supabase.from('standards').select('*')
      ]);

      setActivityLogs(logsResponse.data || []);
      setTeachers(teachersResponse.data || []);
      setStandards(standardsResponse.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Total Teachers</h2>
          <p className="text-3xl font-bold">{teachers.length}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Total Standards</h2>
          <p className="text-3xl font-bold">{standards.length}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Total Chapters</h2>
          <p className="text-3xl font-bold">
            {standards.reduce((acc, standard) => acc + standard.chapters.length, 0)}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {activityLogs.map((log) => (
            <div key={log.id} className="border-b pb-2">
              <p className="text-sm text-gray-600">{new Date(log.created_at).toLocaleString()}</p>
              <p className="font-medium">{log.action}</p>
              <p className="text-sm text-gray-500">{log.details}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add New Teacher
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Create New Standard
          </button>
          <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
} 