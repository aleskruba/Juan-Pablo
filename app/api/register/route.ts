import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

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

    const {password,repeatPassword} = body;

    if (password !== repeatPassword) {
      return new NextResponse('Invalid email address or Passwords do not match', { status: 422 ,statusText: 'Invalid email address or Passwords do not match'});
    }

/*     const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return new NextResponse('Email already exists', { status: 409,statusText:'Email already exists' });
    } */

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data: {
 
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