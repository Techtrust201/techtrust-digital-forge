
"use client";

import { ReactNode } from "react";

interface I18nProviderClientProps {
  locale: string;
  children: ReactNode;
}

export function I18nProviderClient({ locale, children }: I18nProviderClientProps) {
  // Provider d'internationalisation simplifié
  return <div lang={locale}>{children}</div>;
}
