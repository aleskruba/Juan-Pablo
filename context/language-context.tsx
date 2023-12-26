import React, { createContext, useState, useContext, useEffect } from 'react';

type LanguageContextProviderProps = {
    children: React.ReactNode;
};

type Language = string;
type Admin = boolean;


type LanguageContext = {
    selected: Language;
    setSelected: React.Dispatch<React.SetStateAction<Language>>;
    isAdmin: Admin;
    setIsAdmin: React.Dispatch<React.SetStateAction<Admin>>
};




export const LanguageContext = createContext<LanguageContext | null>(null);

export default function LanguageContextProvider({
    children,
}: LanguageContextProviderProps) {
    
    let initialLanguage: Language 

    if (typeof window !== 'undefined') {
        const storedLanguage = localStorage.getItem('selectedLanguage');
        initialLanguage = storedLanguage ? (storedLanguage as Language) : 'Us';
    }

      const [selected, setSelected] = useState<Language>('');
      const [isAdmin,setIsAdmin] = useState<Admin>(false)

    useEffect(() => {

        const storedLanguage = localStorage.getItem('selectedLanguage');
        const initialLanguage: Language = storedLanguage ? (storedLanguage as Language) : 'Us';

        localStorage.setItem('selectedLanguage', initialLanguage);
        setSelected(initialLanguage)

    }, []);

    return (
        <LanguageContext.Provider value={{ selected, setSelected ,isAdmin,setIsAdmin}}>
           {selected.length ? children : null}
        </LanguageContext.Provider>
    );
}

export function useLanguageContext() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error(
            'useLanguageContext must be used within a LanguageContextProvider'
        );
    }
    return context;
}
