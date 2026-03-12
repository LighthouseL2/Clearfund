const { Client } = require('pg');

const connectionString = "postgresql://postgres:Y%23Cr16a3369@jqqpuflightochyrwurf.supabase.co:6543/postgres";

async function testConnection() {
    const client = new Client({
        connectionString: connectionString,
        ssl: { rejectUnauthorized: false }
    });

    try {
        console.log("Connecting to Supabase (Port 6543)...");
        await client.connect();
        console.log("Connected successfully!");
        const res = await client.query('SELECT NOW()');
        console.log("Time from DB:", res.rows[0].now);
        await client.end();
    } catch (err) {
        console.log("Connection failed!");
        console.dir(err);
        process.exit(1);
    }
}

testConnection();
