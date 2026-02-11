-- NeoShape Database Schema

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  height NUMERIC(5,2),
  current_weight NUMERIC(5,2),
  goal TEXT CHECK (goal IN ('emagrecer', 'ganhar_massa', 'manter_peso', 'definir')),
  training_level TEXT CHECK (training_level IN ('nao_treino', 'treino_leve', 'treino_pesado')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON public.profiles FOR DELETE USING (auth.uid() = id);

-- Weight logs
CREATE TABLE IF NOT EXISTS public.weight_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  weight NUMERIC(5,2) NOT NULL,
  logged_at DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.weight_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "weight_logs_select_own" ON public.weight_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "weight_logs_insert_own" ON public.weight_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "weight_logs_update_own" ON public.weight_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "weight_logs_delete_own" ON public.weight_logs FOR DELETE USING (auth.uid() = user_id);

-- Water logs
CREATE TABLE IF NOT EXISTS public.water_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount_ml INTEGER NOT NULL,
  logged_at DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.water_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "water_logs_select_own" ON public.water_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "water_logs_insert_own" ON public.water_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "water_logs_update_own" ON public.water_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "water_logs_delete_own" ON public.water_logs FOR DELETE USING (auth.uid() = user_id);

-- Sleep logs
CREATE TABLE IF NOT EXISTS public.sleep_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quality TEXT CHECK (quality IN ('bom', 'medio', 'ruim')),
  hours NUMERIC(3,1),
  logged_at DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.sleep_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sleep_logs_select_own" ON public.sleep_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "sleep_logs_insert_own" ON public.sleep_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "sleep_logs_update_own" ON public.sleep_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "sleep_logs_delete_own" ON public.sleep_logs FOR DELETE USING (auth.uid() = user_id);

-- Training logs
CREATE TABLE IF NOT EXISTS public.training_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  trained BOOLEAN NOT NULL DEFAULT FALSE,
  logged_at DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.training_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "training_logs_select_own" ON public.training_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "training_logs_insert_own" ON public.training_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "training_logs_update_own" ON public.training_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "training_logs_delete_own" ON public.training_logs FOR DELETE USING (auth.uid() = user_id);

-- Diet logs
CREATE TABLE IF NOT EXISTS public.diet_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating TEXT CHECK (rating IN ('ok', 'mais_ou_menos', 'ruim')),
  logged_at DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.diet_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "diet_logs_select_own" ON public.diet_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "diet_logs_insert_own" ON public.diet_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "diet_logs_update_own" ON public.diet_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "diet_logs_delete_own" ON public.diet_logs FOR DELETE USING (auth.uid() = user_id);

-- Trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, height, current_weight, goal, training_level)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data ->> 'name', ''),
    new.email,
    COALESCE((new.raw_user_meta_data ->> 'height')::numeric, NULL),
    COALESCE((new.raw_user_meta_data ->> 'current_weight')::numeric, NULL),
    COALESCE(new.raw_user_meta_data ->> 'goal', NULL),
    COALESCE(new.raw_user_meta_data ->> 'training_level', NULL)
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
