import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const { name, email } = await req.json()

  await prisma.user.create({
    data: { name, email },
  })

  return NextResponse.json({ message: "Created User" }, { status: 200 })
}

export async function UPDATE(req: Request) {
  const { name, emai, id } = await req.json()

  await prisma.user.update({
    data: { name },
    where: { id: id },
  })

  return NextResponse.json({ message: "update User" }, { status: 200 })
}
