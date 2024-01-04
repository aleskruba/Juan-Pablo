import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import crypto from "crypto"

export async function POST(
  request: Request
) {
    try{
  const body = await request.json();
    
  const {email} = body;

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  
  if (existingUser) {
  const {email} = body;
  console.log(`Email ${email} exists`);

        const resetToken = crypto.randomBytes(20).toString('hex')
        const passwordResetToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest('hex')

    const passwordResetExpires = Date.now() + 3600000;

    existingUser.reset_token = passwordResetToken
    existingUser.reset_token_expiry = passwordResetExpires
    const resultUrl = `localhost:3000/forgetpassword/${resetToken}`
    console.log(resultUrl)
  return NextResponse.json({});

// sendgrid rX-Q85hREXJfvWf0000
  } else {
    
    console.log('Email does not exist');
    return new NextResponse('Email does not exist', { status: 400,statusText:'Email does not exist' });

  }

}

catch(err:any) {
    console.log(err,'REGISTRATION_ERROR');

}

}
