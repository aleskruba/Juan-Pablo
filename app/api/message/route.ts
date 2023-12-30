import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';


export async function POST(req: NextRequest) {



    if (req.method === 'POST') {
        
        try {   const data = await req.json();

                const receivedMessage = data.message
                const userEmail = data.user.email

                console.log(receivedMessage,userEmail)

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
                
  
                  const newMessage = await prisma.message.create({
                    data: {
                      body: receivedMessage,
                      sender: {
                        connect: { id: user.id },                       },
              
                    },
                  });
                
                  console.log('New message created:', newMessage);  
                
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
    const message =   await prisma.message.delete({
      where: {
        id: data.id,
      },
    });

     return new Response(JSON.stringify({message:message, status: 200 }));
  } catch (e) 
    { return new Response(JSON.stringify({message: 'Method Not Allowed'  }), { status: 500 }); }
    
}