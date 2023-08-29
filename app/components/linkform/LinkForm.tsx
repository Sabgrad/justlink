'use client'

import axios from "axios"

import { useRouter } from "next/navigation"

import IconPicker from "@/app/components/IconPicker/IconPicker"
import Input from "../inputs/Input"
import Button from "@/app/components/buttons/Button"

import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

type LinkFormProps = {
  title?: string
  path?: string
  image?: string | null
  formFor: 'create' | 'change'
  id?: string
  onClick?: () => void
  position?: number
}

const LinkForm: React.FC<LinkFormProps> = ({
  id,
  title,
  path,
  image,
  formFor,
  onClick,
  position
}) => {

  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      image: image ? image : '',
      title: title ? title : '',
      path: path ? path : '',
    },
    mode: "onBlur"
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (formFor === 'create') {
      axios.post('/api/link', {
        ...data, position
      })
        .then(() => {
          reset()
        })
        .finally(() => router.refresh())
    }
    if (formFor === 'change') {
      axios.patch(`api/link/${id}`, {
        ...data
      })
        .finally(() => router.refresh())
    }
  }

  const handleDelete = () => {
    axios.delete(`api/link/${id}`)
      .finally(() => router.refresh())
  }

  return (
    <div className="w-full max-w-lg bg-white rounded-lg p-4">
      <form className="flex flex-col w-full gap-4">
        <IconPicker currentImage={watch('image')} setValue={setValue} />
        <Input
          errors={errors}
          max={256}
          label='Title for your link'
          id='title'
          register={register}
        />
        <Input
          errors={errors}
          max={128}
          label='Path for your link'
          id='path'
          register={register}
        />
        <div className="flex flex-row mb-3 gap-3">
          <Button fullWith type='submit' onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
          {
            formFor === 'change'
              ?
              <Button fullWith type="button" onClick={() => {handleDelete(); onClick && onClick}}>
                Delete
              </Button>
              :
              null
          }
        </div>
      </form>
    </div>
  )
}

export default LinkForm