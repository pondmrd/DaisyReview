import db from '@/config/sqlite';
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
  const body = await req.json()
  const reviews = await db.execute({
    sql: 'SELECT * FROM Review Where location_id = ? Order by id',
    args: [body.locationId]
  });
  return NextResponse.json(reviews.rows);
}