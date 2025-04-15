import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { isAdmin } from '@/lib/supabase';

// GET /api/grade-weighting
export async function GET() {
  try {
    const admin = await isAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('grade_weighting')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching grade weighting:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST /api/grade-weighting
export async function POST(request: Request) {
  try {
    const admin = await isAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { quizzes, midterms, finals, projects, participation } = body;

    // Validate total weight
    const total = quizzes + midterms + finals + projects + participation;
    if (total !== 100) {
      return NextResponse.json(
        { error: 'Total weight must equal 100%' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('grade_weighting')
      .insert([{
        quizzes,
        midterms,
        finals,
        projects,
        participation
      }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error saving grade weighting:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 