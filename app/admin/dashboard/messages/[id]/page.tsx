import React from 'react';
import MessageDetail from './MessageDetail';

interface MessageDetailsProps {
  params: {
    id: string; 
  };
}

const MessageDetails: React.FC<MessageDetailsProps> = ({ params }) => {
  const { id } = params;

  

  return (
    <div className='flex w-full h-full justify-center mt-28'>
      <MessageDetail id={id} />
    </div>
  );
};

export default MessageDetails;
