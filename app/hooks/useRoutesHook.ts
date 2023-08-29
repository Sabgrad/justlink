import { signOut, useSession } from "next-auth/react"

import { usePathname } from "next/navigation"

import { useMemo } from "react"

import { BsPersonFillGear, BsPersonFill, BsHouseDoorFill } from 'react-icons/bs'
import { PiSignInBold, PiSignOutBold } from 'react-icons/pi'

const useRoutesHook = () => {

  const pathname = usePathname()
  const session = useSession()

  session.status === 'unauthenticated'

  const routesHook = useMemo(() =>
    session.status === 'authenticated' ?
      [
        { label: 'Home', href: '/', active: pathname === '/', icon:  BsHouseDoorFill},
        { label: 'Profile setup', href: '/user', active: pathname === '/user', icon: BsPersonFillGear},
        { label: 'Profile', href: `/${session.data.user?.name}`, icon:  BsPersonFill},
        { label: 'Log out', href: '#', onclick: () => signOut({ callbackUrl: '/' }), icon: PiSignOutBold},
      ]
      :
      [
        { label: 'Home', href: '/', active: pathname === '/', icon: BsHouseDoorFill},
        { label: 'Sign in', href: '/auth', active: pathname === '/auth', icon: PiSignInBold}
      ], [pathname, session.status])
  return routesHook
}

export default useRoutesHook