-- SQL Migration to update projects table with ReFi Project V2.2 (Banner)
-- Run this in your Supabase SQL Editor

ALTER TABLE projects ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS website TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS twitter TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS github TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS "impactDescription" TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS karma_link TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS milestones TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS banner TEXT; -- Compulsory banner image field

-- Ensure logo exists too (standardizing)
ALTER TABLE projects ADD COLUMN IF NOT EXISTS logo TEXT;
