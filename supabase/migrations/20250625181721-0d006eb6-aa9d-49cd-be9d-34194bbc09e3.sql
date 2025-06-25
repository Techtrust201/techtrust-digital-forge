
-- Supprimer les anciennes fonctions qui causent l'erreur de type
DROP FUNCTION IF EXISTS public.get_complete_user_data();
DROP FUNCTION IF EXISTS public.get_user_details(uuid);

-- Recréer la fonction get_complete_user_data avec les bons types
CREATE OR REPLACE FUNCTION public.get_complete_user_data()
RETURNS TABLE (
  user_id UUID,
  email VARCHAR,
  name TEXT,
  company TEXT,
  phone TEXT,
  user_position TEXT,
  industry TEXT,
  address JSONB,
  role TEXT,
  status TEXT,
  tier TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  packages JSONB
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id as user_id,
    au.email::VARCHAR,
    p.name,
    p.company,
    p.phone,
    p."position" as user_position,
    p.industry,
    p.address,
    p.role,
    p.status,
    p.tier,
    p.created_at,
    COALESCE(
      jsonb_agg(
        jsonb_build_object(
          'id', us.package_id,
          'name', us.package_name,
          'category', us.package_category,
          'status', us.status
        )
      ) FILTER (WHERE us.package_id IS NOT NULL),
      '[]'::jsonb
    ) as packages
  FROM public.profiles p
  INNER JOIN auth.users au ON p.id = au.id
  LEFT JOIN public.user_subscriptions us ON p.id = us.user_id
  GROUP BY p.id, au.email, p.name, p.company, p.phone, p."position", p.industry, p.address, p.role, p.status, p.tier, p.created_at
  ORDER BY p.created_at DESC;
END;
$$;

-- Recréer la fonction get_user_details avec les bons types
CREATE OR REPLACE FUNCTION public.get_user_details(target_user_id UUID)
RETURNS TABLE (
  user_id UUID,
  email VARCHAR,
  name TEXT,
  company TEXT,
  phone TEXT,
  user_position TEXT,
  industry TEXT,
  address JSONB,
  role TEXT,
  status TEXT,
  tier TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  last_sign_in_at TIMESTAMP WITH TIME ZONE,
  packages JSONB,
  subscription_count INTEGER,
  total_revenue NUMERIC
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id as user_id,
    au.email::VARCHAR,
    p.name,
    p.company,
    p.phone,
    p."position" as user_position,
    p.industry,
    p.address,
    p.role,
    p.status,
    p.tier,
    p.created_at,
    au.last_sign_in_at,
    COALESCE(
      jsonb_agg(
        jsonb_build_object(
          'id', us.package_id,
          'name', us.package_name,
          'category', us.package_category,
          'status', us.status,
          'created_at', us.created_at,
          'expires_at', us.expires_at
        )
      ) FILTER (WHERE us.package_id IS NOT NULL),
      '[]'::jsonb
    ) as packages,
    COALESCE(COUNT(us.id), 0)::INTEGER as subscription_count,
    COALESCE(SUM(pkg.price), 0) as total_revenue
  FROM public.profiles p
  INNER JOIN auth.users au ON p.id = au.id
  LEFT JOIN public.user_subscriptions us ON p.id = us.user_id
  LEFT JOIN public.packages pkg ON us.package_id = pkg.id
  WHERE p.id = target_user_id
  GROUP BY p.id, au.email, p.name, p.company, p.phone, p."position", p.industry, p.address, p.role, p.status, p.tier, p.created_at, au.last_sign_in_at;
END;
$$;
