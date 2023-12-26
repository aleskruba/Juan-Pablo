 "use client"


import React, { useState, useEffect } from 'react'
import AuthSocialButton from './ButtonGoogle'
import {BsGoogle} from 'react-icons/bs'
import toast from 'react-hot-toast'
import { signIn, signOut,useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'


const AuthForm = () => {
    const session = useSession()
    
    const router = useRouter()
    const [isLoading,setIsLoading] = useState(false)



    useEffect(() => {
        const isFirstTimeLogin = localStorage.getItem('firstTimeLogin');
    
        if (session?.status === 'authenticated' && isFirstTimeLogin === null) {
          localStorage.setItem('firstTimeLogin', 'true');
          router.push('/#contact');
        }
      }, [session?.status, router]);


      
    const socialAction = (action:string) => {
        setIsLoading(true)
        signIn(action,{redirect:false})
        .finally(()=>setIsLoading(false))

    }

    const handleSignOut = () => {
        signOut();
        localStorage.removeItem('firstTimeLogin'); // Clear firstTimeLogin flag on logout
      };
 
    if(session && session.data?.user) { 
        return ( <>
            {!isLoading ? 
        <div className="flex gap-4 ml-auto ml-3">
            <div className="text-sky-600 flex">
                <div className="text-3xl">👋</div>{session.data?.user.name && session.data?.user.name.split(' ')[0]}
             
                </div>
            <div>
                <button onClick={handleSignOut}
                        className="text-red-800 dark:text-red-300 font-extralight">
                            Sign Out
                </button>
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