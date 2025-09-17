// import Database from 'better-sqlite3';
// import path from 'path';

// const dbPath = path.join(process.cwd(), 'daisyreview.db');
// const db = new Database(dbPath);

import { createClient } from '@libsql/client';

const db = createClient({
    url: process.env.TURSO_URL!,
    authToken: process.env.TURSO_TOKEN!,
});

export default db;