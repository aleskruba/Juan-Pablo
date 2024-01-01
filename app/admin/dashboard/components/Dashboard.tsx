"use client"
import React,{useEffect, useState} from 'react'
import { useLanguageContext } from "@/context/language-context"
import getCurrentUser from '@/app/actions/getCurrentUser'
import Link from 'next/link'


function Dashboard() {

    const {currentUser,setCurrentUser,setIsAdminPage} = useLanguageContext()

    const [isLoading,setIsLoading] = useState(true)

    useEffect(() => {
      setIsAdminPage(true)
        const fetchCurrentUser = async() => {
          try {
            const currentUser = await getCurrentUser();
            setCurrentUser(currentUser)
            setIsLoading(false)
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
        <div className='mb-4 bg-blue-500 hover:bg-blue-700 text-xl text-white rounded-md text-center px-2 py-2'>
          <Link href={'/admin/dashboard/allusers'}
              scroll={false}
            >
              All new logged in users
            </Link>
        </div>

        <div className='mb-4 bg-blue-500 hover:bg-blue-700 text-xl text-white rounded-md text-center px-2 py-2'>
          <Link href={'/admin/dashboard/messages'}
              scroll={false}
            >
              All Messages
            </Link>
        </div>

        <div className='mb-4 bg-blue-500 hover:bg-blue-700 text-xl  text-white rounded-md text-center px-2 py-2'>
          <Link href={'/admin/dashboard/comments'}
              scroll={false}
            >
              All Comments
            </Link>
        </div>

        <div className='mt-16 mb-4 bg-green-500 hover:bg-green-700 text-xl  text-white rounded-md text-center px-2 py-2'>
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
           {isLoading  ?'Wait pease.... ' : 'YOU ARE NOT AUTHORIZED TO SEE THIS PAGE ||||'} 
    </div>
    )}
    </>
  )
}

export default Dashboard