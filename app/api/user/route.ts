import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';


export async function POST(req: NextRequest) {



    if (req.method === 'POST') {
        
        try {   const data = await req.json();

                 const userID = data.id
       

                 const user = await prisma.user.findUnique({
                    where: {
                      id: userID,
                    },
                  });
                
                  if (!user) {
                    return new Response(JSON.stringify({ user: 'User not found' }), { status: 404 });
                  }
            
                
                  return new Response(JSON.stringify({ user }), { status: 200 });

                  
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
    const user =   await prisma.user.delete({
      where: {
        id: data.id,
      },
    });

     return new Response(JSON.stringify({user:user, status: 200 }));
  } catch (e) 
    { return new Response(JSON.stringify({message: 'Method Not Allowed'  }), { status: 500 }); }
    
}