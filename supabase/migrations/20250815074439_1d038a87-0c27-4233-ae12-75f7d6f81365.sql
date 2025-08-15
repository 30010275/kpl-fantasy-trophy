-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Create KPL teams table
CREATE TABLE public.kpl_teams (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  short_name TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  founded_year INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on teams
ALTER TABLE public.kpl_teams ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for teams (readable by all, only admins can modify)
CREATE POLICY "Anyone can view teams" ON public.kpl_teams FOR SELECT USING (true);
CREATE POLICY "Only admins can manage teams" ON public.kpl_teams FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- Create players table
CREATE TABLE public.players (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL CHECK (position IN ('GK', 'DEF', 'MID', 'FWD')),
  team_id UUID NOT NULL REFERENCES public.kpl_teams(id) ON DELETE CASCADE,
  price INTEGER NOT NULL DEFAULT 50, -- Price in KES (stored as integer, divide by 10 for actual price)
  total_points INTEGER DEFAULT 0,
  photo_url TEXT,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'injured', 'suspended')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on players
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for players
CREATE POLICY "Anyone can view players" ON public.players FOR SELECT USING (true);
CREATE POLICY "Only admins can manage players" ON public.players FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- Create gameweeks table
CREATE TABLE public.gameweeks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  number INTEGER NOT NULL UNIQUE,
  name TEXT NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  is_current BOOLEAN DEFAULT FALSE,
  is_finished BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on gameweeks
ALTER TABLE public.gameweeks ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for gameweeks
CREATE POLICY "Anyone can view gameweeks" ON public.gameweeks FOR SELECT USING (true);
CREATE POLICY "Only admins can manage gameweeks" ON public.gameweeks FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- Create fixtures table
CREATE TABLE public.fixtures (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  gameweek_id UUID NOT NULL REFERENCES public.gameweeks(id) ON DELETE CASCADE,
  home_team_id UUID NOT NULL REFERENCES public.kpl_teams(id) ON DELETE CASCADE,
  away_team_id UUID NOT NULL REFERENCES public.kpl_teams(id) ON DELETE CASCADE,
  kickoff_time TIMESTAMP WITH TIME ZONE NOT NULL,
  home_score INTEGER,
  away_score INTEGER,
  is_finished BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on fixtures
ALTER TABLE public.fixtures ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for fixtures
CREATE POLICY "Anyone can view fixtures" ON public.fixtures FOR SELECT USING (true);
CREATE POLICY "Only admins can manage fixtures" ON public.fixtures FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- Create fantasy teams table
CREATE TABLE public.fantasy_teams (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  budget_remaining INTEGER DEFAULT 1000, -- Remaining budget in KES (stored as integer, divide by 10)
  total_points INTEGER DEFAULT 0,
  gameweek_points INTEGER DEFAULT 0,
  transfers_made INTEGER DEFAULT 0,
  free_transfers INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on fantasy teams
ALTER TABLE public.fantasy_teams ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for fantasy teams
CREATE POLICY "Users can view all fantasy teams" ON public.fantasy_teams FOR SELECT USING (true);
CREATE POLICY "Users can manage their own fantasy team" ON public.fantasy_teams FOR ALL USING (auth.uid() = user_id);

-- Create fantasy team players table (squad selection)
CREATE TABLE public.fantasy_team_players (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  fantasy_team_id UUID NOT NULL REFERENCES public.fantasy_teams(id) ON DELETE CASCADE,
  player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
  gameweek_id UUID NOT NULL REFERENCES public.gameweeks(id) ON DELETE CASCADE,
  is_starting BOOLEAN DEFAULT FALSE,
  is_captain BOOLEAN DEFAULT FALSE,
  is_vice_captain BOOLEAN DEFAULT FALSE,
  position_order INTEGER, -- For lineup ordering
  points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(fantasy_team_id, player_id, gameweek_id),
  UNIQUE(fantasy_team_id, gameweek_id, is_captain) WHERE is_captain = true,
  UNIQUE(fantasy_team_id, gameweek_id, is_vice_captain) WHERE is_vice_captain = true
);

-- Enable RLS on fantasy team players
ALTER TABLE public.fantasy_team_players ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for fantasy team players
CREATE POLICY "Users can view all fantasy team players" ON public.fantasy_team_players FOR SELECT USING (true);
CREATE POLICY "Users can manage their own fantasy team players" ON public.fantasy_team_players FOR ALL USING (
  EXISTS (SELECT 1 FROM public.fantasy_teams WHERE id = fantasy_team_id AND user_id = auth.uid())
);

-- Create player performance table
CREATE TABLE public.player_performances (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
  fixture_id UUID NOT NULL REFERENCES public.fixtures(id) ON DELETE CASCADE,
  gameweek_id UUID NOT NULL REFERENCES public.gameweeks(id) ON DELETE CASCADE,
  minutes_played INTEGER DEFAULT 0,
  goals INTEGER DEFAULT 0,
  assists INTEGER DEFAULT 0,
  saves INTEGER DEFAULT 0,
  clean_sheet BOOLEAN DEFAULT FALSE,
  yellow_cards INTEGER DEFAULT 0,
  red_cards INTEGER DEFAULT 0,
  own_goals INTEGER DEFAULT 0,
  penalties_missed INTEGER DEFAULT 0,
  penalties_saved INTEGER DEFAULT 0,
  points INTEGER DEFAULT 0,
  bonus_points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(player_id, fixture_id)
);

-- Enable RLS on player performances
ALTER TABLE public.player_performances ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for player performances
CREATE POLICY "Anyone can view player performances" ON public.player_performances FOR SELECT USING (true);
CREATE POLICY "Only admins can manage player performances" ON public.player_performances FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_kpl_teams_updated_at BEFORE UPDATE ON public.kpl_teams FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_players_updated_at BEFORE UPDATE ON public.players FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_gameweeks_updated_at BEFORE UPDATE ON public.gameweeks FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_fixtures_updated_at BEFORE UPDATE ON public.fixtures FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_fantasy_teams_updated_at BEFORE UPDATE ON public.fantasy_teams FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_player_performances_updated_at BEFORE UPDATE ON public.player_performances FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle user signup and create profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();