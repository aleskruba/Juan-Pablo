"use client"

import { useRouter } from 'next/navigation';
import { fetchActiveUser, fetchUser } from '@/utils';
import React, { useEffect, useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import Link from 'next/link';
import { Switch } from '@headlessui/react';
import moment from 'moment';
import { useLanguageContext } from "@/context/language-context"

interface UserDetailProps {
  id: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  createdAt: string;
}

const UserDetail: React.FC<UserDetailProps> = ({ id }) => {
  const router = useRouter();

  const {enabled, setEnabled} = useLanguageContext()

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetchUser(id);
      const data = await response.json();
      setEnabled(data.user.activeUser);
      setMounted(true);
      setUser(data.user);
      setIsLoading(false);
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (mounted) {
      const updateActiveUser = async () => {
        const values = { id: id, activeUser: enabled };
        const response = await fetchActiveUser(values);
        const data = await response;
        setIsLoading(false);
      };
      updateActiveUser();
    }
  }, [enabled]);

  const openDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };

  const closeDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  const deleteUser = async (userId: string) => {
    try {
      const response = await fetch('/api/user', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: userId }),
      });

      if (response.status === 200) {
        router.push('/admin/dashboard/allusers');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleDeleteConfirmation = () => {
    deleteUser(id);
    closeDeleteConfirmation();
  };

  return (
    <div className=' px-8'>
      {/* Other components and JSX */}
      <div className='flex flex-col justify-center items-center mb-8'>
      <div className='mb-4 bg-blue-500 hover:bg-blue-700 text-white text-xl border px-4 py-2  border-emerald-300 rounded-lg'>
          <Link href={'/admin/dashboard/'} scroll={false}>
            Go back to dashboard
          </Link>
        </div>
 {/*        <div className='mb-4 hover:bg-gray-100 dark:text-black text-xl border px-4 bg-gray-300 border-emerald-300 rounded-lg w-[250px]'>
          <Link href={'/admin/dashboard/allusers'} scroll={false}>
            Go back to users
          </Link>
        </div> */}
      </div>

      {!isLoading ? (
        <>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 dark:bg-gray-800 bg-gray-200 p-4 rounded-md '>
            <div className=''>
              <div className='col-span-2 md:col-span-1'>{user?.email}</div>
              <div className='col-span-2 md:col-span-1'>{user?.name}</div>
              <div className='col-span-2 md:col-span-1'>
                first login: {moment(user?.createdAt).format('DD.MM YYYY HH:mm')}
              </div>
            </div>
            <div className=' flex items-center justify-end md:col-span-3'>
              <img
                src={user?.image ? user?.image : '/avatar.png'}
                alt={`Profile of ${user?.name}`}
                className='rounded-full w-16 h-16 md:w-20 md:h-20'
              />
            </div>
          </div>

          <div className='text-red-800 dark:text-red-300 text-3xl mt-10 flex cursor-pointer justify-between'>
            <div className='flex flex-col'>
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
              <span
                className={`${
                  enabled ? 'text-blue-800' : 'text-gray-100 opacity-50'
                } text-xl`}
              >
                Active User
              </span>
              <span className='text-xs dark:text-gray-200'>
                Only active users can write reviews
              </span>
            </div>

            <FaRegTrashAlt onClick={() => openDeleteConfirmation()} />

            {showDeleteConfirmation && (
              <div className='fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center'>
                <div className='bg-white p-8 rounded-lg'>
                  <h2 className='text-red-700 font-semibold'>
                    Are you sure you want to delete the user?
                  </h2>
                  <div className='flex justify-center gap-8 mt-4 text-2xl'>
                    <button
                      onClick={() => handleDeleteConfirmation()}
                      className='text-red-800 hover:text-red-500 hover:scale-150'
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => closeDeleteConfirmation()}
                      className='text-gray-900 hover:text-gray-500 hover:scale-150'
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div>wait please .... </div>
      )}
    </div>
  );
};

export default UserDetail;
