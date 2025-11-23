-- Create education_modules table
CREATE TABLE IF NOT EXISTS education_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  difficulty VARCHAR(50) NOT NULL, -- Beginner, Intermediate, Advanced
  duration_minutes INTEGER,
  lessons_count INTEGER DEFAULT 0,
  badge_name VARCHAR(255),
  badge_icon VARCHAR(50),
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create module_progress table to track user progress
CREATE TABLE IF NOT EXISTS module_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  module_id UUID REFERENCES education_modules(id) ON DELETE CASCADE,
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, module_id)
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  icon VARCHAR(50),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_module_progress_user_id ON module_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_module_progress_module_id ON module_progress(module_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_education_modules_order ON education_modules(order_index);

-- Insert initial modules
INSERT INTO education_modules (title, description, difficulty, duration_minutes, lessons_count, badge_name, order_index) VALUES
  ('Identifying Misinformation Basics', 'Learn the fundamental techniques to spot fake news and false information', 'Beginner', 15, 5, 'Fact Checker', 1),
  ('Source Verification Techniques', 'Master the art of verifying sources and cross-checking information', 'Intermediate', 25, 8, 'Source Detective', 2),
  ('Advanced Media Literacy', 'Deep dive into advanced fact-checking methods and media analysis', 'Advanced', 35, 12, 'Truth Guardian', 3)
ON CONFLICT DO NOTHING;

-- Insert initial achievements
INSERT INTO achievements (name, icon, description) VALUES
  ('First Module', 'BookOpen', 'Complete your first literacy module'),
  ('Perfect Score', 'Star', 'Score 100% on any module'),
  ('Speed Learner', 'TrendingUp', 'Complete a module in record time'),
  ('Master Badge', 'Award', 'Complete all three modules')
ON CONFLICT DO NOTHING;

-- Add triggers
CREATE TRIGGER update_education_modules_updated_at
  BEFORE UPDATE ON education_modules
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_module_progress_updated_at
  BEFORE UPDATE ON module_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

