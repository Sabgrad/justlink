'use client'

import { useState } from 'react'

import Icon from './components/Icon'
import { icons } from '@/app/helpers/IconHelper'

import clsx from 'clsx'

import { BsImage } from 'react-icons/bs'

type IconPickerType = {
  setValue: (name: string, value: string) => void
  currentImage: string
}

const IconPicker: React.FC<IconPickerType> = ({
  setValue,
  currentImage
}) => {

  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className='flex flex-col w-full relative items-center'>
      <div
        className='w-full justify-between flex gap-2 p-1'
      >
        {<Icon icon={icons.find((icon) => icon.name === currentImage)?.icon} />}
        <BsImage onClick={() => setIsOpen(prev => !prev)} size={34} />
      </div>
      {
        isOpen
          ?
          <ul
            className='flex flex-row overflow-y-auto overflow-x-hidden flex-wrap gap-2 max-h-[148px]'>
            {icons.map((icon) =>
              <li key={icon.name}
                onClick={() => setValue('image', icon.name)}
                className={
                  clsx('rounded-lg p-1 hover:bg-gray-200',
                    currentImage === icon.name && 'bg-white text-gray-950'
                  )}
              >
                <Icon icon={icon.icon} />
              </li>
            )}
          </ul>
          : null
      }
    </div>
  )
}

export default IconPicker