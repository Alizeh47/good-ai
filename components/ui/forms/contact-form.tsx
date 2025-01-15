import { FormEvent, useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface ContactFormProps {
  className?: string
  onSubmit?: (data: ContactFormData) => void
}

interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
}

export default function ContactForm({
  className,
  onSubmit
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    try {
      setStatus('loading')
      onSubmit?.(formData)
      setStatus('success')
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (error) {
      setStatus('error')
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={twMerge(
        'flex flex-col space-y-6',
        className
      )}
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="name"
            className="text-small font-medium text-text-primary"
          >
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            className="rounded-md border border-text-secondary/20 px-4 py-2 text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            disabled={status === 'loading'}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="email"
            className="text-small font-medium text-text-primary"
          >
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="rounded-md border border-text-secondary/20 px-4 py-2 text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            disabled={status === 'loading'}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="phone"
            className="text-small font-medium text-text-primary"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="rounded-md border border-text-secondary/20 px-4 py-2 text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            disabled={status === 'loading'}
          />
        </div>

        <div className="flex flex-col space-y-2 md:col-span-2">
          <label
            htmlFor="message"
            className="text-small font-medium text-text-primary"
          >
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message"
            required
            rows={4}
            className="rounded-md border border-text-secondary/20 px-4 py-2 text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            disabled={status === 'loading'}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 font-medium text-text-light transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>

      {status === 'success' && (
        <p className="text-small text-green-600">
          Thank you for your message. We'll get back to you soon!
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
