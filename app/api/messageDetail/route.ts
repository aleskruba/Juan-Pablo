import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react'
import { ObjectId } from 'mongodb';

export async function PUT(req: NextRequest) {

    if (req.method === 'PUT') {
        
        try {
            const data = await req.json();
            const message = await prisma.message.findUnique({
              where: {
                id: data.id,
              },
              include: {
                sender: true, // Include the sender relation
              },
            });

            const updatedMessage = await prisma.message.update({
              where: {
                id: data.id,
              },
              data: {
                seen: {
                  connect: {
                    id: message?.sender.id, // Connect the user who viewed the message
                  },
                },
              },
              include: {
                sender: true, // Include the sender relation
              },
            });
              
              return new Response(JSON.stringify({ message }), { status: 200 });
                               
              }
            catch(error) {
            console.log(error)
            return new Response(JSON.stringify({message: 'Failed to process the message' }), { status: 500 });
         }
        }
        else {
            return new Response(JSON.stringify({message: 'Method Not Allowed'  }), { status: 500 });
            }
 
}