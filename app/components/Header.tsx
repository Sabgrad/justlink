'use client'

// змінити список щоб працював рідерект при натиску і на іконку а не лише текст todo

import { useState } from 'react'

import useRoutesHook from '../hooks/useRoutesHook'

import Link from 'next/link'

import clsx from 'clsx'

import Icon from './IconPicker/components/Icon'
import { BsList } from 'react-icons/bs'

import ModalWindow from './modals/ModalWindow'

const Header = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const routes = useRoutesHook()

  return (
    <div className={clsx('fixed flex top-2 right-2 p-1 flex-col z-20')}>
      <button className='flex justify-end' onClick={() => setIsOpen(true)}>
        <Icon className='hover:scale-110' icon={BsList} size={25} />
      </button>
      {
        isOpen
          ?
          <ModalWindow active={isOpen} setActive={setIsOpen}>
            <ul className='rounded-xl flex gap-2 flex-col p-3 mt-1 bg-white'>
              {
                routes.map((route) =>
                  <Link
                    className='flex gap-2 p-2 items-center flex-row rounded-xl fastAnimation hover:bg-gray-200'
                    key={route.label}
                    onClick={() => {
                      route.onclick ? route.onclick()
                        .finally(() => {
                          setIsOpen(false)
                        })
                      : setIsOpen(false)
                    }}
                    href={route.href}
                  >
                    <Icon icon={route.icon} size={30} />
                    <span>{route.label}</span>
                  </Link>
                )
              }
            </ul>
          </ModalWindow>
          :
          null
      }
    </div>
  )
}

export default Header