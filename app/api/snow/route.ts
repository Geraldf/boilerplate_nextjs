import { NextResponse } from "next/server";



import { prisma } from "@/lib/prisma";





export async function POST(req: Request) {
  const { name, email } = await req.json()

  await prisma.user.create({
    data: { name, email },
  })

  return NextResponse.json({ message: "Created User" }, { status: 200 })
}


export async function GET(req: Request) {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts")
  const allPostsData = await res.json()
  return {
    props: {
      allPostsData,
    },
    revalidate: 30,
  }

 
}