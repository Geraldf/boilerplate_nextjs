
import { prisma } from "@/lib/prisma"
import { NewUser } from "@/components/users/NewUser"

import { UserList } from "../../components/users/UserList"

export default async function User() {
 
  const users = await prisma.user.findMany()

  return (
    <div className=" flex flex-col   items-center justify-center bg-slate-50 ">
      {/* <div className="flex  flex-col rounded-3xl bg-slate-300 py-6 text-slate-800"> */}
      <h1 className="text-center text-3xl">Users</h1>
      <NewUser />
      <div className="w-full">
        <UserList user={users} />
      </div>
      {/* <ul className="px-6">
          <UserItem users={users} />
        </ul> */}
      {/* </div> */}
    </div>
  )
}
