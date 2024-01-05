"use client"

import { useRouter } from "next/navigation"
import { User } from "@prisma/client"

import { Input } from "@/components/ui/input"

export function UserItem({ users }: { user: User[] }) {
  const router = useRouter()
  const update = async (User: User) => {
    await fetch(`/api/User/${User.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !User.complete,
      }),
    })
    router.refresh()
  }

  const deleteUser = async (User: User) => {
    await fetch(`/api/User/${User.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: User.id,
      }),
    })

    router.refresh()
  }

  return (
    <div>
      {users.map((User) => {
        const id = User.id
        const title = User.title
        const checked = User.complete

        return (
          <li key={id} className="flex px-4">
            <span className="flex flex-1 gap-2">
              <Input
                type="checkbox"
                name="check"
                checked={checked}
                onChange={() => update(User)}
                className="accent-color-shade-1 peer cursor-pointer "
              />
              <label
                htmlFor={id}
                className="peer-checked:text-color-shade-1 h-6 w-[150px] cursor-pointer  peer-checked:line-through xl:text-xl"
              >
                {title}
              </label>
            </span>
            <button
              onClick={() => deleteTodo(User)}
              className="text-color-shade-1  hover:text-base-color mr-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </li>
        )
      })}
    </div>
  )
}
