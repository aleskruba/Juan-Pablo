"use client"

import { useRouter } from 'next/navigation'
import { fetchMessage } from '@/utils';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { FaRegTrashAlt } from "react-icons/fa";
import Link from 'next/link';


interface MessageDetailProps {
  id: string; 
}
interface Message {
    id: string;
    body: string;
    createdAt: string; 
    sender: {
      email: string;
      image: string;
      name?: string; 
    };
   }

const MessageDetail: React.FC<MessageDetailProps> = ({ id }) => {

    const router = useRouter()

    const [message, setMessage] = useState<Message | null>(null);
    const [isloading,setIsLoading] = useState(true)
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    useEffect(() => {
        const fetchFunction = async () => {
           const response = await fetchMessage(id)
           const data = await response.json(); 
            setMessage(data.message)
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
  console.log(id)
  try {
    const response = await fetch('/api/message', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id:id}), // Sending the message in the request body
    });
    
    if (response.status === 200) {
        router.push('/admin/dashboard/messages')
      }
}catch(error) {console.log(error); }

}

  const handleDeleteConfirmation = () => {
    deleteMessageFunction(id);
    closeDeleteConfirmation();
  };
    return (
    <div>
      <div className='flex flex-col justify-center items-center mb-8'>
      <div className='mb-4 bg-blue-500 hover:bg-blue-700 text-white text-xl border px-4 py-2  border-emerald-300 rounded-lg'>
            <Link href={'/admin/dashboard/'}
                scroll={false}
              >
                Go back to dashboard
              </Link>
          </div>
{/*           <div className='mb-4 hover:bg-gray-100 dark:text-black text-xl border px-4 bg-gray-300  border-emerald-300 rounded-lg w-[250px]'>
            <Link href={'/admin/dashboard/messages'}
                scroll={false}
              >
                Go back to messages
              </Link>
          </div> */}
          </div>
        {!isloading ? <> 
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 dark:bg-gray-800 bg-gray-200 p-4 rounded-md'>


      <div className=''>
            <div className='col-span-2 md:col-span-1'>
                {moment(message?.createdAt).format('DD.MM YYYY HH:mm')}
            </div>
            <div className='col-span-2 md:col-span-1'>
                {message?.sender.email}
            </div>
            <div className='col-span-2 md:col-span-1'>
                {message?.sender.name}
            </div>
      </div>     
          <div className=' flex items-center justify-end  md:col-span-3'>
            <img
                src={message?.sender.image}
                alt={`Profile of ${message?.sender.name}`}
                className='rounded-full w-16 h-16 md:w-20 md:h-20'
            />
        </div>
    
 

    <div className='col-span-2 md:col-span-4 border-t-2 border-solid border-blue-700'>
        {message?.body}
    </div>
  </div>
  <div className='text-red-800 dark:text-red-300 text-3xl mt-10 flex justify-end cursor-pointer'>
    <FaRegTrashAlt onClick={() =>openDeleteConfirmation()}/>
   
   
    {showDeleteConfirmation && (



          <div className='fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center'>
            <div className='bg-white p-8 rounded-lg'>
              <h2 className='text-red-700 font-semibold'>Are you sure to delete the message?</h2>
                <div className='flex justify-center gap-8 mt-4 text-2xl'>
                  <button onClick={() => handleDeleteConfirmation()} className='text-red-800 hover:text-red-500 hover:scale-150'>Yes</button>
                  <button onClick={() => closeDeleteConfirmation()} className='text-gray-900 hover:text-gray-500 hover:scale-150'>No</button>
                  </div>
              </div>
            </div>
          )}
  </div>    
        </> : 
        <div>wait please .... </div>
        }    
     
    </div>
  );
};

export default MessageDetail;
