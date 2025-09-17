import db from '@/config/sqlite';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json()
        await db.execute({ sql: "Update Review Set comment = ?, modified_date = ? where id=?", args: [body.comment, getCurrentDateFormat(), body.id] })

        return NextResponse.json({ errMsg: "" });
    } catch (errMsg) {
        return NextResponse.json(errMsg);
    }
}

const getCurrentDateFormat = () => {
    const date = new Date()
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}
