import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(
  request: Request
) {
    try{
  const body = await request.json();

      const {
        email,
        name,
        password,
        repeatPassword,
       // admin

      } = body;




  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return new NextResponse('Invalid email address or Passwords do not match', {status: 422,  statusText: 'Invalid email address or Passwords do not match'});
    }

    if (!email || !password || !repeatPassword) {
              return new NextResponse('Missing info or wrong passwrod',{status:400,statusText: 'Missing info or wrong passwrod'})
    }

    if (password !== repeatPassword) {
      return new NextResponse('Invalid email address or Passwords do not match', { status: 422 ,statusText: 'Invalid email address or Passwords do not match'});
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return new NextResponse('Email already exists', { status: 409,statusText:'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data: {
          email,
          name,
          hashedPassword,
         // admin
        }
      }); 
    
 

  return NextResponse.json(user);
}

catch(err:any) {
    console.log(err,'REGISTRATION_ERROR');
    return new NextResponse('Internal Error',{status:500});
}

}



export async function PUT(
  request: Request
) {
    try{
  const body = await request.json();

    const {password,repeatPassword,token} = body;

    console.log(body)

    if (password !== repeatPassword) {
      return new NextResponse('Invalid email address or Passwords do not match', { status: 422 ,statusText: 'Invalid email address or Passwords do not match'});
    }
    const hashedNewPassword = await bcrypt.hash(password, 12);
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  
    const updatedUserPassword = await prisma.user.findFirst({
      where: {
        reset_token: hashedToken,
      },
    });

    console.log(updatedUserPassword)
    if (!updatedUserPassword) {
      return new NextResponse('This user does now exist', { status: 400,statusText:'This user does now exist' });
    } 

    const updatedPassword = await prisma.user.update({
      where: {
        id: updatedUserPassword.id, // Replace 'userId' with the actual ID of the user you want to update
      },
      data: {
        hashedPassword: hashedNewPassword,
        reset_token: null,
        reset_token_expiry: null,
      },
    });
    
    return new NextResponse('Password has been updated', { status: 200,statusText:'Password has been updated' });

 
}

catch(err:any) {
    console.log(err,'REGISTRATION_ERROR');
    return new NextResponse('Internal Error',{status:500});
}

}