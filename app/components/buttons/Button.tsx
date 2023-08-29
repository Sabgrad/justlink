'use client'

import clsx from "clsx"

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset' | undefined
  fullWith?: boolean
  children?: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
}

const Button: React.FC<ButtonProps> = ({
  type,
  fullWith,
  children,
  onClick,
  disabled,
  className
}) => {

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(`flex justify-center px-3 py-2 rounded-xl  border bg-white hover:bg-gray-200 fastAnimation`,
        disabled && 'opacity-50 cursor-default',
        fullWith && 'w-full',
        className && className
      )}
    >
      {children}
    </button>
  )
}

export default Button