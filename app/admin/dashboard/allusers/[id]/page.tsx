import React from 'react';
import UserDetail from './UserDetail';


interface userDetailsProps {
  params: {
    id: string; 
  };
}

const MessageDetails: React.FC<userDetailsProps> = ({ params }) => {
  const { id } = params;

  

  return (
    <div className='flex w-screen h-screen justify-center mt-28'>
      <UserDetail id={id} />
    </div>
  );
};

export default MessageDetails;
