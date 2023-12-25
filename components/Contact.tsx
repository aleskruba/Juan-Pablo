"use client"
import React,{useEffect, useRef} from 'react'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import {motion, useAnimation, useInView } from  'framer-motion'
import { AiOutlineFacebook, AiOutlineInstagram } from 'react-icons/ai';
import { useLanguageContext } from "@/context/language-context"
import { useSession } from 'next-auth/react'
import AuthForm from './LoginGoogle';

const validationSchema = Yup.object().shape({
    message: Yup.string().required('Message is required'),
  });

type resetFormTypes = () => void

const Contact = () => {


  const {selected} = useLanguageContext()
  const session = useSession()

  const ref = useRef(null)
  const isInView = useInView(ref, {once:true})
  const mainControls =  useAnimation()

  useEffect(()=>{
    if (isInView) {
    mainControls.start("visible")
    }
    },[isInView])

    const formVariants = {
      hidden: { x: '-100%' },
      visible: { x: '0%' },
    };

    const handleSubmit = (values: { message: string }, { resetForm }: FormikHelpers<{ message: string }>) => {
        // Handle form submission here
        resetForm(); // Reset the form after submission
      };

  return (
    <section id="contact">
            <div className="my-12 pb-12 md:pt-16 md:pb-20 flex items-center flex-col">
            <h1 className="text-center font-bold text-4xl">   {selected  === 'Us' && 'Contact Me'}{selected  === 'Es' && 'Contáctame'}{selected  === 'Cz' && 'Napište mě'} </h1>

            <div className='flex text-center w-full h-full flex-col md:flex-row items-center justify-center md:items-center'>
               {session && session.data?.user ? 
              
                  <div className='mt-2 text-xl '>
                   Hi {session.data?.user?.name} , feel free to ask me anything
                 </div>
              :
              <> 
               
       
                <motion.div
                    className='mr-6 mt-2 text-xl '
                    initial={{ x: 0 }} // Initial position
                    animate={{
                      x: [0, -20, 20, -20, 20, 0], // An array of keyframes for x-axis movement
                      transition: { duration: 2.1 } // Duration for each keyframe
                    }}
                    transition={{ duration: 3, repeat: Infinity }} // Total duration for the animation
                  >
                         
                    {selected  === 'Us' && 'To send a message , please log in with '}{selected  === 'Es' && 'Para enviar un mensaje, inicie sesión con '}{selected  === 'Cz' && 'Chcete-li odeslat zprávu, přihlaste se s'} 

                      
                     <span className="font-semibold text-teal-600"> Google  </span>  
                     
                     <div className='w-full flex justify-center mt-2'>
                      <div className='w-[140px] text-base inset-0 text-center'><AuthForm/></div>   
                      </div>
                </motion.div>
           </> }

            </div>


            <div className='mt-4 flex flex-col md:flex-row justify-center items-center'>
            
            {selected  === 'Us' && 'Or you can contacting me through '}
            {selected  === 'Es' && 'O puedes contactarme a través de '}
            {selected  === 'Cz' && 'Nebo mě můžete kontaktovat přes '}
      

            <div className='flex items-center'>
            <div className='flex  ml-2 mr-2 items-center '>
                <span className="font-semibold text-teal-600"> Facebook        </span> 
                
                <a href="#" 
                rel="noreferrer" 
                target="_blank"
                >
                <AiOutlineFacebook
                  className="hover:-translate-y-1 transition-transform cursor-pointer text-neutral-500 dark:text-neutral-100 "
                  size={40}
                  color="#1877F2"
                />
              </a>
          </div>
            
            or 
            <div className='flex ml-2 items-center'>
            <span className="font-semibold text-teal-600"> Instagram      </span> 

            <a
            href="#"
            rel="noreferrer"
            target="_blank"
            >
           <div  className="hover:-translate-y-1 transition-transform cursor-pointer text-neutral-500 dark:text-neutral-100">
            <AiOutlineInstagram
              size={40}
              color="#E4405F"
            />
          </div> 
          </a>
          </div>
          </div>
      
            </div>
                
            <motion.div
              ref={ref}
              variants={formVariants}
              initial="hidden"
              animate={mainControls}
              transition={{ type: 'spring', duration: 1.5 }}
              className="min-w-[100%] mt-4"
              >
      <Formik
        initialValues={{
          message: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} className=" bg-white min-w-full shadow-md rounded px-2 pt-6 pb-8 mb-4">
            <div className={session.data?.user?.name ?'' :'opacity-50 pointer-events-none'}>
              <div className="mb-4">
                <Field
                  as="textarea"
                  id="message"
                  name="message"
                  rows="6"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your message..."
                />
                <ErrorMessage name="message" component="p" className="text-red-500 text-xs italic" />
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </motion.div>



    </div>
    </section>
  )
}

export default Contact