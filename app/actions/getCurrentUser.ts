"use server"
import prisma from "@/app/libs/prismadb";
import { getServerSession } from "next-auth";

const getCurrentUser = async () => {
  try {
    const session = await getServerSession();



    const currentUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string
      }
    });

    
    if (!currentUser) {
        return null;
    }

    return currentUser;
  } catch (error: any) {
    return null;
  }
};

export default getCurrentUser;