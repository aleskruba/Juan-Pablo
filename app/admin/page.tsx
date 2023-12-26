"use client"

import React, { useEffect } from 'react'
import { useLanguageContext } from "@/context/language-context"
import AdminForm from './components/AdminForm'

function page() {

  const {setIsAdmin} = useLanguageContext()
 
  useEffect(()=>{
    setIsAdmin(true)
  },[])

  return (
    <div className='w-screen h-screen flex items-center justify-center'>

      <AdminForm/>
    </div>
  )
}

export default page