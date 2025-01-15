import { FormEvent, useState } from 'react'
import { twMerge } from 'tailwind-merge'

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
        'flex flex-col space-y-4',
        className
      )}
    >
      <div className="flex flex-col space-y-2">
        <label 
          htmlFor="email"
          className="text-small font-medium text-text-primary"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="rounded-md border border-text-secondary/20 px-4 py-2 text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          disabled={status === 'loading'}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 font-medium text-text-light transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
      </button>

      {status === 'success' && (
        <p className="text-small text-green-600">
          Thank you for subscribing!
        </p>
      )}

      {status === 'error' && (
        <p className="text-small text-red-600">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  )
}
