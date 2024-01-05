"use client"
import React,{useEffect, useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSession } from 'next-auth/react'
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const LoginForm = () => {


  const router = useRouter()
  const [isLoading,setIsLoading] = useState(false)
  const {data:session,status:sessionStatus} = useSession()

  useEffect(()=>{
    if (sessionStatus == 'authenticated'){
      router.replace('/')
    }
  },[sessionStatus,router])

  // Set up Formik for form handling and validation
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      admin:true,
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      setIsLoading(true)
    resetForm();


    signIn('credentials',{
        ...values,
        redirect:false
    })
    .then((callback)=>{
  
      
        if (callback?.error) {
            toast.error('wrong email or password')
            setIsLoading(false)
        }
       
        if (callback?.ok && !callback?.error) {
           toast.success('Logged In')
            router.push('/')  
        }
    })
  


    },
  });

  return (
    <div className="w-screen h-screen  flex flex-col items-center justify-center">
            { !isLoading ? <>
      <form className="w-full max-w-md px-10" onSubmit={formik.handleSubmit}>
      <div className='text-center mb-10 text-teal-400 font-thin text-2xl'>Login</div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 ">
            Email
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
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white"
            placeholder="Enter your password"
            autoComplete="current-password"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
          )}
        </div>
       
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>
      </form>
      <Link href='/forgetpasswordemail'
            className='block text-center text-blue-500 hover:underline mt-2'>
        forgot your password? 
      </Link>
      </> : 'wait please ....'}
    </div>
  );
};

export default LoginForm;