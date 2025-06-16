
import { betterAuth } from "better-auth";

// Configuration corrigée pour Better Auth avec pooler Supabase
const getDatabaseURL = () => {
  // URL avec le pooler Supabase - port 6543
  return "postgresql://postgres.psaacanfxpqfhrgmvjjn:V7KhB3zWmJ6nVLN8@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require";
};

const getBetterAuthURL = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return 'http://localhost:8080';
};

console.log('🔧 Better Auth Configuration:');
console.log('- Base URL:', getBetterAuthURL());
console.log('- Database URL configured with pooler and SSL');

export const auth = betterAuth({
  database: {
    provider: "postgresql",
    url: getDatabaseURL(),
    // Configuration pour le pooler Supabase (port 6543)
    options: {
      // Désactiver les prepared statements pour le pooler transaction
      simple_protocol: true,
      statement_timeout: 0,
      idle_in_transaction_session_timeout: 0,
      allowExitOnIdle: true
    }
  },
  baseURL: getBetterAuthURL(),
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
  // Supprimé debugLogs car non supporté dans cette version
});

export type Session = typeof auth.$Infer.Session.session;
export type User = typeof auth.$Infer.Session.user;
