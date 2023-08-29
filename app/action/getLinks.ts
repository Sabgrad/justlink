import prisma from '@/app/libs/prismadb'

const getLinks = async (name: string) => {
  try {

    if (!name) return null

    const links = await prisma.link.findMany({
      where: {
        userName: name as string
      }
    })

    if (!links) return null

    return links

  } catch (err: any) {
    return console.log(err)
  }
}

export default getLinks