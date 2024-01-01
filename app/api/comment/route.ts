import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';


export async function POST(req: NextRequest) {

    if (req.method === 'POST') {
        
        try {   const data = await req.json();

                const receivedComment = data.message
                const userEmail = data.user.email

                if (!data.message || data.message.trim() === '') {
                       return new Response(JSON.stringify({ message:'Message required' }), { status: 400 });
                  }
                  
                  const user = await prisma.user.findUnique({
                    where: {
                      email: userEmail,
                    },
                  });
                
                  if (!user) {
                     return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
                  }
                
  
                   const newComment = await prisma.comment.create({
                    data: {
                      body: receivedComment,
                      sender: {
                        connect: { id: user.id },                       },
              
                    },
                  });
                
                  console.log('New message created:', newComment);   
                
               return NextResponse.json({ message: 'success' }, { status: 200 })

                  
            }catch(error) {
            console.log(error)
            return new Response(JSON.stringify({message: 'Failed to process the message' }), { status: 500 });
         }
        }
        else {
            return new Response(JSON.stringify({message: 'Method Not Allowed'  }), { status: 500 });
            }
 
}

export async function PUT(req: NextRequest) {

  if (req.method === 'PUT') {
      
      try {   const data = await req.json();

        console.log(data)
               const commentID = data.id
               const updatedComment = data.updatedComment
                

                    const comment = await prisma.comment.findUnique({
                  where: {
                    id: commentID,
                  },
                });
              
                if (!comment) {
                   return new Response(JSON.stringify({ message: 'Comment not found' }), { status: 404 });
                }
              

                const newComment = await prisma.comment.update({
                  where: {
                    id: commentID,
                  },
                  data: {
                    body: updatedComment, // Update the 'body' field with the new comment content
                  },
                });
          
       
              
             return NextResponse.json({ message: 'success' }, { status: 200 })

                
          }catch(error) {
          console.log(error)
          return new Response(JSON.stringify({message: 'Failed to process the message' }), { status: 500 });
       }
      }
      else {
          return new Response(JSON.stringify({message: 'Method Not Allowed'  }), { status: 500 });
          }

}

export async function DELETE(req: Request) {
  try {
    const data = await req.json();
    const comment =   await prisma.comment.delete({
      where: {
        id: data.id,
      },
    });

     return new Response(JSON.stringify({message:comment, status: 200 }));
  } catch (e) 
    { return new Response(JSON.stringify({message: 'Method Not Allowed'  }), { status: 500 }); }
    
}