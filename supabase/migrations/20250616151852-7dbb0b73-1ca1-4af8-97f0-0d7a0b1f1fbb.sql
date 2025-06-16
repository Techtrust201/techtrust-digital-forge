
-- Créer un compte super admin avec l'email contact@tech-trust.fr
-- Note: Ceci crée directement un profil, l'utilisateur devra s'inscrire normalement via l'interface
-- puis on mettra à jour son rôle vers super_admin

-- D'abord, on va créer une fonction pour mettre à jour le rôle d'un utilisateur existant
CREATE OR REPLACE FUNCTION public.update_user_role_by_email(_email text, _role text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  user_uuid uuid;
BEGIN
  -- Trouver l'UUID de l'utilisateur basé sur l'email
  SELECT id INTO user_uuid 
  FROM auth.users 
  WHERE email = _email;
  
  -- Si l'utilisateur existe, mettre à jour son rôle
  IF user_uuid IS NOT NULL THEN
    UPDATE public.profiles 
    SET role = _role, updated_at = now()
    WHERE id = user_uuid;
    RETURN true;
  END IF;
  
  RETURN false;
END;
$$;

-- Créer un trigger pour automatiquement donner le rôle super_admin à contact@tech-trust.fr
CREATE OR REPLACE FUNCTION public.handle_tech_trust_admin()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Si c'est l'email admin de Tech Trust, assigner le rôle super_admin
  IF NEW.email = 'contact@tech-trust.fr' THEN
    INSERT INTO public.profiles (id, name, company, role)
    VALUES (
      NEW.id, 
      COALESCE(NEW.raw_user_meta_data->>'name', 'Admin Tech Trust'),
      COALESCE(NEW.raw_user_meta_data->>'company_name', 'Tech Trust'),
      'super_admin'
    );
  ELSE
    -- Comportement normal pour les autres utilisateurs
    INSERT INTO public.profiles (id, name, company, role)
    VALUES (
      NEW.id, 
      COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
      NEW.raw_user_meta_data->>'company_name',
      COALESCE(NEW.raw_user_meta_data->>'role', 'client_bronze')
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Remplacer l'ancien trigger par le nouveau
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_tech_trust_admin();
