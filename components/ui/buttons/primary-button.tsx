import { ButtonHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean
}

export default function PrimaryButton({
  children,
  className,
  fullWidth = false,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      className={twMerge(
        'inline-flex items-center justify-center px-6 py-3',
        'bg-primary text-text-light font-medium',
        'transition-all duration-200 ease-in-out',
        'hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        fullWidth ? 'w-full' : '',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
