"use client"

import React,{createContext,useState,useContext} from 'react'


type LanguageContextProviderProps = {
    children: React.ReactNode;
}

type Language = 'Us' | 'Cz' | 'Es' ;

type LanguageContext = {
    selected: Language ;
    setSelected: React.Dispatch<React.SetStateAction<Language>>;
}

export const LanguageContext = createContext<LanguageContext | null>(null)

export default function LanguageContextProvider({children}:LanguageContextProviderProps) {
    const [selected, setSelected] = useState<Language>("Us")

  return (
        <LanguageContext.Provider 
            value={{selected,setSelected}}>
                
                {children}

        </LanguageContext.Provider >
  )
}


export function useLanguageContext() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguageContext must be used within a LanguageContextProvider");
    }
    return context;
}