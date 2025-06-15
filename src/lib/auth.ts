
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

// Configuration flexible pour multi-environnements
const getBetterAuthURL = () => {
  if (typeof window !== 'undefined') {
    const origin = window.location.origin;
    
    // Production
    if (origin.includes('tech-trust.fr')) {
      return 'https://www.tech-trust.fr';
    }
    
    // Lovable staging
    if (origin.includes('lovable.app')) {
      return origin;
    }
    
    // Development local
    return 'http://localhost:8080';
  }
  
  return process.env.BETTER_AUTH_URL || 'http://localhost:8080';
};

export const auth = betterAuth({
  database: {
    provider: "postgresql",
    url: "postgresql://postgres.psaacanfxpqfhrgmvjjn:V7KhB3zWmJ6nVLN8@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
  },
  baseURL: getBetterAuthURL(),
  trustedOrigins: [
    'http://localhost:8080',
    'https://preview--techtrust-digital-forge.lovable.app',
    'https://www.tech-trust.fr',
    'https://lovable.dev'
  ],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false // Pour faciliter les tests
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 jours
    updateAge: 60 * 60 * 24, // Mise à jour quotidienne
  },
  advanced: {
    generateId: () => `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.User;
