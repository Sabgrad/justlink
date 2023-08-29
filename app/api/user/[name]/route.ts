import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'

type Params = {
  name: string
}

export const GET = async (request: Request, { params }: { params: Params }) => {
  try {
    const { name } = params

    if (!name) {
      return null
    }

    const user = await prisma.user.findUnique({
      where: {
        name: name as string
      },
      select: {
        name: true,
        image: true,
      }
    })

    if (!user) {
      return null
    }

    return NextResponse.json(user)

  } catch (err: any) {
    return NextResponse.json(err)
  }
}

export const POST = async (request: Request, { params }: { params: Params }) => {
  try {
    const { name } = params
    const body = await request.json()
    const { image } = body
    
    console.log(name, image)

    if (!name) return null

    const updateProfileImage = await prisma.user.update({
      where: {
        name: name as string
      },
      data: {
        image: image as string
      }
    })

    return NextResponse.json(updateProfileImage)

  } catch (error) {
    return NextResponse.json(error)
  }
}