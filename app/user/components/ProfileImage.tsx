'use client'

import axios from 'axios'

import { useRouter } from 'next/navigation'

import { CldUploadButton } from 'next-cloudinary'

import Icon from '@/app/components/IconPicker/components/Icon'
import { BsCameraFill } from 'react-icons/bs'
import { TiDelete } from 'react-icons/ti'

type ProfileImageProps = {
  name: string
  image: string | null
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  name,
  image
}) => {

  const router = useRouter()

  const handleUpload = (result: any) => {
    axios.post(`api/user/${name}`, {
      image: result?.info?.secure_url
    })
    .finally(() => router.refresh())
  }

  const handleDelete = () => {
    axios.post(`api/user/${name}`, {
      image: ''
    })
    .finally(() => router.refresh())
  }

  return (
    <div className='relative'>
      <CldUploadButton options={{ maxFiles: 1 }} onUpload={handleUpload} uploadPreset='zmmgcuk8'>
        {
          image
            ?
            <img className='w-24 h-24 aspect-auto rounded-full' src={image} alt='profile image'/>
            :
            <Icon icon={BsCameraFill} size={96} />
        }
      </CldUploadButton>
      {
        image
          ?
          <div className='absolute -top-2 -right-2 hover:text-red-500 z-30' onClick={handleDelete}>
            <Icon icon={TiDelete} size={25} />
          </div>
          :
          ''
      }
    </div>
  )
}

export default ProfileImage