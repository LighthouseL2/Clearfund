const { Client } = require('pg');

const config = {
    user: 'postgres.jqqpuflightochyrwurf',
    password: '#Cr16a3369clearfund', // Testing with clearfund appended
    host: 'aws-1-eu-west-1.pooler.supabase.com',
    port: 6543,
    database: 'postgres',
    ssl: { rejectUnauthorized: false }
};

async function test() {
    console.log("Starting DB connection test...");
    const client = new Client(config);
    try {
        console.log("Connecting...");
        await client.connect();
        console.log("SUCCESS! Database Connected.");

        const res = await client.query("SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public'");
        console.log("Tables count in public schema:", res.rows[0].count);

        await client.end();
    } catch (err) {
        console.error("CONNECTION FAILED!");
        console.error("Message:", err.message);
        console.error("Code:", err.code);
        process.exit(1);
    }
}
test();
