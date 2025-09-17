import db from '@/config/sqlite';
import { NextResponse } from 'next/server';


export function GET() {
  const locations = db.prepare('SELECT * FROM Location').all();
  return NextResponse.json(locations);
}