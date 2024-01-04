import { PrismaClient } from "@prisma/client";





const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
      data: {
          name: "Name 1",
          email: "Name1@example.com",
    },
  })
  await prisma.user.create({
    data: {
      name: "Name 2",
      email: "Name3@example.com",
    },
  })
  await prisma.user.create({
    data: {
      name: "Name 3",
      email: "Name3@example.com",
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })