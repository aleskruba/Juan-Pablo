 "use client"


import React, { useState, useEffect } from 'react'
import AuthSocialButton from './AuthSocialButton'
import {BsGoogle} from 'react-icons/bs'
import toast from 'react-hot-toast'
import { signIn, signOut,useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useLanguageContext } from "@/context/language-context"
import Link from 'next/link'

const AuthForm = () => {
    const session = useSession()
    
    const router = useRouter()
    const [isLoading,setIsLoading] = useState(false)

    const {currentUser,setIsAdminPage} = useLanguageContext()

      
    const socialAction = (action:string) => {
        setIsLoading(true)
        signIn(action,{redirect:false})
        .finally(()=>setIsLoading(false))

    }

    const handleSignOut = () => {
        signOut();
        localStorage.removeItem('firstTimeLogin'); // Clear firstTimeLogin flag on logout
        router.push('/')
      };
 
    if(session && session.data?.user) { 
        return ( <>
            {!isLoading ? 
        <div className="flex gap-2 ml-auto ml-3 items-center">
            <div className="text-sky-600 flex text-sm md:text-base">
                <div className="text-sm md:text-base">👋</div>
                

                    {
                    currentUser?.admin ? 'ADMIN' : 
                    session.data?.user.name ? session.data?.user.name.split(' ')[0] : session.data?.user.email}
              
                </div>
               {currentUser?.admin && 
                    <div>
                    <Link href='/admin/dashboard'
                            onClick={() => setIsAdminPage(true)}
                            className="text-blue-800 dark:text-blue-300 font-extralight hover:text-black dark:hover:text-white text-sm md:text-base" >
                                DASHBOARD
                    </Link>
                    </div>}
            <div>
                <div onClick={handleSignOut}
                        className="text-red-800 dark:text-red-300 font-extralight hover:font-normal text-sm ml-5 md:text-base" >
                            Sign Out
                </div>
            </div>
        </div>
     :
        <div>
            wait please
        </div>
    }
    </>
        )
    } 

    return (  
    <div >
                 <AuthSocialButton 
                            icon={BsGoogle}
                            onClick={()=> socialAction('google')}
                     />  
                
             
    </div>
  )
}

export default AuthForm 