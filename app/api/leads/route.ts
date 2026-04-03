import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Lazy Supabase client — created at runtime, not build time.
// This prevents "supabaseUrl is required" errors during `next build`
// when env vars are not yet available (Vercel sets them at deploy time).
function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error('Missing Supabase environment variables. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
  }

  return createClient(url, key);
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(data, { headers: corsHeaders });
  } catch (err: any) {
    console.error('GET /api/leads error:', err);
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders });
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = getSupabase();
    const body = await req.json();
    const { name, company, email, value, status, region } = body;

    const { data, error } = await supabase
      .from('leads')
      .insert({
        name,
        company,
        email,
        value,
        status,
        region,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201, headers: corsHeaders });
  } catch (err: any) {
    console.error('POST /api/leads error:', err);
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const supabase = getSupabase();
    const body = await req.json();
    const { id, name, company, email, value, status, region } = body;

    const { data, error } = await supabase
      .from('leads')
      .update({
        name,
        company,
        email,
        value,
        status,
        region,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { headers: corsHeaders });
  } catch (err: any) {
    console.error('PUT /api/leads error:', err);
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const supabase = getSupabase();
    const body = await req.json();
    const { id } = body;

    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ ok: true }, { headers: corsHeaders });
  } catch (err: any) {
    console.error('DELETE /api/leads error:', err);
    return NextResponse.json({ error: err.message }, { status: 500, headers: corsHeaders });
  }
}
