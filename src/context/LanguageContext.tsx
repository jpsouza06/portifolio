import { createContext, useState } from 'react'

type Language = {
  language: string;
  updateLanguage: (language : string) => void;
}

export const LanguageContext = createContext<Language | null>(null)

export default function LanguageProvider({children}:any) {
  const [language, setLanguage] = useState('PT-BR');

  const updateLanguage = (language : string) => {
    setLanguage(language)
  }

  return (
    <LanguageContext.Provider value={{language, updateLanguage}}>
      {children}
    </LanguageContext.Provider>
  )
}