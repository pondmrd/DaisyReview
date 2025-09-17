import db from '@/config/sqlite';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json()

        db.prepare("Delete From Review Where id=?").run(body.id)
        
        return NextResponse.json({ errMsg: "" });
    } catch (errMsg) {
        return NextResponse.json(errMsg);
    }
}