import { fetchComments } from '@/utils'
import React, { useEffect, useState,useRef}  from 'react'
import moment from 'moment';

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

  interface CommentsArrayProps {
    allComments: User[];
  }

const CommentsArray: React.FC<CommentsArrayProps> = ({ allComments }) => {


    const [displayCount, setDisplayCount] = useState(4); // Initially display 5 users
    const lastUserRef = useRef<HTMLDivElement | null>(null);


    const loadMoreUsers = () => {
        setDisplayCount(displayCount + 4); // Increase the displayed count by 5
      };
  
   /*    const scrollToTop = () => {
          window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top of the page
        }; */
  
      useEffect(() => {
          if (lastUserRef.current) {
            lastUserRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        }, [displayCount]);

        const sortedComments = allComments.slice(0).sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });
          

  return (
    <div>
        {sortedComments.slice(0, displayCount).map((comment)=>(

        <div key={comment.id} className='flex pt-2 border-t border-solid border-gray-400'>
           <div className='flex flex-col gap 2 w-[150px] pl-6'>
            <div key={comment.id}>
                    <img
                        src={comment?.sender.image ?  comment?.sender.image : 'avatar.png'}
                        alt={`Profile of ${comment?.sender.name}`}
                        className='rounded-full w-16 h-16 md:w-10 md:h-10'
                    />
            </div>
            <div className='font-bold'>
                {comment?.sender.name?.split(' ')[0]}
            </div>
            <div className='italic '>
            {moment(comment?.createdAt).format('DD.MM YYYY HH:mm')}
            </div>

        </div>

        <div className='pl-2'>
            {comment.body}
   
        </div>
        </div>
   ))}
    <div className='flex justify-center'>
         {displayCount < allComments.length && (
        <button onClick={loadMoreUsers} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Load More 4 Comments
        </button>
      )}
</div>
   </div>
  )
}

export default CommentsArray