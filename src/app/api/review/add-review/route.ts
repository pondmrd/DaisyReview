import db from '@/config/sqlite';
import { NextResponse } from 'next/server';

interface latestRow {
    latestId: number
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const result = db.prepare("Select Coalesce(Max(id), 0) As latestId From Review").get() as latestRow;
        const nextId = result.latestId + 1

        db.prepare('Insert Into Review (id, location_id, comment, created_by, created_date, modified_date) values (?, ?, ?, ?, ?, ?)').run(nextId, body.locationId, body.comment, body.actionBy, getCurrentDateFormat(), getCurrentDateFormat())
        return NextResponse.json({ errMsg: "" });
    } catch (errMsg) {
        return NextResponse.json(errMsg);
    }
}


const getCurrentDateFormat = () =>{
    const date = new Date()
    return `${date.getFullYear()}-${date.getMonth() +1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}