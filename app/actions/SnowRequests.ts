





// export  function getUserRole(numberOfRecords: number = 10, Offeset: number = 0) {
//   const url: String = process.env.NEXT_PUBLIC_SN_URL!

//   const recordsToRead: Number = 10
//   const FieldToRead: String = "role,user"
//   const query: String = `?sysparm_fields=${FieldToRead}&sysparm_limit=${numberOfRecords}&sysparm_offset=${Offeset}`

//   let response =  fetch(url + "sys_user_has_role" + query, {
//     method: "GET",
//     headers: {
//       Authorization:
//         "Basic " +
//         btoa(
//           process.env.NEXT_PUBLIC_SN_USER + ":" + process.env.NEXT_PUBLIC_SN_PW
//         ),
//     },
//   })
//   response
//     .then((data) => data.json())
//     .then((data) => { return (data) }
   
    

// }

export type GroupType = {
  name: string
  sys_id: string
  parent: string | null
}

export type GroupResultType = {
  result: GroupType[]
}

export function getAllGroups(numberOfRecords: number = 10, Offeset: number = 0) {
  var promise: Promise<GroupType[]> = new Promise(function (resolve, reject) {
    const url: String = process.env.NEXT_PUBLIC_SN_URL!
    /// https://emphcheng.service-now.com/api/now/v1/table/incident?sysparm_query=active=true^ORDERBYpriority^ORDERBYnumber
    const recordsToRead: Number = 10
    const FieldToRead: String = "name,parent,sys_id"
    const query: String = `?sysparm_fields=${FieldToRead}&sysparm_limit=${numberOfRecords}&sysparm_offset=${Offeset}&?sysparm_query=active=true^parent=null`
    fetch(url + "sys_user_group" + query, {
      method: "GET",
      headers: {
        Authorization:
          "Basic " +
          btoa(
            process.env.NEXT_PUBLIC_SN_USER +
              ":" +
              process.env.NEXT_PUBLIC_SN_PW
          ),
      },
    })
      .then((data) => data.json())
      .then((data: GroupResultType) => {
        resolve(data.result)
      })
      .catch((err) => reject(err))
     
  })
  return promise;  
  
  
 
}

export async function getOneGroups(sys_id: string) {
  const url: String = process.env.NEXT_PUBLIC_SN_URL!
  const FieldToRead: String = "name,parent,sys_id"
  let response = await fetch(url + "sys_user_group/" + sys_id+`?sysparm_fields=${FieldToRead}`, {
    method: "GET",
    headers: {
      Authorization:
        "Basic " +
        btoa(
          process.env.NEXT_PUBLIC_SN_USER + ":" + process.env.NEXT_PUBLIC_SN_PW
        ),
    },
  })
  let data = await response.json()
  return data
}

// export async function getUserbyLink(link: string) {
//   const FieldToRead: String = "name"
//   const query: String = `?sysparm_fields=${FieldToRead}`

//   let response = await fetch(link + query, {
//     method: "GET",
//     headers: {
//       Authorization:
//         "Basic " +
//         btoa(
//           process.env.NEXT_PUBLIC_SN_USER + ":" + process.env.NEXT_PUBLIC_SN_PW
//         ),
//     },
//   })
//   let data = await response.json()

//   return data
// }

// export async function getAllUser() {
//   const data = await getUserRole(100, 0)
//   if (data.result.length > 0) {
//     data.result.forEach(async (user: any) => {
//       let res = await getUserbyLink(user.user.link)
//       console.log(res.result)
//     })
//   }
// }

// export const testTimer = async () => {
//   await sleep(5000);
// }

// function sleep(ms) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms)
//   })
// }