import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'

type Params = {
  id: string
}

export const GET = async (request: Request, { params }: { params: Params }) => {
  try {
    const { id: name } = params

    if (!name) return null

    const userLinks = await prisma.link.findMany({
      where: {
        userName: name,
      },
    })

    return NextResponse.json(userLinks)

  } catch (err: any) {
    return NextResponse.json(err)
  }
}

export const PATCH = async (request: Request, { params }: { params: Params }) => {
  try {
    const body = await request.json()
    const { image, title, path, position } = body
    const { id } = params

    const updateLink = await prisma.link.update({
      where: {
        id
      },
      data: {
        image,
        title,
        path
      }
    })

    const updatePostion = await prisma.link.update({
      where: {
        id
      },
      data: {
        position
      }
    })

    return NextResponse.json(typeof (position) === 'number' ? updatePostion : updateLink)

  } catch (err: any) {
    return NextResponse.json(err)
  }
}

export const DELETE = async (request: Request, { params }: { params: Params }) => {
  try {
    const { id } = params

    await prisma.link.delete({
      where: { id },
    })

    return NextResponse.json('Link Delete')

  } catch (err: any) {
    return NextResponse.json(err)
  }
}