"use client"
import React,{useEffect} from 'react'
import { useLanguageContext } from '@/context/language-context'

const AdminForm = () => {

  const {setIsAdmin} = useLanguageContext()
 
  useEffect(()=>{
    setIsAdmin(true)
  },[])


  return (
    <div>AdminForm</div>
  )
}

export default AdminForm