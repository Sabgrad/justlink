'use client'

import { useCallback, useEffect, useState } from "react"

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import axios from "axios"

import Button from "@/app/components/buttons/Button"

import Input from "@/app/components/inputs/Input"

import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {

  const [variant, setVariant] = useState<Variant>('LOGIN')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/user')
    }
  }, [session?.status])

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER')
    } else {
      setVariant('LOGIN')
    }
  }, [variant])

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    mode: "onBlur"
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    if (variant === 'REGISTER') {
      axios.post('/api/register', data)
        .then(() => signIn('credentials', data))
        .finally(() => setIsLoading(false))
    }

    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false
      })
        .then((callback) => {
          if (callback?.error) {
            console.log('invalid cred')
          }

          if (callback?.ok && !callback?.error) {
            router.push('/user')
            console.log('succes sign in')
          }
        })
        .finally(() => setIsLoading(false))
    }
  }

  return (
    <div className=" w-80 sm:w-96 flex flex-col items-center gap-4 p-4 border-2 bg-white rounded-xl">
      <div>
        Sign in to your account
      </div>
      <form className="flex gap-4 flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
        {
          variant === 'REGISTER'
            ?
            <Input
              id='name'
              label="Name"
              min={1}
              max={64}
              register={register}
              errors={errors}
            />
            : null
        }
        <Input
          id='email'
          label="Email"
          type="email"
          register={register}
          errors={errors}
          max={128}
        />

        <Input
          id='password'
          type='password'
          label="Password"
          register={register}
          errors={errors}
          min={8}
          max={32}
        />
        <Button
          disabled={isLoading}
          fullWith
          type='submit'
        >
          {variant === 'LOGIN' ? "Sign in" : 'Register'}
        </Button>
      </form>
      <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-300">
        <div>
          {variant === 'LOGIN' ? 'New to JustLinks?' : 'Alredy have an account?'}
        </div>
        <div onClick={toggleVariant} className="underline cursor-pointer">
          {variant === 'LOGIN' ? 'Create an Account' : 'Login'}
        </div>
      </div>
    </div>
  )
}

export default AuthForm