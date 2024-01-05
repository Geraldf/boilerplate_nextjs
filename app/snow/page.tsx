async function getUserRole(numberOfRecords: number = 10, Offeset: number = 0) {
  const url: String = process.env.NEXT_PUBLIC_SN_URL

  const recordsToRead: Number = 10
  const FieldToRead: String = "role,user"
  const query: String = `?sysparm_fields=${FieldToRead}&sysparm_limit=${numberOfRecords}&sysparm_offset=${Offeset}`

  let response = await fetch(url + query, {
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

async function getUserbyLink(link: string) {
  const FieldToRead: String = "name"
  const query: String = `?sysparm_fields=${FieldToRead}`

  let response = await fetch(link + query, {
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

export default async function Page() {
  const data = await getUserRole(100, 0)
  if (data.result.length > 0) {
    data.result.forEach(async (user: any) => {
      let res = await getUserbyLink(user.user.link)
      console.log(res.result)
    })
  }

  return <main></main>
}
