import db from '@/config/sqlite';
import { NextResponse } from 'next/server';

interface LatestRow {
    latestId: number
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const result = await db.execute({ sql: "Select Coalesce(Max(id), 0) As latestId From Review" });
        const nextId = Number(result.rows[0].latestId) + 1

        db.execute({ sql: 'Insert Into Review (id, location_id, comment, created_by, created_date, modified_date) values (?, ?, ?, ?, ?, ?)', args: [nextId, body.locationId, body.comment, body.actionBy, getCurrentDateFormat(), getCurrentDateFormat()] })
        return NextResponse.json({ errMsg: "" });
    } catch (errMsg) {
        return NextResponse.json(errMsg);
    }
}


const getCurrentDateFormat = () => {
    const date = new Date()
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}