import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(
    request: Request
  ) {
      try{
    const body = await request.json();
  
      const {token} = body;
      console.log(token);  
  
      const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

   
      const currentDateTimeInMilliseconds = new Date().getTime();
  
  
      const wanteduser = await prisma.user.findFirst({
        where: {
          reset_token: hashedToken,
          reset_token_expiry: {
            gt: currentDateTimeInMilliseconds, // Comparing with current date
          },
        },
      });
  
      if (!wanteduser) {
        return new NextResponse('This user does now exist', { status: 400,statusText:'This user does now exist' });
      } 
  
      return new NextResponse(JSON.stringify(wanteduser), { status: 200});
   
  }
  
  catch(err:any) {
      console.log(err,'REGISTRATION_ERROR');
      return new NextResponse('Internal Error',{status:500});
  }
  
  }