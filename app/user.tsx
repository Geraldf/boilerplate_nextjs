"use client";

import { useRouter } from "next/navigation";
import { User } from "@prisma/client"

import { Input } from "@/components/ui/input"





export default function UserComponent({ user }: { user: User }) {
  const router = useRouter()
  const update = async (user: User) => {
    await fetch(`/api/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          name: !user.name,
          email: !user.email,
        id: user.id,
      }),
    })
    router.refresh()
  }

  return (
    <li key={user.id} className="space-x-4">
     <Input type="email" placeholder="Email" value={user.email}  onChange={() => update(user)} />
     <Input type="text" placeholder="Name" value={user.name!} onChange={() => update(user)}  />
    </li>
  )
}