"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export const NewUser = () => {
  const [newItem, setNewItem] = useState("")
  const [newEmail, setNewEmail] = useState("")

  const router = useRouter()
  const create = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    await fetch(`/api/user`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newItem,
        email: newEmail
      }),
    })

    router.refresh()
    setNewItem("")
  }
  return (
    <div className="mx-8 mb-6 mt-4">
      <form onSubmit={create} className="flex items-center gap-3">
        <input
          type="text"
          name="name"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="New UserName"
          className=" flex-1 rounded-full border border-slate-400  bg-slate-50 px-2 py-1 outline-none placeholder:text-slate-300 focus-within:border-slate-100 focus-within:bg-slate-100"
          required
        />
         <input
          type="text"
          name="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="New UserEmail"
          className=" flex-1 rounded-full border border-slate-400  bg-slate-50 px-2 py-1 outline-none placeholder:text-slate-300 focus-within:border-slate-100 focus-within:bg-slate-100"
          required
        />
        <button
          type="submit"
          className="  rounded-full border border-slate-400 bg-slate-50 p-1 text-base text-slate-400 hover:border-slate-500 hover:text-slate-500 hover:ring-0 hover:ring-slate-100"
        >
          <p className=" text-center">+</p>
        </button>
      </form>
    </div>
  )
}
