
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  fetchOptions: {
    credentials: 'include' // Assure l'envoi des cookies
  }
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  forgetPassword,
  resetPassword
} = authClient;
