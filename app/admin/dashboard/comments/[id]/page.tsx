import React from 'react';
import CommentDetail from './CommentDetail';

interface CommentDetailsProps {
  params: {
    id: string; 
  };
}

const MessageDetails: React.FC<CommentDetailsProps> = ({ params }) => {
  const { id } = params;

  

  return (
    <div className='flex w-screen h-full justify-center mt-28'>

    <CommentDetail id={id}/>
    </div>
  );
};

export default MessageDetails;
