import getCurrentUser from '@/app/actions/getCurrentUser';
import React, { createContext, useState, useContext, useEffect } from 'react';

type LanguageContextProviderProps = {
    children: React.ReactNode;
};

type Language = string;
type Admin = boolean;

type currentUserProps =  {
    id: string;
    admin: boolean;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    hashedPassword: string | null;
    createdAt: Date;
    updatedAt: Date;
    seenMessageIds: string[];
  } | null 

type LanguageContext = {
    selected: Language;
    setSelected: React.Dispatch<React.SetStateAction<Language>>;
    isAdminPage: Admin;
    setIsAdminPage: React.Dispatch<React.SetStateAction<Admin>>
    currentUser:currentUserProps
    setCurrentUser: React.Dispatch<React.SetStateAction<currentUserProps>>;

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
      const [isAdminPage,setIsAdminPage] = useState<Admin>(false)

      const [currentUser,setCurrentUser] = useState<currentUserProps>(null)

    useEffect(() => {

        const storedLanguage = localStorage.getItem('selectedLanguage');
        const initialLanguage: Language = storedLanguage ? (storedLanguage as Language) : 'Us';

        localStorage.setItem('selectedLanguage', initialLanguage);
        setSelected(initialLanguage)

    }, []);

    
  useEffect(() => {
    const fetchCurrentUser = async() => {
      try {
        const currentUser = await getCurrentUser();
        setCurrentUser(currentUser)
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchCurrentUser();
  }, []);

    return (
        <LanguageContext.Provider value={{ selected, setSelected ,isAdminPage,setIsAdminPage,currentUser,setCurrentUser}}>
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
