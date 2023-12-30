import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';


export async function POST(req: NextRequest) {


    if (req.method === 'POST') {
        
        try {   const data = await req.json();

            const userData = data.values

              const user = await prisma.user.findUnique({
                where: {
                  id: userData.id,
                },
              });
            
              if (!user) {
                return new Response(JSON.stringify({ user: 'User not found' }), { status: 404 });
              }

              const updatedUser = await prisma.user.update({
                where: {
                  id: userData.id,
                },
                data: {
                    activeUser: userData.activeUser,
                },
              });

              return new Response(JSON.stringify({message: updatedUser}), { status: 200 });

            }catch(error) {
     
            return new Response(JSON.stringify({message: 'Failed to process the message' }), { status: 500 });
         }
        }
        else {
            return new Response(JSON.stringify({message: 'Method Not Allowed'  }), { status: 500 });
            }
 
}