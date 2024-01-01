import React from 'react'
import { useRouter } from 'next/navigation'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast'
import { fetchComments } from '@/utils';
import { useLanguageContext } from "@/context/language-context"

interface Comment {
    id: string;
    body: string;
    createdAt: string;
    sender: {
      email: string;
      image: string;
      name?: string;
    };
  }
  
  interface CommentFormProps {
    comment: Comment | null; // Accepts Comment or null
    isUpdateForm:boolean
    setIsUpdateForm:React.Dispatch<React.SetStateAction<boolean>>
    isLoadingUpdate: boolean 
    setIsLoadingUpdate:React.Dispatch<React.SetStateAction<boolean>>
  }
   const CommentForm: React.FC<CommentFormProps> = ({ comment ,isUpdateForm,setIsUpdateForm,isLoadingUpdate,setIsLoadingUpdate}) => {

    const router = useRouter()


    const {setAllComments} = useLanguageContext()

    const validationSchema = Yup.object().shape({
        updatedComment: Yup.string().required('Message is required'),
      });
    
      async function sendComment(updatedComment: string) {
        try {
            setIsLoadingUpdate(true)
           const response = await fetch('/api/comment', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ updatedComment:updatedComment, id:comment?.id }), // Sending the message in the request body
          });
      
          const data = await response.json();
    
          if (data.message === 'success'){
            toast.success('Comment updated successfully')
            router.refresh()
            router.push('/admin/dashboard/comments')
            setIsLoadingUpdate(false)
           }
    
          else {toast.error('Comment has not been updated successfully')}
          
          return data; 
       
        } catch (error) {
          console.error('Error sending message:', error);
          return { success: false, message: 'Failed to send the message' };
        }
      }
    
      const handleSubmit = async (values: { updatedComment: string } , { resetForm }: FormikHelpers<{ updatedComment: string }>) => {
    
        try {
            await sendComment(values.updatedComment)   
            router.refresh()
            resetForm();
        
            const response = await fetch(`/api/comments`,{cache:'no-store'})
            const data = await response.json()
            setAllComments(data.comments)
            const updatedComments = await fetchComments();
            setAllComments(updatedComments)

        } catch (error) {
          console.error('Error handling form submission:', error);
        }
        };
    
  return (
    <Formik
    initialValues={{
        updatedComment: comment?.body || '', 
    }}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
  >
    {({ handleSubmit }) => (
      <Form onSubmit={handleSubmit} className=" ">
        <div className=''>
          <div className="mb-4 flex justify-center">
            <Field
              as="textarea"
              id="updatedComment"
              name="updatedComment"
              rows="6"
              className="shadow appearance-none border rounded w-[98%] py-2 px-3 dark:bg-gray-800 dark:text-white  text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Leave  a comment here..."
            />
            <ErrorMessage name="comment" component="p" className="text-red-500 text-xs italic" />
          </div>
{!isLoadingUpdate &&
          <div className="flex items-center justify-center gap-10">
            <div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update
            </button>
            </div>
                {isUpdateForm &&
                    <div className='flex justify-end'> 
                    <div className='text-xl  px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-500'
                            onClick={()=>setIsUpdateForm(false)} 
                            >cancel</div>  
                        </div>
                     }

          </div>
    }

        </div>
      </Form>
    )}
  </Formik>
  )
}

export default CommentForm