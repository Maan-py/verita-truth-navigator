-- Create dashboard_data_categories table
CREATE TABLE IF NOT EXISTS dashboard_data_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id VARCHAR(50) UNIQUE NOT NULL, -- health, politics, finance, environment, education
  name VARCHAR(255) NOT NULL,
  icon VARCHAR(50),
  color VARCHAR(50),
  bg_color VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create dashboard_data_items table
CREATE TABLE IF NOT EXISTS dashboard_data_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES dashboard_data_categories(id) ON DELETE CASCADE,
  label VARCHAR(255) NOT NULL,
  value VARCHAR(255) NOT NULL,
  trend VARCHAR(50),
  source_url TEXT,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_dashboard_data_items_category ON dashboard_data_items(category_id);
CREATE INDEX IF NOT EXISTS idx_dashboard_data_categories_category_id ON dashboard_data_categories(category_id);

-- Insert initial categories
INSERT INTO dashboard_data_categories (category_id, name, icon, color, bg_color) VALUES
  ('health', 'Health', 'Heart', 'text-red-500', 'bg-red-50 dark:bg-red-950/20'),
  ('politics', 'Politics', 'Briefcase', 'text-blue-500', 'bg-blue-50 dark:bg-blue-950/20'),
  ('finance', 'Finance', 'TrendingUp', 'text-green-500', 'bg-green-50 dark:bg-green-950/20'),
  ('environment', 'Environment', 'Leaf', 'text-emerald-500', 'bg-emerald-50 dark:bg-emerald-950/20'),
  ('education', 'Education', 'GraduationCap', 'text-purple-500', 'bg-purple-50 dark:bg-purple-950/20')
ON CONFLICT (category_id) DO NOTHING;

-- Add triggers for updated_at
CREATE TRIGGER update_dashboard_categories_updated_at
  BEFORE UPDATE ON dashboard_data_categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dashboard_items_updated_at
  BEFORE UPDATE ON dashboard_data_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

