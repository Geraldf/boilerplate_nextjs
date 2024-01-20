"use server"

import { Groups, Prisma, PrismaClient } from "@prisma/client"

import { errorType } from "@/components/snow/Intro"

import async from "../snow/page"
import { GroupType, getAllGroups, getOneGroups } from "./SnowRequests"

const prisma = new PrismaClient()

export async function GetGroupsClicked(): Promise<
  Groups | errorType | undefined | unknown
> {
  var recRead = 100
  var offset = 0
  while (recRead > 0) {
    var result = await getAllGroups(100, offset)
    recRead = result.length
    offset = offset + recRead
    await operateGroups(result)
  }

  // try {
  //   var res= await insertGroup({ parent: null, name: "test", sys_id: "sdfssdddfsfsfsfsd" })
  //   return res;
  // } catch (e ) {
  //  return e

  // }
}

const insertGroup = async (dbgroup: GroupType) => {
  try {
    var par = dbgroup.parent == "" ? null : dbgroup.parent.value
    var group: Groups = await prisma.groups.create({
      data: {
        parentId: par,
        name: dbgroup.name,
        sysID: dbgroup.sys_id,
      },
    })
    console.log("added " + group.name)
    return group
  } catch (e) {
    if (e.code == "P2003") {
      const missing_parent = dbgroup.parent.value
      var g = await getOneGroups(missing_parent)
      if ("hasError" in g) {
        return g
      } else if (g) {
        const g1 = await insertGroup(g.result)
        const g2 = await insertGroup(dbgroup)
      }
    } else if (e instanceof Prisma.PrismaClientKnownRequestError) {
      var err: errorType = {
        hasError: true,
        code: e.code,
        name: e.name,
        msg: e.message,
        errorRecord: dbgroup,
      }
      return err
    }
  }
}

const getGroup = (sys_id: string) => {
  var promise: Promise<Groups> = new Promise(function (resolve, reject) {
    try {
      prisma.groups
        .findUnique({
          where: {
            sysID: sys_id,
          },
        })
        .then((data: Groups | null) => {
          resolve(data)
        })
    } catch (error) {
      reject(error)
    }
  })
  return promise
}

async function operateGroups(groups: Groups[]) {
  for (let index = 0; index < groups.length; index++) {
    const dbgroup: GroupType = groups[index]
    const g: Groups | errorType | undefined | unknown = await insertGroup(
      dbgroup
    )
  }
}
