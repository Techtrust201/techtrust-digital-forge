
"use client"

import React, { createContext, useContext } from 'react'

interface I18nContextType {
  locale: string
}

const I18nContext = createContext<I18nContextType>({ locale: 'fr' })

export function I18nProviderClient({ 
  locale, 
  children 
}: { 
  locale: string
  children: React.ReactNode 
}) {
  return (
    <I18nContext.Provider value={{ locale }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}
