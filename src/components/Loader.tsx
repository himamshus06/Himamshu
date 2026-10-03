import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Loader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        const increment = prev < 70 ? Math.random() * 15 : Math.random() * 5
        return Math.min(prev + increment, 100)
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        onComplete()
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [progress, onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        y: '-100%',
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
      }}
      className="fixed inset-0 z-[10000] bg-dark-bg flex flex-col items-center justify-center text-dark-text"
    >
      <div className="relative w-64 h-64 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-2 border-dark-accent/20 rounded-full"
        />

        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="120"
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            className="text-dark-accent/10"
          />
          <motion.circle
            cx="128"
            cy="128"
            r="120"
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray="753.98"
            animate={{ strokeDashoffset: 753.98 - (753.98 * progress) / 100 }}
            className="text-dark-accent"
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-4xl font-display font-bold tracking-tighter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {Math.round(progress)}%
          </motion.span>
          <span className="text-xs uppercase tracking-widest text-dark-muted mt-2">Loading</span>
        </div>
      </div>
    </motion.div>
  )
}

export default Loader
