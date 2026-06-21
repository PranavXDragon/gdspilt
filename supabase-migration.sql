-- PeerSplit Supabase Migration
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor → New Query)

-- ========================================
-- 1. GROUPS TABLE (new - app needs groups)
-- ========================================
CREATE TABLE IF NOT EXISTS groups (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'Unnamed Group',
  currency TEXT NOT NULL DEFAULT '₹',
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- 2. ACTIVITY TABLE (new - app needs activity log)
-- ========================================
CREATE TABLE IF NOT EXISTS activity (
  id TEXT PRIMARY KEY,
  group_id TEXT NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  data JSONB DEFAULT '{}',
  "by" TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activity_group_id ON activity(group_id);

-- ========================================
-- 3. ADD group_id TO EXISTING TABLES
-- ========================================
ALTER TABLE members ADD COLUMN IF NOT EXISTS group_id TEXT REFERENCES groups(id) ON DELETE CASCADE;
ALTER TABLE members ADD COLUMN IF NOT EXISTS site_id TEXT;
ALTER TABLE members ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE expenses ADD COLUMN IF NOT EXISTS group_id TEXT REFERENCES groups(id) ON DELETE CASCADE;
ALTER TABLE expenses ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE payments ADD COLUMN IF NOT EXISTS group_id TEXT REFERENCES groups(id) ON DELETE CASCADE;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- ========================================
-- 4. INDEXES
-- ========================================
CREATE INDEX IF NOT EXISTS idx_members_group_id ON members(group_id);
CREATE INDEX IF NOT EXISTS idx_expenses_group_id ON expenses(group_id);
CREATE INDEX IF NOT EXISTS idx_payments_group_id ON payments(group_id);

-- ========================================
-- 5. ROW LEVEL SECURITY (open access for now)
-- ========================================
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all on groups" ON groups;
CREATE POLICY "Allow all on groups" ON groups FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all on activity" ON activity;
CREATE POLICY "Allow all on activity" ON activity FOR ALL USING (true) WITH CHECK (true);

-- Members, expenses, payments already have RLS enabled or will use existing policies

-- ========================================
-- 6. AUTO-UPDATE TRIGGER
-- ========================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_groups_updated_at ON groups;
CREATE TRIGGER update_groups_updated_at
  BEFORE UPDATE ON groups
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- 7. SET DEFAULT GROUP_ID FOR EXISTING DATA
-- (Creates a default group and assigns existing data to it)
-- ========================================
INSERT INTO groups (id, name, currency)
SELECT 'default-group', 'Default Group', '₹'
WHERE NOT EXISTS (SELECT 1 FROM groups WHERE id = 'default-group');

UPDATE members SET group_id = 'default-group' WHERE group_id IS NULL;
UPDATE expenses SET group_id = 'default-group' WHERE group_id IS NULL;
UPDATE payments SET group_id = 'default-group' WHERE group_id IS NULL;
