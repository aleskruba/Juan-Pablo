"use client"
import React,{useEffect,useState,useRef} from 'react'
import { useLanguageContext } from "@/context/language-context"
import getCurrentUser from '@/app/actions/getCurrentUser'
import Link from 'next/link'
import { fetchMessages } from '@/utils'
import moment from 'moment';
import Loading from '@/app/loading'

interface Message {
    id: string;
    body: string;
    createdAt: string; 
    sender: {
      email: string;
      image: string;
      name?: string; 
      seenMessageIds:string[];
    };
   }

function Messages() {

    const {currentUser,setCurrentUser,setIsAdminPage} = useLanguageContext()
    const [allMessages,setAllMessages] = useState<Message[]>([])
    const [displayCount, setDisplayCount] = useState(4); // Initially display 5 users
    const lastUserRef = useRef<HTMLDivElement | null>(null);
    const [isLoading,setIsLoading] = useState(true)

    useEffect(() => {
      setIsAdminPage(true)
        const fetchCurrentUser = async() => {
          try {
            const currentUser = await getCurrentUser();
            setCurrentUser(currentUser)
          } catch (error) {
            console.error('Error fetching current user:', error);
          }
        };
    
        fetchCurrentUser();
      }, []);



      useEffect(() => {
         const fetchFunction = async () => {
            const response = await fetchMessages()
            setAllMessages(response)
            setIsLoading(false)

        }
        fetchFunction()
    },[]) 

    const loadMoreMessages = () => {
        setDisplayCount(displayCount + 4); // Increase the displayed count by 5
      };
  
      const scrollToTop = () => {
          window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top of the page
        };
  
      useEffect(() => {
          if (lastUserRef.current) {
            lastUserRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        }, [displayCount]);

        const allMessagesI = [
            {
              id: "1",
              body: "Message 1",
              createdAt: "2023-01-01T08:00:00Z",
              sender: {
                email: "sender1@example.com",
                image: 'https://randomuser.me/api/portraits/women/9.jpg',
                name: "Sender 1",
              },
            },
            {
              id: "2",
              body: "Message 2",
              createdAt: "2023-01-02T10:30:00Z",
              sender: {
                email: "sender2@example.com",
                image: 'https://randomuser.me/api/portraits/women/7.jpg',
                name: "Sender 2",
              },
            },
            {
              id: "3",
              body: "Message 3",
              createdAt: "2023-01-03T12:45:00Z",
              sender: {
                email: "sender3@example.com",
                image: 'https://randomuser.me/api/portraits/men/6.jpg',
                name: "Sender 3",
              },
            },
            {
              id: "4",
              body: "Message 4",
              createdAt: "2023-01-04T14:20:00Z",
              sender: {
                email: "sender4@example.com",
                image: 'https://randomuser.me/api/portraits/women/5.jpg',
                name: "Sender 4",
              },
            },
            {
                id: "5",
                body: "Message 5",
                createdAt: "2023-01-05T09:30:00Z",
                sender: {
                  email: "sender5@example.com",
                  image: 'https://randomuser.me/api/portraits/men/4.jpg',
                  name: "Sender 5",
                },
              },
              {
                id: "6",
                body: "Message 6",
                createdAt: "2023-01-06T11:15:00Z",
                sender: {
                  email: "sender6@example.com",
                  image: 'https://randomuser.me/api/portraits/women/3.jpg',
                  name: "Sender 6",
                },
              },
              {
                id: "7",
                body: "Message 7",
                createdAt: "2023-01-07T13:40:00Z",
                sender: {
                  email: "sender7@example.com",
                  image: 'https://randomuser.me/api/portraits/women/2.jpg',
                  name: "Sender 7",
                },
              },
            {
              id: "15",
              body: "Message 15",
              createdAt: "2023-01-15T18:20:00Z",
              sender: {
                email: "sender15@example.com",
                image: 'https://randomuser.me/api/portraits/men/1.jpg', 
                name: "Sender 15",
              },
            },
          ];
          

          const sortedMessages = allMessages.slice(0).sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });
    

          return (
    <section>

    {currentUser?.admin ? (

    <div className='w-full h-full flex flex-col items-center mt-28'>
      <div  className='sticky top-12  z-50 mb-4 bg-blue-500 hover:bg-blue-700 text-white text-xl border px-4 py-2  border-emerald-300 rounded-lg'>
          <Link href={'/admin/dashboard/'}
              scroll={false}
      
           >
              Go back to dashboard
            </Link>
        </div>
        {!isLoading ? <>

       <div className='flex flex-col  gap-4 md:w-[60%]'>
      {sortedMessages.slice(0, displayCount).map((message, index) => {
  const isLastMessage = index === displayCount - 1;
  return (
<Link href={`/admin/dashboard/messages/${message.id}`}   key={index}>
<div

  ref={isLastMessage ? lastUserRef : null}
  className={`dark:bg-gray-800 mx-2 px-2 pt-2 border border-gray-300 grid grid-cols-2 gap-2 relative hover:bg-gray-200 dark:hover:bg-gray-600 p-4 rounded-md ${
    !message.sender.seenMessageIds.includes(message?.id) ? 'bg-blue-300 dark:bg-green-500 ' : ''
  }`}>
  {/* First Row */}

      <div className='col-span-1 '>
        <p className='font-bold'>{moment(message.createdAt).format('DD.MM YYYY HH:mm')}</p>
        <p>{message.sender.email}</p>
      </div>
      <div className=' w-22 h-20 col-span-2 flex justify-end  pr-6 w-full '>
        <img src={message.sender.image ? message.sender.image : '/avatar.png'} alt={`Profile of ${message.sender.name}`} className='rounded-full w-20 h-20' />
      </div>

  <div className='bg-gray-200'>
   
      </div>
  {!message.sender.seenMessageIds.includes(message?.id) && (
  <div className='absolute bottom-2 right-2'>
    <h1 className='text-red-600 dark:text-red-500 font-bold'>New </h1>
  </div>
  )}

  {/* Second Row */}
  <div className='col-span-3'>
    <p className='font-bold'>    {message.body.length > 150 ? `${message.body.substring(0, 150)}...` : message.body} </p>

  </div>
</div>
</Link>
  
  );
})}

      {displayCount < allMessagesI.length && allMessages.length > 4 && (
        <button onClick={loadMoreMessages} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Load More 4 Messages
        </button>
      )}
      {displayCount > 4 && (
        <button onClick={scrollToTop} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
          Go Up
        </button>
      )}
    </div>


    </>  : <Loading/>}

    </div>

    ):(
        <div className='w-screen h-screen flex items-center justify-center'>
           {isLoading ? 'WAIT PLEASE ... ' : 'YOU ARE NOT AUTHORIZED TO SEE THIS PAGE'} 
    </div>
    )}

    </section>
  )
}

export default Messages