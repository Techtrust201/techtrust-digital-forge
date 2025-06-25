
-- Fonction pour récupérer les données complètes des utilisateurs avec leurs vrais emails
CREATE OR REPLACE FUNCTION public.get_complete_user_data()
RETURNS TABLE (
  user_id UUID,
  email TEXT,
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
    au.email,
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

-- Fonction pour obtenir les détails complets d'un utilisateur spécifique
CREATE OR REPLACE FUNCTION public.get_user_details(target_user_id UUID)
RETURNS TABLE (
  user_id UUID,
  email TEXT,
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
    au.email,
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

-- Fonction pour sauvegarder les packages d'un utilisateur
CREATE OR REPLACE FUNCTION public.update_user_packages(
  target_user_id UUID,
  new_package_ids TEXT[]
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  pkg_id TEXT;
  pkg_data RECORD;
BEGIN
  -- Désactiver tous les packages existants
  UPDATE public.user_subscriptions 
  SET status = 'inactive', updated_at = now()
  WHERE user_id = target_user_id;
  
  -- Ajouter/réactiver les nouveaux packages
  FOREACH pkg_id IN ARRAY new_package_ids
  LOOP
    -- Récupérer les données du package
    SELECT * INTO pkg_data FROM public.packages WHERE id = pkg_id AND is_active = true;
    
    IF pkg_data.id IS NOT NULL THEN
      -- Insérer ou mettre à jour la subscription
      INSERT INTO public.user_subscriptions (
        user_id,
        package_id,
        package_name,
        package_category,
        status,
        expires_at
      ) VALUES (
        target_user_id,
        pkg_data.id,
        pkg_data.name,
        pkg_data.category_key,
        'active',
        CASE 
          WHEN pkg_data.duration IS NOT NULL THEN now() + INTERVAL '1 month'
          ELSE NULL
        END
      )
      ON CONFLICT (user_id, package_id) DO UPDATE SET
        status = 'active',
        updated_at = now(),
        expires_at = CASE 
          WHEN EXCLUDED.expires_at IS NOT NULL THEN now() + INTERVAL '1 month'
          ELSE NULL
        END;
    END IF;
  END LOOP;
  
  -- Mettre à jour le tier du profil utilisateur
  UPDATE public.profiles 
  SET 
    tier = public.calculate_user_tier(new_package_ids),
    updated_at = now()
  WHERE id = target_user_id;
END;
$$;
