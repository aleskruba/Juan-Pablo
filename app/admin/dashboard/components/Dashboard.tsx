"use client"
import React,{useEffect} from 'react'
import { useLanguageContext } from "@/context/language-context"
import getCurrentUser from '@/app/actions/getCurrentUser'
import Link from 'next/link'

function Dashboard() {

    const {currentUser,setCurrentUser,setIsAdminPage} = useLanguageContext()

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
    <>
    {currentUser?.admin ? (
    <div className='w-screen h-screen flex flex-col items-center justify-center'>
    
    <div>

        DASHBOARD  , WELCOME {currentUser?.email}
        </div>
        <div>

    <Link href={'/'}
        scroll={false}
        onClick={() => setIsAdminPage(false)}
        >
        Go to webpage
        
    </Link>
    </div>
    </div>
    ):(
        <div className='w-screen h-screen flex items-center justify-center'>
            YOU ARE NOT AUTHORIZED TO SEE THIS PAGE
    </div>
    )}
    </>
  )
}

export default Dashboard