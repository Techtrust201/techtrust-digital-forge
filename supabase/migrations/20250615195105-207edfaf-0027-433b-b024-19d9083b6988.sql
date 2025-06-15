
-- Correction critique: Modifier user_analytics pour accepter des session_id texte
ALTER TABLE user_analytics ALTER COLUMN user_id TYPE TEXT;

-- Créer les tables Better-Auth
CREATE TABLE IF NOT EXISTS "user" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT,
  "email" TEXT NOT NULL UNIQUE,
  "emailVerified" BOOLEAN NOT NULL DEFAULT false,
  "image" TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "session" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "expiresAt" TIMESTAMP NOT NULL,
  "ipAddress" TEXT,
  "userAgent" TEXT,
  "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "account" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "accountId" TEXT NOT NULL,
  "providerId" TEXT NOT NULL,
  "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  "accessToken" TEXT,
  "refreshToken" TEXT,
  "idToken" TEXT,
  "expiresAt" TIMESTAMP,
  "password" TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "verification" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "identifier" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  "expiresAt" TIMESTAMP NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Créer table des rôles utilisateur
CREATE TYPE app_role AS ENUM ('super_admin', 'admin', 'manager', 'employee', 'client');

CREATE TABLE IF NOT EXISTS "user_roles" (
  "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  "role" app_role NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE("userId", "role")
);

-- Activer RLS sur les tables sensibles
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_analytics ENABLE ROW LEVEL SECURITY;

-- Fonction sécurisée pour vérifier les rôles
CREATE OR REPLACE FUNCTION public.has_role(_user_id TEXT, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE "userId" = _user_id
      AND role = _role
  )
$$;

-- Fonction pour vérifier si admin
CREATE OR REPLACE FUNCTION public.is_admin(_user_id TEXT)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE "userId" = _user_id
      AND role IN ('super_admin', 'admin')
  )
$$;

-- Policies pour user_roles (seuls les admins peuvent gérer)
CREATE POLICY "Admins can manage user roles" ON user_roles
  FOR ALL USING (public.is_admin(current_setting('app.current_user_id', true)));

-- Policies pour blog_posts (admins peuvent tout faire)
CREATE POLICY "Admins can manage blog posts" ON blog_posts
  FOR ALL USING (public.is_admin(current_setting('app.current_user_id', true)));

CREATE POLICY "Public can read published posts" ON blog_posts
  FOR SELECT USING (status = 'published');

-- Policies pour user_analytics (admins peuvent tout voir)
CREATE POLICY "Admins can view all analytics" ON user_analytics
  FOR SELECT USING (public.is_admin(current_setting('app.current_user_id', true)));

-- Insérer les utilisateurs de test avec Better-Auth format
INSERT INTO "user" ("id", "name", "email", "emailVerified") VALUES
  ('admin-1', 'Admin Techtrust', 'admin@techtrust.fr', true),
  ('client-starter-1', 'Client Starter', 'starter@techtrust.fr', true),
  ('client-business-1', 'Client Business', 'business@techtrust.fr', true),
  ('client-premium-1', 'Client Premium', 'premium@techtrust.fr', true),
  ('employee-1', 'Stagiaire CM', 'stagiaire@techtrust.fr', true),
  ('manager-1', 'Manager', 'manager@techtrust.fr', true)
ON CONFLICT (email) DO NOTHING;

-- Insérer les rôles correspondants
INSERT INTO "user_roles" ("userId", "role") VALUES
  ('admin-1', 'super_admin'),
  ('client-starter-1', 'client'),
  ('client-business-1', 'client'),
  ('client-premium-1', 'client'),
  ('employee-1', 'employee'),
  ('manager-1', 'manager')
ON CONFLICT ("userId", "role") DO NOTHING;

-- Créer les comptes avec mots de passe (hachés côté application)
INSERT INTO "account" ("id", "accountId", "providerId", "userId", "password") VALUES
  ('account-admin-1', 'admin@techtrust.fr', 'credential', 'admin-1', 'admin123'),
  ('account-starter-1', 'starter@techtrust.fr', 'credential', 'client-starter-1', 'starter123'),
  ('account-business-1', 'business@techtrust.fr', 'credential', 'client-business-1', 'business123'),
  ('account-premium-1', 'premium@techtrust.fr', 'credential', 'client-premium-1', 'premium123'),
  ('account-employee-1', 'stagiaire@techtrust.fr', 'credential', 'employee-1', 'stage123'),
  ('account-manager-1', 'manager@techtrust.fr', 'credential', 'manager-1', 'manager123')
ON CONFLICT ("id") DO NOTHING;
