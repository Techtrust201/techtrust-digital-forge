
import { betterAuth } from "better-auth";

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
  
  // Fallback pour SSR
  return 'http://localhost:8080';
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
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      console.log('Reset password email for:', user.email, 'URL:', url);
      // Ici vous pourrez intégrer votre service d'email plus tard
    },
    sendVerificationEmail: async ({ user, url }) => {
      console.log('Verification email for:', user.email, 'URL:', url);
      // Ici vous pourrez intégrer votre service d'email plus tard
    }
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
    updateAge: 60 * 60 * 24, // Mise à jour quotidienne
  },
  advanced: {
    generateId: () => `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
});

export type Session = typeof auth.$Infer.Session.session;
export type User = typeof auth.$Infer.Session.user;
