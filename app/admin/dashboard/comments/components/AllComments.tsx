"use client"
import React,{useEffect,useState,useRef} from 'react'
import { useLanguageContext } from "@/context/language-context"
import getCurrentUser from '@/app/actions/getCurrentUser'
import Link from 'next/link'
import { fetchComments } from '@/utils'
import moment from 'moment';
import Loading from '@/app/loading'
import { useRouter } from 'next/navigation'

interface Comment {
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

function AllComments() {

    const {currentUser,setCurrentUser,setIsAdminPage} = useLanguageContext()
    const [allComments,setAllComments] = useState<Comment[]>([])
    const [displayCount, setDisplayCount] = useState(4); // Initially display 5 users
    const lastUserRef = useRef<HTMLDivElement | null>(null);
    const [isLoading,setIsLoading] = useState(true)
    const timestamp = Date.now(); // Generate a unique timestamp

    const router = useRouter()

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

      const url = `/api/comments`

      useEffect(() => {
         const fetchFunction = async () => {
           // const response = await fetchComments()

            const response = await fetch(url,{ next: { revalidate: 0 } })
            const data = await response.json()
            setAllComments(data.comments)
            setIsLoading(false)
            router.refresh()
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

        

          const sortedComments = allComments.slice(0).sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });
          
          const totalSeenMessageIds = allComments[0]?.sender.seenMessageIds.length;

          return (
    <section>

    {currentUser?.admin ? (

    <div className='w-full h-full flex flex-col items-center mt-28'>
     <div className='sticky top-12  z-50 mb-4 bg-blue-500 hover:bg-blue-700 text-white text-xl border px-4 py-2  border-emerald-300 rounded-lg'>
          <Link href={'/admin/dashboard/'}
              scroll={false}
            >
              Go back to dashboard
            </Link>
        </div>
        {!isLoading ? <>

        <div className='mb-8'>
             <h1>You have received  {allComments.length} comments </h1>
      </div>
      <div className='flex flex-col  gap-4 md:w-[60%]'>
      {sortedComments.slice(0, displayCount).map((comment, index) => {
  const isLastMessage = index === displayCount - 1;
  return (
<Link href={`/admin/dashboard/comments/${comment.id}`}   key={index}>

<div  ref={isLastMessage ? lastUserRef : null}
      className={`  dark:bg-gray-800 mx-2 px-2 pt-6 sm:pt-6 md:pt-2 border border-gray-300 grid  gap-4 relative hover:bg-gray-200 dark:hover:bg-gray-600  rounded-md `}>
  {/* First Row */}
      <div className='flex w-full gap-6'>
        <div>
           <p className='font-bold '>{moment(comment.createdAt).format('DD.MM YYYY HH:mm')}</p>
        </div>
        <div>
           <img src={comment.sender.image ? comment.sender.image : '/avatar.png'} alt={`Profile of ${comment.sender.name}`} className='rounded-full w-10 h-10' />
        </div>
       <div> 
        <p className=''>{comment.sender.email}</p>
        </div>
      </div>

      <div className='col-span-2'>
        <p className='font-bold'>{comment.body}</p>
      </div>
      <div className='absolute top-0 right-2'>
    <h1 className='text-red-600 dark:text-red-500  font-thin'>you can upadate or delete this message </h1>
  </div>
    </div>
</Link>
  
  );
})}

      {displayCount < allComments.length && allComments.length > 4 && (
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

export default AllComments