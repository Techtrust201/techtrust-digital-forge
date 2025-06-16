
import { betterAuth } from "better-auth";

// Configuration Better Auth côté serveur
export const auth = betterAuth({
  database: {
    provider: "postgresql", 
    url: "postgresql://postgres.psaacanfxpqfhrgmvjjn:V7KhB3zWmJ6nVLN8@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require",
    options: {
      // Désactiver les prepared statements pour le pooler Supabase
      simple_protocol: true,
      statement_timeout: 0,
      idle_in_transaction_session_timeout: 0,
      allowExitOnIdle: true
    }
  },
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://preview--techtrust-digital-forge.lovable.app' 
    : 'http://localhost:8080',
  trustedOrigins: [
    'http://localhost:8080',
    'https://preview--techtrust-digital-forge.lovable.app',
    'https://www.tech-trust.fr'
  ],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "client"
      }
    }
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 jours
    updateAge: 60 * 60 * 24 // Mise à jour quotidienne
  }
});

export type Session = typeof auth.$Infer.Session.session;
export type User = typeof auth.$Infer.Session.user;
