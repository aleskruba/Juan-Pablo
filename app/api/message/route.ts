import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react'


export async function POST(req: NextRequest) {



    if (req.method === 'POST') {
        
        try {   const data = await req.json();

                const receivedMessage = data.message
                const userEmail = data.user.email

                console.log(receivedMessage,userEmail)

                if (!data.message || data.message.trim() === '') {
                    // If message is empty or not provided, return a bad request response
                      return new Response(JSON.stringify({ message:'Message required' }), { status: 400 });
                  }
                  
                  const user = await prisma.user.findUnique({
                    where: {
                      email: userEmail,
                    },
                  });
                
                  if (!user) {
                    // If the user does not exist, handle accordingly (return an error, etc.)
                    return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
                  }
                
                  // Create the message associated with the found user
                  const newMessage = await prisma.message.create({
                    data: {
                      body: receivedMessage,
                      sender: {
                        connect: { id: user.id }, // Connect the message to the user by their ID
                      },
                      // Add other properties of the message as needed
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