import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import crypto from "crypto"
const nodemailer = require('nodemailer');
import { Resend } from 'resend';


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

        const resetToken = crypto.randomBytes(20).toString('hex')
        const passwordResetToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest('hex')

         const passwordResetExpires = Date.now() + 3600000;

        existingUser.reset_token = passwordResetToken
        existingUser.reset_token_expiry = passwordResetExpires
        const resultUrl = `https://juan-pablo.vercel.app/forgetpassword/${resetToken}`


        const resend = new Resend('re_LUh8Bhj6_BWywSHFmxUZXw5zsomX16Q3u');

        resend.emails.send({
          from: 'onboarding@resend.dev',
          to: email,
          subject: 'RESET PASSWORD',
          html:  `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <p style="font-size: 16px;">Hi there,</p>
            <p style="font-size: 16px;">We received a request to reset your password associated with this email address (${email}).</p>
            <p style="font-size: 16px;">Please copy and paste the link below into your browser's address bar to reset your password:</p>
            <p style="font-size: 16px; background-color: #f0f0f0; padding: 10px;">
               <b> <a href="${resultUrl}">RESET PASSWORD </a>  </b>
             </p>
            <p style="font-size: 14px; margin-top: 20px;">If you didn't request a password reset, please ignore this email.</p>
          </div>
        `
        });

        await prisma.user.update({
          where: { email: email },
          data: {
            reset_token: existingUser.reset_token,
            reset_token_expiry: existingUser.reset_token_expiry,
          },
        });
    
    /*  let transporter = nodemailer.createTransport({
      host: process.env.EMAILHOST,
      port: process.env.EMAILPORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAILUSER, // your email address
        pass: process.env.EMAILPASSWORD, // your email password
      },
    });
    let mailOptions = {
      from: process.env.EMAILUSER,
      to: email,
      subject: 'RESET PASSWORD',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <p style="font-size: 16px;">Hi there,</p>
          <p style="font-size: 16px;">We received a request to reset your password associated with this email address (${email}).</p>
          <p style="font-size: 16px;">Please copy and paste the link below into your browser's address bar to reset your password:</p>
          <p style="font-size: 16px; background-color: #f0f0f0; padding: 10px;">
             <b> <a href="${resultUrl}">RESET PASSWORD </a>  </b>
           </p>
          <p style="font-size: 14px; margin-top: 20px;">If you didn't request a password reset, please ignore this email.</p>
        </div>
      `,
    }; 
               

    transporter.sendMail(mailOptions, async (error:any) => {
      if (error) {
        console.log(error);
        existingUser.reset_token = null;
        existingUser.reset_token_expiry = null
        await prisma.user.update({
          where: { email: email },
          data: {
            reset_token: null,
            reset_token_expiry: null,
          },
        });  

        const resend = new Resend('re_LUh8Bhj6_BWywSHFmxUZXw5zsomX16Q3u');

        resend.emails.send({
          from: 'onboarding@resend.dev',
          to: 'aleskruba@seznam.cz',
          subject: 'Hello World',
          html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
        });

        // Handle the error here if needed
        return new NextResponse('Email does not exist', { status: 500,statusText:'failed' });
      } else {
        console.log('i am here')
        await prisma.user.update({
          where: { email: email },
          data: {
            reset_token: existingUser.reset_token,
            reset_token_expiry: existingUser.reset_token_expiry,
          },
        });
        return new NextResponse('Email does not exist', { status: 200,statusText:'Email has been sent succesfully' });
      }
    });
 */

    return new NextResponse('Email does not exist', { status: 200,statusText:'Email has been sent succesfully' });

  } else {
    await prisma.user.update({
      where: { email: email },
      data: {
        reset_token: null,
        reset_token_expiry: null,
      },
    });  
    
    console.log('Email does not exist');
    return new NextResponse('Email does not exist', { status: 400,statusText:'Email does not exist' });

  }

}

catch(err:any) {
    console.log(err,'REGISTRATION_ERROR');
    
    return new NextResponse('Email does not exist', { status: 500,statusText:'Server Error' });

}

}
