"use client"

import React, { useEffect, useState,useRef } from 'react'
import getCurrentUser from '@/app/actions/getCurrentUser'
import { fetchUsers } from '@/utils'
import { useLanguageContext } from "@/context/language-context"
import moment from 'moment';
import Link from 'next/link';
import Loading from '@/app/loading';
import { Switch } from '@headlessui/react';


interface User {
  id: string;
  email: string;
  image: string;
  name?: string;
  createdAt: string;
  activeUser:boolean // Assuming createdAt is a string for display purposes
  // Add other properties as per your actual data structure
}

const Allusers = () => {
    
      const {currentUser,setCurrentUser} = useLanguageContext()
      const [displayCount, setDisplayCount] = useState(4); // Initially display 5 users
      const lastUserRef = useRef<HTMLDivElement | null>(null);
      const [allUsers,setAllUsers] = useState<User[]>([])
      const [isLoading,setIsLoading] = useState(true)
      const [search,setSearch] = useState("")
      const [enabled, setEnabled] = useState(false);

      const filterUsers = (searchTerm: string) => {
        return allUsers.filter((item) => {
          const searchTermLowerCase = searchTerm ? searchTerm.toLowerCase() : ''; // Convert searchTerm to lowercase or use an empty string if null
      
          const matchesSearch =
            searchTermLowerCase === '' ||
            item.email?.toLowerCase().includes(searchTermLowerCase) ||
            (item.name && item.name?.toLowerCase().includes(searchTermLowerCase));
      
          if (enabled) {
            // Filter based on activeUser property when enabled is true
            return matchesSearch && item.activeUser;
          } else {
            return matchesSearch;
          }
        });
      };
      

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
      setIsAdminPage(true)
      const fetchFunction = async () => {
          const response = await fetchUsers()
          setAllUsers(response)
          setIsLoading(false)
      }
      fetchFunction()
 
  },[]) 

    const loadMoreUsers = () => {
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
    
    const {setIsAdminPage} = useLanguageContext()



      

    const allUsers1 = [
        {
          email: 'john@example.com',
          name: 'John Doe',
          createdAt: '2023-12-28T08:00:00Z',
          image: 'https://randomuser.me/api/portraits/men/1.jpg',
        },
        {
          email: 'jane@example.com',
          name: 'Jane Smith',
          createdAt: '2023-12-27T10:30:00Z',
          image: 'https://randomuser.me/api/portraits/women/2.jpg',
        },
        {
          email: 'alice@example.com',
          name: 'Alice Johnson',
          createdAt: '2023-12-26T15:45:00Z',
          image: 'https://randomuser.me/api/portraits/women/3.jpg',
        },
        {
          email: 'bob@example.com',
          name: 'Bob Wilson',
          createdAt: '2023-12-25T12:20:00Z',
          image: 'https://randomuser.me/api/portraits/men/4.jpg',
        },
        {
          email: 'emily@example.com',
          name: 'Emily Adams',
          createdAt: '2023-12-24T09:15:00Z',
          image: 'https://randomuser.me/api/portraits/women/5.jpg',
        },
        {
          email: 'sam@example.com',
          name: 'Sam Brown',
          createdAt: '2023-12-23T16:50:00Z',
          image: 'https://randomuser.me/api/portraits/men/6.jpg',
        },
        {
          email: 'lucy@example.com',
          name: 'Lucy White',
          createdAt: '2023-12-22T14:00:00Z',
          image: 'https://randomuser.me/api/portraits/women/7.jpg',
        },
        {
          email: 'michael@example.com',
          name: 'Michael Clark',
          createdAt: '2023-12-21T11:30:00Z',
          image: 'https://randomuser.me/api/portraits/men/8.jpg',
        },
        {
          email: 'olivia@example.com',
          name: 'Olivia Lee',
          createdAt: '2023-12-20T08:45:00Z',
          image: 'https://randomuser.me/api/portraits/women/9.jpg',
        },
        {
          email: 'david@example.com',
          name: 'David Turner',
          createdAt: '2023-12-19T13:25:00Z',
          image: 'https://randomuser.me/api/portraits/men/10.jpg',
        },
        {
          email: 'ava@example.com',
          name: 'Ava Martinez',
          createdAt: '2023-12-18T10:10:00Z',
          image: 'https://randomuser.me/api/portraits/women/11.jpg',
        },
        {
          email: 'charlie@example.com',
          name: 'Charlie Harris',
          createdAt: '2023-12-17T07:20:00Z',
          image: 'https://randomuser.me/api/portraits/men/12.jpg',
        },
        {
          email: 'sophia@example.com',
          name: 'Sophia Carter',
          createdAt: '2023-12-16T14:55:00Z',
          image: 'https://randomuser.me/api/portraits/women/13.jpg',
        },
        {
          email: 'william@example.com',
          name: 'William Anderson',
          createdAt: '2023-12-15T11:40:00Z',
          image: 'https://randomuser.me/api/portraits/men/14.jpg',
        },
        {
          email: 'mia@example.com',
          name: 'Mia Taylor',
          createdAt: '2023-12-14T09:00:00Z',
          image: 'https://randomuser.me/api/portraits/women/15.jpg',
        },
      ];
      
  return (
    <section>

    {currentUser?.admin ?  (
      <div className='w-full h-full flex flex-col items-center mt-28'>
     <div className='mb-4 sticky top-12  z-50 bg-blue-500 hover:bg-blue-700 text-white text-xl border px-4 py-2  border-emerald-300 rounded-lg'>
          <Link href={'/admin/dashboard/'}
              scroll={false}
            >
              Go back to dashboard
            </Link>
        </div>

        {!isLoading ? <>
        <div className='mb-8'>
             <h1>Already {allUsers.length} visitors have logged in</h1>
      </div>

      {/* FILTERS  */}
        <div className='flex gap-3'>
          
          <div className='w-[200px] h-[25px] mb-4'>
                <input
                  placeholder='search by name or email'
                  className='shadow w-full h-8 py-3 px-3 bg-gray-200 rounded-md text-black '
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                />
              </div>
          <div>

          <div className='flex flex-col justify-center items-center'>
           <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    value='Active User'
                    className={`${
                      enabled ? 'bg-blue-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span className='sr-only'>Enable notifications</span>
                    <span
                      className={`${
                        enabled ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </Switch>

                  <div>
                    ACTIVE USERS
                  </div>
                </div>
            </div>
      
      </div>
      
      <div className='flex flex-col gap-4'>
      {filterUsers(search)
              .slice(0, displayCount).map((user, index) => {
        const isLastUser = index === displayCount - 1;
        return (
          <Link href={`/admin/dashboard/allusers/${user.id}`}   key={index}>
          <div
            key={index}
            ref={isLastUser ? lastUserRef : null}
            className={` p-4 border border-gray-300 rounded grid grid-cols-3 gap-4 hover:bg-gray-200 dark:hover:bg-gray-600  ${
              user.activeUser ? 'bg-blue-500 dark:bg-blue-300 dark:text-black' : 'dark:bg-gray-800'
            }`}>
            <div className='col-span-2'>
              <p className='font-bold'>{user.email}</p>
              <p>Name: {user.name}</p>
              <p>Registered: {moment(user.createdAt).format('YYYY:DD:MM HH:mm')}</p>
            </div>
            <div className='col-span-1 flex justify-center items-center'>
              <img src={user.image ? user.image : "/avatar.png"} alt={`Profile of ${user.name}`} className='rounded-full w-14 h-14' />
            </div>
          </div>
        </Link>
        );
      })}
         {displayCount < filterUsers(search).length && (
        <button onClick={loadMoreUsers} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Load More 4 Users
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

export default Allusers