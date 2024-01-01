import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

export const revalidate = true

export async function GET(req: NextRequest) {

    try {  

        const comments = await prisma.comment.findMany({
            include: {
                sender: true // Include related sender information
              }

        })

        return new Response(JSON.stringify({ comments }), { status: 200 });
    }
        catch (err) {  
        return new Response(JSON.stringify({message: 'Something went wrong'  }), { status: 500 });
    }

}