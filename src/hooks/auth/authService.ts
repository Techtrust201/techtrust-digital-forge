
import { auth } from '@/lib/auth';

export const authService = {
  async getSession() {
    const result = await auth.api.getSession({
      headers: new Headers()
    });
    return result;
  },

  async signIn(email: string, password: string) {
    const result = await auth.api.signInEmail({
      body: { email, password }
    });
    return result;
  },

  async signUp(email: string, password: string, name?: string) {
    const result = await auth.api.signUpEmail({
      body: { 
        email, 
        password, 
        name,
        callbackURL: `${window.location.origin}/auth?verified=true`
      }
    });
    return result;
  },

  async signOut() {
    await auth.api.signOut({
      body: {}
    });
  },

  async forgotPassword(email: string) {
    const result = await auth.api.forgetPassword({
      body: { 
        email, 
        redirectTo: `${window.location.origin}/auth?reset=true` 
      }
    });
    return result;
  },

  async resetPassword(password: string, token: string) {
    const result = await auth.api.resetPassword({
      body: { newPassword: password },
      headers: new Headers({
        'Authorization': `Bearer ${token}`
      })
    });
    return result;
  },

  async resendVerification(email: string) {
    const result = await auth.api.sendVerificationEmail({
      body: { 
        email, 
        callbackURL: `${window.location.origin}/auth?verified=true` 
      }
    });
    return result;
  }
};
