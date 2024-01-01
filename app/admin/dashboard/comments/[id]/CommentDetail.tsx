"use client"

import { useRouter } from 'next/navigation'
import { fetchComment } from '@/utils';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { FaRegTrashAlt } from "react-icons/fa";
import Link from 'next/link';
import CommentForm from './CommentForm';


interface CommentDetailProps {
  id: string; 
}
interface Comment {
    id: string;
    body: string ;
    createdAt: string; 
    sender: {
      email: string;
      image: string;
      name?: string; 
    };
   }

const MessageDetail: React.FC<CommentDetailProps> = ({ id }) => {

    const router = useRouter()

    const [comment, setComment] = useState<Comment | null>(null)
    const [isloading,setIsLoading] = useState(true)
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [isLoadingDelete,setIsLoadingDelete] = useState (false)
    const [isUpdateForm,setIsUpdateForm] = useState(false)
    const [isLoadingUpdate,setIsLoadingUpdate] = useState(false)
  
    useEffect(() => {
        const fetchFunction = async () => {
           const response = await fetchComment(id)
           const data = await response.json(); 
            setComment(data.comment)
            setIsLoading(false)
    
       }
       fetchFunction()
    },[])

    

    const openDeleteConfirmation = () => {
      setShowDeleteConfirmation(true);
    };
  
    const closeDeleteConfirmation = () => {
      setShowDeleteConfirmation(false);
    };

const deleteMessageFunction = async (id: string)  => {
    setIsLoadingDelete(true)
  try {
    const response = await fetch('/api/comment', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id:id}), // Sending the message in the request body
    });
    if (response.status === 200) {
         router.push('/admin/dashboard/comments')
         setIsLoadingDelete(false)
        }
}catch(error) {console.log(error); }

}

  const handleDeleteConfirmation = () => {
    deleteMessageFunction(id);
    closeDeleteConfirmation();
  };
    return (
    <div className='w-[80%] '>
      <div className='flex flex-col justify-center items-center mb-8 '>
      <div className='mb-4 bg-blue-500 hover:bg-blue-700 text-white text-xl border px-4 py-2  border-emerald-300 rounded-lg'>
           
      {!isLoadingUpdate && 
            <Link href={'/admin/dashboard/'}
                scroll={false}
              >
                Go back to dashboard
              </Link>
}
      </div>
      

          </div>
        {!isloading ? <> 

          {isUpdateForm && comment ? ( <CommentForm comment={comment} 
                                                    isUpdateForm={isUpdateForm} 
                                                    setIsUpdateForm={setIsUpdateForm}
                                                    isLoadingUpdate={isLoadingUpdate}
                                                    setIsLoadingUpdate={setIsLoadingUpdate}
                                                    
                                                    /> ) : 
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 dark:bg-gray-800 bg-gray-200 p-4 rounded-md'>


      <div className=''>
            <div className='col-span-2 md:col-span-1'>
                {moment(comment?.createdAt).format('DD.MM YYYY HH:mm')}
            </div>
            <div className='col-span-2 md:col-span-1'>
                {comment?.sender.email}
            </div>
            <div className='col-span-2 md:col-span-1'>
                {comment?.sender.name}
            </div>
      </div>     
          <div className=' flex items-center justify-end  md:col-span-3'>
            <img
                src={comment?.sender.image ? comment?.sender.image : '/avatar.png'}
                alt={`Profile of ${comment?.sender.name}`}
                className='rounded-full w-16 h-16 md:w-20 md:h-20'
            />
        </div>
    
 

    <div className='col-span-2 md:col-span-4 border-t-2 border-solid border-blue-700'>
        {comment?.body}
    </div>
  </div>


        }

{!isUpdateForm ? <>
  <div className='mt-10 flex justify-between cursor-pointer'>
    <div className='text-red-800 dark:text-red-300 text-3xl dark:hover:text-red-500 hover:text-red-500'>
  {!isLoadingDelete  ? 
    <FaRegTrashAlt onClick={() =>openDeleteConfirmation()}/> : 'wait please ....'
        }
   </div>

   <div onClick={()=>setIsUpdateForm(true)} className='text-blue-800 dark:text-blue-300 dark:hover:text-blue-500  text-x  hover:text-blue-500'>
    UPDATE COMMENT
   </div>
    {showDeleteConfirmation && (



          <div className='fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center'>
            <div className='bg-white p-8 rounded-lg'>
              <h2 className='text-red-700 font-semibold text-center'>Are you sure to delete the comment?</h2>
                <div className='flex justify-center gap-8 mt-4 text-2xl'>
                  <button onClick={() => handleDeleteConfirmation()} className='text-red-800 hover:text-red-500 hover:scale-150'>Yes</button>
                  <button onClick={() => closeDeleteConfirmation()} className='text-gray-900 hover:text-gray-500 hover:scale-150'>No</button>
                  </div>
              </div>
            </div>
          )}
  </div>   

   </>:null} 


        </> : 
        <div className='flex flex-col justify-center items-center mb-8 '>
            <div>wait please .... </div>
        </div>
        }    
     
    </div>
  );
};

export default MessageDetail;
