import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env'), override: true });

const { Client } = pg;

async function updateSchema() {
    const client = new Client({
        connectionString: process.env.DIRECT_URL,
        ssl: { rejectUnauthorized: false }
    });

    try {
        await client.connect();
        console.log('Connected to database.');

        console.log('Applying schema updates...');

        const sql = `
      -- Add missing columns to projects table
      ALTER TABLE projects ADD COLUMN IF NOT EXISTS "banner" TEXT;
      ALTER TABLE projects ADD COLUMN IF NOT EXISTS "location" TEXT;
      ALTER TABLE projects ADD COLUMN IF NOT EXISTS "website" TEXT;
      ALTER TABLE projects ADD COLUMN IF NOT EXISTS "twitter" TEXT;
      ALTER TABLE projects ADD COLUMN IF NOT EXISTS "github" TEXT;
      ALTER TABLE projects ADD COLUMN IF NOT EXISTS "karmaLink" TEXT;
      ALTER TABLE projects ADD COLUMN IF NOT EXISTS "impactDescription" TEXT;
      ALTER TABLE projects ADD COLUMN IF NOT EXISTS "milestones" TEXT;
      
      -- Add missing columns to tips table (if any)
      ALTER TABLE tips ADD COLUMN IF NOT EXISTS "txHash" TEXT;
      ALTER TABLE tips ADD COLUMN IF NOT EXISTS "network" TEXT DEFAULT 'celo';
      ALTER TABLE tips ADD COLUMN IF NOT EXISTS "anonymous" BOOLEAN DEFAULT false;

      -- Ensure unique constraints
      DO $$
      BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace WHERE c.relname = 'projects_slug_key' AND n.nspname = 'public') THEN
              ALTER TABLE projects ADD CONSTRAINT projects_slug_key UNIQUE (slug);
          END IF;
          IF NOT EXISTS (SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace WHERE c.relname = 'tips_txhash_key' AND n.nspname = 'public') THEN
              ALTER TABLE tips ADD CONSTRAINT tips_txhash_key UNIQUE ("txHash");
          END IF;
      END $$;
    `;

        await client.query(sql);
        console.log('Schema updated successfully!');

    } catch (err) {
        console.error('Error updating schema:', err.stack);
    } finally {
        await client.end();
    }
}

updateSchema();
