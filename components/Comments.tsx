"use client"

import React,{useState,useEffect} from 'react'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useLanguageContext } from "@/context/language-context"
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import CommentsArray from './CommentsArray';
import { fetchComments } from '@/utils';

interface User {
  id: string;
  body: string;
  createdAt: string; 
  sender: {
    email: string;
    image: string;
    name?: string; 
  };
}


const Comments = () => {
  const session = useSession()
  const {selected,currentUser} = useLanguageContext()
  const [allComments, setAllComments] = useState<User[]>([]);


useEffect(() => {
   const fetchFunction = async () => {
     const response =   await fetchComments()
     setAllComments(response)
  }
  fetchFunction()
},[]) 

  const validationSchema = Yup.object().shape({
    message: Yup.string().required('Message is required'),
  });

  async function sendMessage(message: string) {
    try {
       const response = await fetch('/api/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message:message, user:session.data?.user }), // Sending the message in the request body
      });
  
      const data = await response.json();

      if (data.message === 'success'){
        toast.success('Message sent successfully')
       }

      else {toast.error('Message was has not been sent successfully')}
      
      return data; 
   
    } catch (error) {
      console.error('Error sending message:', error);
      return { success: false, message: 'Failed to send the message' };
    }
  }

  const handleSubmit = async (values: { message: string }, { resetForm }: FormikHelpers<{ message: string }>) => {

    const newComment: User = {
      id: 'unique_id', // Provide a unique ID for the new comment
      body: values.message,
      createdAt: new Date().toString(), // Convert date to string
      sender: {
        email: 'example@example.com', // Replace with the actual email
        image: session.data?.user?.image || '', // Use the image if available
        name: session.data?.user?.name || '', // Use the name if available
      },
    };
    try {


      setAllComments([...allComments, newComment]);
      

      await sendMessage(values.message);
      resetForm(); // Reset the form after submission
     // const updatedComments = await fetchComments();
      //setAllComments(updatedComments);
    } catch (error) {
      console.error('Error handling form submission:', error);
    }
    };

  return ( 
    <section id="comments">
          {currentUser?.activeUser && 
         <div className="w-full bg-slate-300 dark:bg-gray-800 my-12 pb-12 md:pt-8 md:pb-10 flex items-center flex-col border-t border-solid border-gray-400 ">
            <h1 className="text-center pb-6 pt-12 md:pt-6 font-bold text-4xl">   {selected  === 'Us' && 'Leave a comment'}{selected  === 'Es' && 'Deja un comentario'}{selected  === 'Cz' && 'Napište komentář'} </h1>

                

           <div className='w-full'>
          <Formik
                initialValues={{
                  message: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                
              >
                {({ handleSubmit }) => (
                  <Form onSubmit={handleSubmit} className=" ">
                    <div className={session.data?.user?.name ?'' :'opacity-50 pointer-events-none '}>
                      <div className="mb-4 flex justify-center">
                        <Field
                          as="textarea"
                          id="message"
                          name="message"
                          rows="6"
                          className="shadow appearance-none border rounded w-[98%] py-2 px-3  text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Leave  a comment here..."
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
              </div>
           


        </div>
        }
           <div className='text-center italic mb-2'> {selected  === 'Us' && 'Only active users can give comments'}
                  {selected  === 'Es' && 'Sólo los usuarios activos pueden dar comentarios'}
                  {selected  === 'Cz' && 'Pouze aktivní uživatelé mohou psát komentáře'} 
            </div>
        <CommentsArray allComments={allComments} />
    </section>
  )
}

export default Comments