import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { isAdmin } from '@/lib/supabase';

// GET /api/teachers
export async function GET() {
  try {
    const admin = await isAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: teachers, error } = await supabase
      .from('users')
      .select('*, teachers(*)')
      .eq('role', 'teacher')
      .order('full_name');

    if (error) throw error;

    return NextResponse.json(teachers);
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST /api/teachers
export async function POST(request: Request) {
  try {
    const admin = await isAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { email, full_name, permissions, classes } = body;

    // Create user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      email_confirm: true,
    });

    if (authError) throw authError;

    // Create user record
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert([{
        id: authData.user.id,
        email,
        full_name,
        role: 'teacher'
      }])
      .select()
      .single();

    if (userError) throw userError;

    // Create teacher record
    const { data: teacherData, error: teacherError } = await supabase
      .from('teachers')
      .insert([{
        id: authData.user.id,
        permissions,
        classes
      }])
      .select()
      .single();

    if (teacherError) throw teacherError;

    return NextResponse.json({
      ...userData,
      ...teacherData
    });
  } catch (error) {
    console.error('Error creating teacher:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT /api/teachers
export async function PUT(request: Request) {
  try {
    const admin = await isAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, full_name, permissions, classes } = body;

    // Update user
    const { error: userError } = await supabase
      .from('users')
      .update({ full_name })
      .eq('id', id);

    if (userError) throw userError;

    // Update teacher
    const { data, error: teacherError } = await supabase
      .from('teachers')
      .update({ permissions, classes })
      .eq('id', id)
      .select()
      .single();

    if (teacherError) throw teacherError;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating teacher:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE /api/teachers
export async function DELETE(request: Request) {
  try {
    const admin = await isAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    // Delete teacher record
    const { error: teacherError } = await supabase
      .from('teachers')
      .delete()
      .eq('id', id);

    if (teacherError) throw teacherError;

    // Delete user record
    const { error: userError } = await supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (userError) throw userError;

    // Delete auth user
    const { error: authError } = await supabase.auth.admin.deleteUser(id);

    if (authError) throw authError;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting teacher:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 