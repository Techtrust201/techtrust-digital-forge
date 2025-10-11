-- Ajouter l'utilisateur contact@tech-trust.fr dans la table user
INSERT INTO "user" (id, email, name, "emailVerified", "createdAt", "updatedAt")
VALUES (
  '422f96b6-78c1-49a0-b709-7e6867b58494',
  'contact@tech-trust.fr',
  'Super Admin',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  name = EXCLUDED.name,
  "updatedAt" = NOW();

-- Ajouter le rôle super_admin pour cet utilisateur
INSERT INTO user_roles ("userId", role, "createdAt")
VALUES (
  '422f96b6-78c1-49a0-b709-7e6867b58494',
  'super_admin',
  NOW()
)
ON CONFLICT ("userId", role) DO NOTHING;