import { FormEvent, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Send } from 'lucide-react'

interface NewsletterFormProps {
  className?: string
  onSubmit?: (email: string) => void
}

export default function NewsletterForm({
  className,
  onSubmit
}: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email) return

    try {
      setStatus('loading')
      onSubmit?.(email)
      setStatus('success')
      setEmail('')
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className={twMerge(
        'w-full',
        className
      )}
    >
      <div className="relative">
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className="w-full h-12 pl-4 pr-12 bg-white/10 border border-white/20 rounded-full 
                   text-sm text-white placeholder:text-gray-400
                   focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold
                   disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="absolute right-1 top-1 bottom-1 px-4
                   inline-flex items-center justify-center rounded-full
                   bg-gold text-white transition-colors hover:bg-gold/90
                   focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <Send size={18} className="transform rotate-45" />
          )}
          <span className="sr-only">Subscribe</span>
        </button>
      </div>

      {status === 'success' && (
        <p className="mt-3 text-sm text-green-400 flex items-center">
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          Thank you for subscribing!
        </p>
      )}

      {status === 'error' && (
        <p className="mt-3 text-sm text-red-400 flex items-center">
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  )
}
