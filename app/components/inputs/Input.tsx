'use client'

import clsx from "clsx"

import { FieldValues, UseFormRegister } from "react-hook-form"

type InputProps = {
  placeholder?: string
  id: string
  type?: string
  register: UseFormRegister<FieldValues>
  label: string
  errors?: any
  min?: number
  max?: number
}

const Input: React.FC<InputProps> = ({
  id,
  placeholder,
  type,
  register,
  label,
  errors,
  min,
  max
}) => {

  return (
    <div className="flex flex-col items-center gap-2 relative rounded-lg p-2 w-full border-gray-200 border">
      <label className="mr-auto" htmlFor={id}>
        {label}
      </label>
      <input
        className="rounded-xl border border-gray-200 p-2 w-full focus:bg-gray-200 hover:bg-gray-200"
        id={id}
        type={type}
        autoComplete={id}
        placeholder={placeholder}
        {...register(id, {
          required: 'Field cannot be empty',
          minLength: {
            value: min || 2,
            message: `Minimum ${min || 2} characters`
          },
          maxLength: {
            value: max || 40,
            message: `Maximum ${max || 40} characters`
          }
        })}
      />
      <div className={clsx("mr-auto text-xs sm:text-sm")}>
        {errors[id]?.message}
      </div>
    </div>
  )
}

export default Input