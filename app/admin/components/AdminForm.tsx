"use client"
import React,{useEffect} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLanguageContext } from '@/context/language-context';

const AdminForm = () => {
  const { setIsAdmin } = useLanguageContext();

  useEffect(()=>{
    setIsAdmin(true)
  },[])


  // Set up Formik for form handling and validation
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      // Perform registration logic here using form values
      console.log('Form values:', values);
      resetForm();// Set isAdmin to true after successful registration
    },
  });

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      
      <form className="w-full max-w-md" onSubmit={formik.handleSubmit}>
      <div className='text-center mb-10 text-teal-400 font-thin text-2xl'>Login</div>
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
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
    </div>
  );
};

export default AdminForm;