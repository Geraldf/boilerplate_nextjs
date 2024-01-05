import { NextResponse } from "next/server";



import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";





export async function PATCH(request: Request, context: { params: { id: string } }) {
    

  const user:User = await request.json()

  await prisma.user.update({
      where: { id: user.id },
      data: {
          ...user
      }
  })

  return NextResponse.json({ message: "update User" }, { status: 200 })
}