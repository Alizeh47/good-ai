import { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

interface Statistic {
  label: string
  value: number
  suffix: string
  color: string
}

const statistics: Statistic[] = [
  {
    label: 'Years of Excellence',
    value: 12,
    suffix: '+',
    color: 'bg-primary',
  },
  {
    label: 'Products Available',
    value: 150,
    suffix: '+',
    color: 'bg-accent',
  },
  {
    label: 'Customer Reviews',
    value: 1000,
    suffix: '+',
    color: 'bg-secondary',
  },
  {
    label: 'Global Locations',
    value: 25,
    suffix: '',
    color: 'bg-text-primary',
  },
]

function CircularProgress({
  value,
  color,
  size = 120,
  strokeWidth = 8,
}: {
  value: number
  color: string
  size?: number
  strokeWidth?: number
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const progress = (value / 100) * circumference

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      initial={{ rotate: -90 }}
      className="transform"
    >
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-text-secondary/10"
      />
      {/* Progress circle */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: circumference - progress }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className={color.replace('bg-', 'text-')}
      />
    </motion.svg>
  )
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5 }
      })
    }
  }, [isInView, controls])

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={controls}
      className="text-h2 font-serif font-medium"
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {value}
      </motion.span>
      {suffix}
    </motion.span>
  )
}

export default function Statistics() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {statistics.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative">
                <CircularProgress
                  value={75}
                  color={stat.color}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
              </div>
              <h3 className="mt-4 text-small font-medium uppercase tracking-wider text-text-secondary">
                {stat.label}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 