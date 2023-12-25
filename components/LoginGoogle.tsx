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



    useEffect(()=>{
        if (session?.status === 'authenticated') {
            console.log('Authenticated')
          
        }
    },[session?.status,router])


    const socialAction = (action:string) => {
        setIsLoading(true)
        signIn(action,{redirect:false})
            .then((callback) => {
    
                if (callback?.error) {
                    toast.error('Invalid credentials')
                }
                if (callback?.ok && !callback?.error) {
                    toast.success('Logged In')
                    router.push('/')
                }
                }) 
           .finally(()=>setIsLoading(false))

    }
 
    if(session && session.data?.user) { 
        return (
        <div className="flex gap-4 ml-auto">
        <p className="text-sky-600">
               Hi {session.data?.user.name && session.data?.user.name.split(' ')[0]}
        </p>
        <button onClick={()=>signOut()}
                        className="text-red-600 font-extralight">
                            Sign Out
                </button>
        </div>
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