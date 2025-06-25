
-- Étape 1 : Créer une table packages pour centraliser tous les packages disponibles
CREATE TABLE public.packages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category_key TEXT NOT NULL,
  category_name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  duration TEXT,
  tier TEXT NOT NULL, -- bronze, silver, gold, diamond
  features JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insérer tous les packages existants avec leur mapping vers les tiers
INSERT INTO public.packages (id, name, category_key, category_name, price, duration, tier) VALUES
-- Website packages
('website-starter', 'Starter', 'website', 'Création Site Web', 899, null, 'bronze'),
('website-business', 'Business', 'website', 'Création Site Web', 1599, null, 'silver'),
('website-premium', 'Premium E-commerce', 'website', 'Création Site Web', 2999, null, 'gold'),

-- Growth packages  
('growth-easy', 'Easy', 'growth', 'Growth Hacking IA', 299, '/mois', 'bronze'),
('growth-pro', 'Pro', 'growth', 'Growth Hacking IA', 599, '/mois', 'silver'),
('growth-enterprise', 'Enterprise', 'growth', 'Growth Hacking IA', 1299, '/mois', 'diamond'),

-- Community packages
('community-starter', 'Starter', 'community', 'Community Management', 799, '/mois', 'bronze'),
('community-growth', 'Growth', 'community', 'Community Management', 1499, '/mois', 'silver'),
('community-premium', 'Premium', 'community', 'Community Management', 2999, '/mois', 'gold'),

-- Custom packages
('custom-audit', 'Audit & Conseil', 'custom', 'Solutions Sur Mesure', 1500, null, 'bronze'),
('custom-app', 'Application Sur Mesure', 'custom', 'Solutions Sur Mesure', 15000, null, 'gold'),
('custom-enterprise', 'Solution Enterprise', 'custom', 'Solutions Sur Mesure', 50000, null, 'diamond');

-- Fonction pour calculer automatiquement le tier d'un utilisateur basé sur ses packages
CREATE OR REPLACE FUNCTION public.calculate_user_tier(user_packages TEXT[])
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  highest_tier TEXT := 'bronze';
  pkg_tier TEXT;
BEGIN
  -- Parcourir tous les packages de l'utilisateur
  FOR pkg_tier IN 
    SELECT tier FROM public.packages WHERE id = ANY(user_packages) AND is_active = true
  LOOP
    -- Déterminer le tier le plus élevé
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

-- Migrer les données existantes des invitations vers les subscriptions
-- D'abord, nettoyer les selected_packages mal formés dans user_invitations
UPDATE public.user_invitations 
SET selected_packages = '["website-starter"]'::jsonb
WHERE selected_packages::text LIKE '%bronze%' OR selected_packages::text LIKE '%silver%' OR selected_packages::text LIKE '%gold%' OR selected_packages::text LIKE '%diamond%';

-- Mettre à jour les tiers dans les profiles basé sur une logique cohérente
UPDATE public.profiles 
SET tier = 'bronze' 
WHERE tier IN ('client_bronze', 'bronze') OR tier IS NULL;

UPDATE public.profiles 
SET tier = 'silver' 
WHERE tier IN ('client_silver', 'silver');

UPDATE public.profiles 
SET tier = 'gold' 
WHERE tier IN ('client_gold', 'gold');

UPDATE public.profiles 
SET tier = 'diamond' 
WHERE tier IN ('client_diamond', 'diamond');

-- Fonction pour synchroniser les subscriptions lors de l'activation d'une invitation
CREATE OR REPLACE FUNCTION public.sync_user_subscriptions_from_invitation(invitation_id UUID, new_user_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
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
$$;

-- Ajouter des contraintes pour éviter les doublons de packages par utilisateur
ALTER TABLE public.user_subscriptions 
ADD CONSTRAINT unique_user_package UNIQUE (user_id, package_id);

-- Activer RLS sur la table packages (lecture publique, modification admin seulement)
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active packages" 
  ON public.packages 
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Only admins can manage packages" 
  ON public.packages 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );
