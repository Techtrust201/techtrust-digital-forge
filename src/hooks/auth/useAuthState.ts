
import { useState } from 'react';
import { AuthState } from './types';

export const useAuthState = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
    isAuthenticated: false
  });

  return { authState, setAuthState };
};
