"use client"
import React,{useEffect,useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react';

type backendError = string | null

const ForgetPasswordForm= () => {

  const router = useRouter()
  const {data:session,status:sessionStatus} = useSession()
  const [backendError,setBackendError] = useState<backendError>(null)
  const [isLoading,setIsLoading] = useState(false)

    console.log(session)
    console.log(sessionStatus)

    useEffect(()=>{
        if (sessionStatus == 'authenticated'){
          router.replace('/')
        }
      },[sessionStatus,router])
 

  // Set up Formik for form handling and validation
  const formik = useFormik({
    initialValues: {
      password: '',
      repeatPassword: '',
      },
    validationSchema: Yup.object({
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
       repeatPassword: Yup.string()
        .oneOf([Yup.ref('password'), ''], 'Passwords must match')
        .required('Required'), 
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true)
      setBackendError(null)
      try {
        // Perform registration logic here using form values
        console.log('Form values:', values);
        
        // Make asynchronous call using fetch with async/await
        const response = await fetch('/api/register', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        console.log(response)
    
        if (!response.ok) {
          toast.error('Soemthing went wrong')
      }
     
        if (response.ok) {
          toast.success('Password changed successfully')
            router.push('/login')  
        }
          
 
        if (!response.ok && (response.status===422 || response.status===400 || response.status===409))  {
          setBackendError(response.statusText)
          throw new Error('Network response was not ok.');
        }

        await response.json();
/* 
        signIn('credentials',{
            ...values,
            redirect:false
        }) */
     
        // Reset the form if needed
        resetForm();

        // Set isAdmin to true after successful registration if needed
      } catch (error) {
        // Handle error scenarios here if the API call fails
        console.error('Error occurred:', error);
      }
    },
  });

  return (
    <div className="w-full h-screen mt-18 mb-16 flex items-center justify-center">
           { !isLoading ? <>
      <form className="w-full max-w-md px-10" onSubmit={formik.handleSubmit}>
      <div className='text-center mb-10 text-teal-400 font-thin text-2xl'>Register a new user</div>
   
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            New Password
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
            autoComplete="new-password"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
          )}
            {backendError && <p className="text-red-500 text-xs mt-1">Server Error: {backendError}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="repeatPassword" className="block text-gray-700 text-sm font-bold mb-2">
            Repeat Password
          </label>
          <input
            id="repeatPassword"
            name="repeatPassword"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.repeatPassword}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200  leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Repeat your password"
            autoComplete="new-password"
          />
          {formik.touched.repeatPassword && formik.errors.repeatPassword && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.repeatPassword}</p>
          )}
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Change Password
          </button>
        </div>
      </form>
      </> : 'wait please ....'}
    </div>
  );
};

export default ForgetPasswordForm;
