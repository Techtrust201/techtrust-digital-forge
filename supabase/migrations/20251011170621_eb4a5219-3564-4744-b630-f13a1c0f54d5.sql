-- Corriger toutes les fonctions avec search_path mutable

-- 1. Corriger has_role
CREATE OR REPLACE FUNCTION public.has_role(_user_id text, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE 
SECURITY DEFINER
SET search_path = public
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE "userId" = _user_id
      AND role = _role
  )
$function$;

-- 2. Corriger is_admin
CREATE OR REPLACE FUNCTION public.is_admin(_user_id text)
RETURNS boolean
LANGUAGE sql
STABLE 
SECURITY DEFINER
SET search_path = public
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE "userId" = _user_id
      AND role IN ('super_admin', 'admin')
  )
$function$;

-- 3. Corriger update_user_packages
CREATE OR REPLACE FUNCTION public.update_user_packages(target_user_id uuid, new_package_ids text[])
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
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
$function$;

-- 4. Corriger get_complete_user_data
CREATE OR REPLACE FUNCTION public.get_complete_user_data()
RETURNS TABLE(user_id uuid, email character varying, name text, company text, phone text, user_position text, industry text, address jsonb, role text, status text, tier text, created_at timestamp with time zone, packages jsonb)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
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
$function$;

-- 5. Corriger get_user_details
CREATE OR REPLACE FUNCTION public.get_user_details(target_user_id uuid)
RETURNS TABLE(user_id uuid, email character varying, name text, company text, phone text, user_position text, industry text, address jsonb, role text, status text, tier text, created_at timestamp with time zone, last_sign_in_at timestamp with time zone, packages jsonb, subscription_count integer, total_revenue numeric)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
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
$function$;

-- 6. Corriger sync_user_subscriptions_from_invitation
CREATE OR REPLACE FUNCTION public.sync_user_subscriptions_from_invitation(invitation_id uuid, new_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  invitation_packages JSONB;
  pkg_id TEXT;
  pkg_data RECORD;
BEGIN
  -- Récupérer les packages sélectionnés dans l'invitation
  SELECT selected_packages INTO invitation_packages
  FROM public.user_invitations 
  WHERE id = invitation_id;
  
  -- Pour chaque package sélectionné, créer une subscription
  FOR pkg_id IN SELECT jsonb_array_elements_text(invitation_packages)
  LOOP
    -- Récupérer les données du package
    SELECT * INTO pkg_data FROM public.packages WHERE id = pkg_id AND is_active = true;
    
    IF pkg_data.id IS NOT NULL THEN
      -- Insérer la subscription
      INSERT INTO public.user_subscriptions (
        user_id,
        package_id,
        package_name,
        package_category,
        status,
        expires_at
      ) VALUES (
        new_user_id,
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
        updated_at = now();
    END IF;
  END LOOP;
  
  -- Mettre à jour le tier du profil utilisateur
  UPDATE public.profiles 
  SET tier = public.calculate_user_tier(
    ARRAY(SELECT jsonb_array_elements_text(invitation_packages))
  )
  WHERE id = new_user_id;
END;
$function$;