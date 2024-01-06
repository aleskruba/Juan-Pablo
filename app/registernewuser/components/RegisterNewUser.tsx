"use client"
import React,{useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react';
import { registerUser } from '@/utils';

type backendError = string | null

const RegisterNewUserForm = () => {

  const router = useRouter()

  const [backendError,setBackendError] = useState<backendError>(null)
  const [isLoading,setIsLoading] = useState(false)


  // Set up Formik for form handling and validation
  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
      repeatPassword: '',
      admin:false
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      name: Yup.string().required('Required'),
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


        const response = await registerUser(values)
        
        // Make asynchronous call using fetch with async/await
 /*        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        }); */

        console.log(response)
    
        if (!response.ok) {
          toast.error('Soemthing went wrong')
      }
     
        if (response.ok) {
          toast.success('Registered successfully')
            router.push('/#contact')  
            signIn('credentials',{
              ...values,
              redirect:false
          })
        }
          
 
        if (!response.ok && (response.status===422 || response.status===400 || response.status===409))  {
          setBackendError(response.statusText)
          throw new Error('Network response was not ok.');
        }

        await response.json();

/*         signIn('credentials',{
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
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
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
            autoComplete="email"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
          )}
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white"
            placeholder="Enter your name"
            autoComplete="name"
          />
                   {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-xs mt-1">Name is required</p>
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
            Register
          </button>
        </div>
      </form>
      </> : 'wait please ....'}
    </div>
  );
};

export default RegisterNewUserForm;
