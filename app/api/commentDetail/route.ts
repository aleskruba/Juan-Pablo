import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react'
import { ObjectId } from 'mongodb';

export async function POST(req: NextRequest) {

    if (req.method === 'POST') {
        
        try {
            const data = await req.json();
            const comment = await prisma.comment.findUnique({
              where: {
                id: data.id,
              },
              include: {
                sender: true, // Include the sender relation
              },
            });

    
              
              return new Response(JSON.stringify({ comment }), { status: 200 });
                               
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