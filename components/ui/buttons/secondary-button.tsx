import { ButtonHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean
  variant?: 'outline' | 'ghost'
}

export default function SecondaryButton({
  children,
  className,
  fullWidth = false,
  variant = 'outline',
  ...props
}: SecondaryButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 font-medium transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variantStyles = {
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-text-light focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
    ghost: 'text-primary hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
  }

  return (
    <button
      className={twMerge(
        baseStyles,
        variantStyles[variant],
        fullWidth ? 'w-full' : '',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
