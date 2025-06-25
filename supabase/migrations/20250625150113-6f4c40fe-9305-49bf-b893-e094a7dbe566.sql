
-- Créer une table pour stocker les invitations en attente
CREATE TABLE public.user_invitations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  name text NOT NULL,
  company text,
  phone text,
  position text,
  industry text,
  address jsonb,
  selected_packages jsonb NOT NULL DEFAULT '[]'::jsonb,
  notes text,
  invitation_token text NOT NULL UNIQUE,
  expires_at timestamp with time zone NOT NULL DEFAULT (now() + interval '7 days'),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'expired')),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  activated_at timestamp with time zone,
  user_id uuid REFERENCES auth.users(id)
);

-- Activer RLS sur la table des invitations
ALTER TABLE public.user_invitations ENABLE ROW LEVEL SECURITY;

-- Créer une politique pour que les admins puissent tout voir
CREATE POLICY "Admins can manage all invitations" 
  ON public.user_invitations 
  FOR ALL 
  USING (auth.uid() IN (
    SELECT id FROM public.profiles WHERE role = 'super_admin'
  ));

-- Créer une fonction pour générer un token d'invitation sécurisé
CREATE OR REPLACE FUNCTION public.generate_invitation_token()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  token text;
BEGIN
  -- Générer un token aléatoire de 32 caractères
  token := encode(gen_random_bytes(24), 'base64');
  -- Remplacer les caractères problématiques pour les URLs
  token := replace(replace(replace(token, '+', '-'), '/', '_'), '=', '');
  RETURN token;
END;
$$;

-- Créer une fonction pour nettoyer les invitations expirées
CREATE OR REPLACE FUNCTION public.cleanup_expired_invitations()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.user_invitations 
  SET status = 'expired' 
  WHERE expires_at < now() AND status = 'pending';
END;
$$;
