import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { isMobile } from '../utils/device'

const CustomCursor: React.FC = () => {
  if (isMobile()) return null;

  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX)
      setMouseY(e.clientY)
    }

    const handleOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, .interactive')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleOver)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleOver)
    }
  }, [])

  return (
    <motion.div
      className="fixed top-0 left, rounded-full border border-dark-accent pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center w-6 h-6"
      animate={{
        x: mouseX,
        y: mouseY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 700 }}
    >
      {isHovering && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-full h-full bg-dark-accent rounded-full"
        />
      )}
    </motion.div>
  )
}

export default CustomCursor
