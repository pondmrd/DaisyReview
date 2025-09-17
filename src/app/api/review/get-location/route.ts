import db from '@/config/sqlite';
import { NextResponse } from 'next/server';


export async function GET() {
  const locations = await db.execute('SELECT * FROM Location');
  return NextResponse.json(locations.rows);
}