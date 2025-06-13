
"use client";

import { ReactNode } from "react";

interface SessionProviderWrapperProps {
  children: ReactNode;
}

export default function SessionProviderWrapper({ children }: SessionProviderWrapperProps) {
  // Pour l'instant, on retourne juste les enfants
  // L'authentification sera gérée par better-auth
  return <>{children}</>;
}
