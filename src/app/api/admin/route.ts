import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { isAdmin } from '@/lib/supabase';

// GET /api/admin/dashboard
export async function GET() {
  try {
    const admin = await isAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get dashboard statistics
    const [
      { count: totalTeachers },
      { count: totalStudents },
      { count: activeClasses },
      { data: recentActivity }
    ] = await Promise.all([
      supabase.from('users').select('*', { count: 'exact', head: true }).eq('role', 'teacher'),
      supabase.from('users').select('*', { count: 'exact', head: true }).eq('role', 'student'),
      supabase.from('teachers').select('classes', { count: 'exact', head: true }),
      supabase.from('activity_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10)
    ]);

    return NextResponse.json({
      totalTeachers,
      totalStudents,
      activeClasses,
      recentActivity
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 