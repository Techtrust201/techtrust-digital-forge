
-- Ajouter la colonne role à la table profiles
ALTER TABLE public.profiles 
ADD COLUMN role text NOT NULL DEFAULT 'client_bronze';

-- Mettre à jour la fonction handle_new_user pour inclure le role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, company, role)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data->>'name', new.email),
    new.raw_user_meta_data->>'company_name',
    COALESCE(new.raw_user_meta_data->>'role', 'client_bronze')
  );
  RETURN new;
END;
$$;
