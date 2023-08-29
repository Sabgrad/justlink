import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'
import getCurrentUser from "@/app/action/getCurrentUser";

export const POST = async (request: Request) => {

  try {
    const user = await getCurrentUser()
    const body = await request.json()
    const { image, title, path, position } = body

    if (!user?.id || !user?.email || !user?.name) {
      return console.log('dont have data for request')
    }

    const newLink = await prisma.link.create({
      data: {
        image,
        title,
        path,
        position,
        user: {
          connect: {
            name: user.name
          }
        }
      },
      include: {
        user: true
      }
    })

    return NextResponse.json(newLink)

  } catch (err: any) {

    return NextResponse.json(err)
  }
}