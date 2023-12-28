"use client"
import React,{useEffect} from 'react'
import { useLanguageContext } from "@/context/language-context"
import getCurrentUser from '@/app/actions/getCurrentUser'
import Link from 'next/link'


function Dashboard() {

    const {currentUser,setCurrentUser,setIsAdminPage} = useLanguageContext()

    useEffect(() => {
      setIsAdminPage(true)
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
<div className='w-full h-full flex flex-col items-center mt-28'>
      
    <div>
        <h1 className='text-normal md:text-2xl text-black dark:text-white font-thin'> WELCOME TO DASHBOARD {currentUser?.email}</h1>       
    </div>

  <div className='w-[240px] mt-10 '>
        <div className='mb-4 hover:text-gray-500 text-xl'>
          <Link href={'/admin/dashboard/allusers'}
              scroll={false}
            >
              All new logged in users
            </Link>
        </div>

        <div className='mb-4 hover:text-gray-500 text-xl'>
          <Link href={'/admin/dashboard/messages'}
              scroll={false}
            >
              All Messages
            </Link>
        </div>

        <div className='mb-4 hover:text-gray-500 text-xl'>
          <Link href={'/admin/dashboard/reviews'}
              scroll={false}
            >
              All Rewievs
            </Link>
        </div>

        <div className='mb-4 mt-10 hover:text-gray-500 text-xl'>
          <Link href={'/'}
              scroll={false}
              onClick={() => setIsAdminPage(false)}
              >
             Go to the webpage  
              
          </Link>
        </div>
    
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