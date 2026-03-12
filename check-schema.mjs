import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env'), override: true });

const { Client } = pg;

async function checkSchema() {
    const client = new Client({
        connectionString: process.env.DIRECT_URL,
    });

    try {
        await client.connect();
        console.log('Connected to database.');

        console.log('\n--- Projects Table Columns ---');
        const res = await client.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'projects'
      ORDER BY ordinal_position;
    `);

        res.rows.forEach(row => {
            console.log(`${row.column_name.padEnd(20)} | ${row.data_type.padEnd(15)} | Nullable: ${row.is_nullable}`);
        });

    } catch (err) {
        console.error('Error checking schema:', err.stack);
    } finally {
        await client.end();
    }
}

checkSchema();
