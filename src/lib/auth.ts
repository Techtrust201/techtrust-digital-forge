
import { betterAuth } from "better-auth";

// Configuration simplifiée pour Better Auth
const getDatabaseURL = () => {
  // URL avec le pooler Supabase pour Better Auth
  return "postgresql://postgres.psaacanfxpqfhrgmvjjn:V7KhB3zWmJ6nVLN8@aws-0-eu-central-1.pooler.supabase.com:6543/postgres";
};

const getBetterAuthURL = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return 'http://localhost:8080';
};

console.log('🔧 Better Auth Configuration:');
console.log('- Base URL:', getBetterAuthURL());
console.log('- Database URL configured with pooler');

export const auth = betterAuth({
  database: {
    provider: "postgresql",
    url: getDatabaseURL()
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
});

export type Session = typeof auth.$Infer.Session.session;
export type User = typeof auth.$Infer.Session.user;
