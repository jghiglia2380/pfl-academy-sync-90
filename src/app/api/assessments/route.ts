import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { isAdmin, isTeacher } from '@/lib/supabase';

// GET /api/assessments
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const standardId = searchParams.get('standardId');
    const chapterId = searchParams.get('chapterId');
    const type = searchParams.get('type');

    let query = supabase
      .from('assessments')
      .select('*');

    if (standardId) {
      query = query.eq('standard_id', standardId);
    }

    if (chapterId) {
      query = query.eq('chapter_id', chapterId);
    }

    if (type) {
      query = query.eq('type', type);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching assessments:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST /api/assessments
export async function POST(request: Request) {
  try {
    const teacher = await isTeacher();
    const admin = await isAdmin();
    
    if (!teacher && !admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { data, error } = await supabase
      .from('assessments')
      .insert([{
        ...body,
        created_by: (await supabase.auth.getUser()).data.user?.id
      }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating assessment:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT /api/assessments
export async function PUT(request: Request) {
  try {
    const teacher = await isTeacher();
    const admin = await isAdmin();
    
    if (!teacher && !admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { data, error } = await supabase
      .from('assessments')
      .update(body)
      .eq('id', body.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating assessment:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE /api/assessments
export async function DELETE(request: Request) {
  try {
    const teacher = await isTeacher();
    const admin = await isAdmin();
    
    if (!teacher && !admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('assessments')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting assessment:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 