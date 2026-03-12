const { Client } = require('pg');

const config = {
    user: 'postgres',
    password: '#Cr16a3369',
    host: 'db.jqqpuflightochyrwurf.supabase.co',
    port: 5432,
    database: 'postgres',
    ssl: { rejectUnauthorized: false }
};

const sql = `
CREATE TABLE IF NOT EXISTS "projects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "fundingGoal" DOUBLE PRECISION,
    "totalRaised" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "tipCount" INTEGER NOT NULL DEFAULT 0,
    "walletAddress" TEXT NOT NULL,
    "website" TEXT,
    "twitter" TEXT,
    "discord" TEXT,
    "telegram" TEXT,
    "github" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "submittedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "projects_slug_key" ON "projects"("slug");

CREATE TABLE IF NOT EXISTS "tips" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "donorWallet" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "amountUSD" DOUBLE PRECISION,
    "txHash" TEXT NOT NULL,
    "blockNumber" INTEGER,
    "network" TEXT NOT NULL DEFAULT 'celo',
    "message" TEXT,
    "anonymous" BOOLEAN NOT NULL DEFAULT false,
    "projectName" TEXT,
    "projectLogo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tips_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "tips_txHash_key" ON "tips"("txHash");

-- Drop if exists to avoid errors on retry
ALTER TABLE "tips" DROP CONSTRAINT IF EXISTS "tips_projectId_fkey";
ALTER TABLE "tips" ADD CONSTRAINT "tips_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
`;

async function run() {
    const client = new Client(config);

    try {
        console.log("Connecting to Supabase (Direct) to create tables...");
        await client.connect();
        console.log("Connected!");

        await client.query(sql);
        console.log("Tables created successfully!");

        await client.end();
    } catch (err) {
        console.error("Failed to create tables:");
        console.dir(err);
        process.exit(1);
    }
}

run();
