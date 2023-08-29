'use client'

import { useEffect, useState } from "react"

import { useParams } from "next/navigation"

import axios from "axios"

import WrapperError from "./components/WrapperError"
import JustLink from "../components/justlink/JustLink"

import { Link, User } from "@prisma/client"


const LinkPage = () => {

  const [user, setUser] = useState<User | undefined>(undefined)
  const [links, setLinks] = useState<Link[] | undefined>(undefined)
  const [isLoading, setIsloading] = useState<boolean>(true)

  const { id } = useParams()

  useEffect(() => {
    const getUser = async (name: string) => {
      await axios.get(`api/user/${name}`)
        .then((res) => setUser(res.data))
        .catch(() => console.log('user dont found'))

      await axios.get(`api/link/${name}`)
        .then((res) => setLinks(res.data))
    }

    getUser(id as string).finally(() => setIsloading(false))
  }, [])

  if (isLoading) return (
    <WrapperError>
      Loading...
    </WrapperError>
  )

  if (!user) return (
    <WrapperError>
      {`User with name: ${id} don't found`}
    </WrapperError>
  )

  return (
    <>
      {
        user.image
          ?
          <div>
            <img src={user.image} className='w-24 h-24 aspect-auto rounded-full' alt='profile image' />
          </div>
          : null
      }
      <span className='font-semibold text-2xl border-b w-full flex justify-center'>
        {user.name}
      </span>
      { 
        links?.sort((a, b) => a.position > b.position ? 1 : -1).map((link) =>
          <JustLink
            key={link.id}
            onClick={() => window.open(`//${link.path}`, '_blank')}
            title={link.title}
            path={link.path}
            image={link.image}
            id={link.id}
          />
        )
      }
    </>
  )
}

export default LinkPage