import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { portfolio } from '../data/portfolio'
import { ArrowDown } from 'lucide-react'

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Typography reveal animation
      gsap.from('.reveal-char', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.05,
        ease: 'power4.out',
        delay: 0.2
      })

      // Subtle parallax on background elements
      window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e
        const xPos = (clientX / window.innerWidth - 0.5) * 20
        const yPos = (clientY / window.innerHeight - 0.5) * 20

        gsap.to('.hero-bg-element', {
          x: xPos,
          y: yPos,
          duration: 1,
          ease: 'power2.out'
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-dark-bg"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="hero-bg-element absolute top-1/4 left-1/4 w-64 h-64 bg-dark-accent/10 rounded-full blur-[100px]" />
        <div className="hero-bg-element absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 text-dark-muted font-medium tracking-widest uppercase text-xs"
        >
          Welcome to the digital space of
        </motion.div>

        <h1 className="text-6xl md:text-9xl font-display font-bold tracking-tighter text-dark-text mb-6 overflow-hidden">
          <div className="flex justify-center overflow-hidden">
            {portfolio.profile.name.toUpperCase().split('').map((char, i) => (
              <span key={i} className="reveal-char inline-block">
                {char === ' ' ? ' ' : char}
              </span>
            ))}
          </div>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <p className="text-xl md:text-2xl text-dark-muted font-light mb-8 leading-relaxed">
            {portfolio.profile.headline} <br />
            <span className="text-dark-text font-medium italic">
              "{portfolio.profile.tagline}"
            </span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-dark-accent text-dark-bg font-bold rounded-full transition-transform"
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-dark-accent/30 text-dark-accent font-bold rounded-full transition-transform backdrop-blur-sm hover:bg-dark-accent/10"
            >
              Let's Talk
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-dark-muted"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
