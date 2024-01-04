"use client"
import React,{useEffect, useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSession } from 'next-auth/react'
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const ForgetPasswordEmail = () => {


  const router = useRouter()
  const [isLoading,setIsLoading] = useState(false)
  const {data:session,status:sessionStatus} = useSession()
  const [backendError,setBackendError] = useState('')

  useEffect(()=>{
    if (sessionStatus == 'authenticated'){
      router.replace('/')
    }
  },[sessionStatus,router])

  // Set up Formik for form handling and validation
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: async (values, { resetForm }) => {
        setBackendError('')
      setIsLoading(true)
    resetForm();
    try {
        const response = await fetch('/api/sendemail', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });
    
        console.log(response);

        if (!response.ok) {
            toast.error('Email not found')
            setBackendError('Email not found')
            setIsLoading(false)
        }
    
        if (response.ok) {
            toast.success('Email send successfully')
           // router.push('/')  
        }

    }catch (error) {
        console.log(error)
        toast.success('Something went wrong')
        }
    }
  });

  return (
    <div className="w-screen h-screen  flex flex-col items-center justify-center">
            { !isLoading ? <>
      <form className="w-full max-w-md px-10" onSubmit={formik.handleSubmit}>
      <div className='text-center mb-10 text-teal-400 font-thin text-xl md:text-2xl'>we will send you a link to reset password</div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 ">
            Enter your mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white"
            placeholder="Enter your email"
            autoComplete="username"
            
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
          )}
          {backendError && <p className="text-red-500 text-xs mt-2">{backendError}</p>}
        </div>
      
        <div className="mb-4 flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
           Submit
          </button>
        </div>
      </form>
      <Link href='/login'
            className='block text-center text-blue-500 hover:underline mt-2'>
        login page  
      </Link>
      </> : 'wait please ....'}
    </div>
  );
};

export default ForgetPasswordEmail;