'use client'

import { useState } from "react"

import clsx from "clsx"

import Icon from "../IconPicker/components/Icon"
import { icons } from '@/app/helpers/IconHelper'
import { BsThreeDots } from "react-icons/bs"

import LinkForm from "@/app/components/linkform/LinkForm"
import ModalWindow from "../modals/ModalWindow"

type JustLinkProps = {
  title: string
  image?: string | null
  path: string
  onClick?: () => void
  firstColor?: string
  secondColor?: string
  border?: string
  dl?: boolean
  id: string

}

const JustLink: React.FC<JustLinkProps> = ({
  title,
  image,
  onClick,
  path,
  dl,
  id
}) => {

  const [modal, setModal] = useState<boolean>(false)

  const handleClickSettings = () => {
    setModal(true)
  }

  return (
    <div
      onClick={onClick}
      className={clsx(
        `bg-white rounded-xl px-2 w-full flex flex-col justify-center relative max-w-4xl h-max items-center hover:bg-gray-200 fastAnimation`,
      )}
    >
      <div className=" relative w-full flex flex-row py-3 px-7">
        <div className="absolute centerY left-0">
          {
            image
              ?
              <Icon size={25} icon={icons.find((icon) => icon.name === image)?.icon} />
              : null}
        </div>
        <span className="w-full overflow-hidden break-words px-1 inline-block text-center">
          {title}
        </span>
        {
          dl
            ?
            <div className="absolute right-0 centerY hover:bg-white rounded-full fastAnimation" onClick={handleClickSettings}>
              <Icon icon={BsThreeDots} size={20} />
            </div>
            : null
        }
      </div>
      <ModalWindow setActive={setModal} active={modal}>
        <LinkForm formFor='change' path={path} image={image} title={title} id={id} />
      </ModalWindow>
    </div>
  )
}

export default JustLink