-- =====================================================
-- CRITICAL SECURITY FIXES (SIMPLIFIED)
-- =====================================================

-- 1. Enable RLS on legacy auth tables
ALTER TABLE public.account ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."user" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification ENABLE ROW LEVEL SECURITY;

-- Add restrictive policies
CREATE POLICY "Users can only access their own account records"
ON public.account FOR ALL TO authenticated
USING ("userId" = auth.uid()::text)
WITH CHECK ("userId" = auth.uid()::text);

CREATE POLICY "Users can only access their own user records"
ON public."user" FOR ALL TO authenticated
USING (id = auth.uid()::text)
WITH CHECK (id = auth.uid()::text);

CREATE POLICY "Users can only access their own sessions"
ON public.session FOR ALL TO authenticated
USING ("userId" = auth.uid()::text)
WITH CHECK ("userId" = auth.uid()::text);

CREATE POLICY "Users can only access their own verifications"
ON public.verification FOR ALL TO authenticated
USING (identifier = auth.uid()::text)
WITH CHECK (identifier = auth.uid()::text);

-- 2. Enable RLS on user_roles (without foreign key migration for now)
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Add policies to prevent users from modifying their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT TO authenticated
USING ("userId" = auth.uid()::text);

CREATE POLICY "Only admins can manage roles"
ON public.user_roles FOR ALL TO authenticated
USING (public.is_admin(auth.uid()::text))
WITH CHECK (public.is_admin(auth.uid()::text));

-- 3. Update RLS policies on profiles to use user_roles
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can insert profiles" ON public.profiles;

CREATE POLICY "Admins can view all profiles"
ON public.profiles FOR SELECT TO authenticated
USING (public.is_admin(auth.uid()::text));

CREATE POLICY "Admins can update all profiles"
ON public.profiles FOR UPDATE TO authenticated
USING (public.is_admin(auth.uid()::text));

CREATE POLICY "Admins can insert profiles"
ON public.profiles FOR INSERT TO authenticated
WITH CHECK (public.is_admin(auth.uid()::text));

-- 4. Fix SECURITY DEFINER functions - add search_path protection
CREATE OR REPLACE FUNCTION public.cleanup_expired_invitations()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.user_invitations 
  SET status = 'expired' 
  WHERE expires_at < now() AND status = 'pending';
END;
$$;

CREATE OR REPLACE FUNCTION public.calculate_user_tier(user_packages text[])
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  highest_tier TEXT := 'bronze';
  pkg_tier TEXT;
BEGIN
  FOR pkg_tier IN 
    SELECT tier FROM public.packages WHERE id = ANY(user_packages) AND is_active = true
  LOOP
    IF pkg_tier = 'diamond' THEN
      highest_tier := 'diamond';
    ELSIF pkg_tier = 'gold' AND highest_tier != 'diamond' THEN
      highest_tier := 'gold';
    ELSIF pkg_tier = 'silver' AND highest_tier NOT IN ('diamond', 'gold') THEN
      highest_tier := 'silver';
    END IF;
  END LOOP;
  RETURN highest_tier;
END;
$$;

CREATE OR REPLACE FUNCTION public.generate_invitation_token()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  token text;
BEGIN
  token := encode(gen_random_bytes(24), 'base64');
  token := replace(replace(replace(token, '+', '-'), '/', '_'), '=', '');
  RETURN token;
END;
$$;

CREATE OR REPLACE FUNCTION public.increment_article_views(article_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.blog_posts 
  SET views = COALESCE(views, 0) + 1,
      updated_at = now()
  WHERE id = article_id;
END;
$$;