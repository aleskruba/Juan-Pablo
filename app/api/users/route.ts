import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextResponse,NextRequest } from 'next/server'

import prisma from "@/app/libs/prismadb"


export async function GET(req: NextRequest  ) {
  
    try {
        const users = await prisma.user.findMany({});
        return new Response(JSON.stringify({ users }), { status: 200 });


}catch(error){
    console.log(error)
}
};

