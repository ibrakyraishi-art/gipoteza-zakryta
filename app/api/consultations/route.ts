import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await sql`
      SELECT * FROM consultations 
      ORDER BY created_at DESC
    `;

    return NextResponse.json({ 
      success: true, 
      consultations: result.rows 
    });
  } catch (error) {
    console.error('Get consultations error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      consultations: []
    }, { status: 500 });
  }
}
