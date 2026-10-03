import React from 'react'
import { motion } from 'framer-motion'
import { portfolio } from '../data/portfolio'

const About: React.FC = () => {
  const text = portfolio.profile.about
  const isMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;

  return (
    <section id="about" className="py-24 px-6 bg-dark-bg relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-display font-bold text-dark-text leading-tight mb-8"
            >
              Who am I <span className="text-dark-accent">?</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                duration: isMobile ? 0.5 : 0.8
              }}
              viewport={{ once: true }}
              className="text-lg text-dark-muted leading-relaxed space-y-6"
            >
              <p>
                {text}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="p-4 border border-dark-accent/10 bg-dark-surface rounded-2xl">
                  <h4 className="text-dark-accent font-bold mb-1">Technical Mindset</h4>
                  <p className="text-sm text-dark-muted">Focused on efficiency and scalable architecture.</p>
                </div>
                <div className="p-4 border border-dark-accent/10 bg-dark-surface rounded-2xl">
                  <h4 className="text-dark-accent font-bold mb-1">Creative Approach</h4>
                  <p className="text-sm text-dark-muted">Turning problems into intuitive solutions.</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="w-full md:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: isMobile ? 1 : 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="aspect-square rounded-3xl bg-dark-surface border border-dark-accent/20 overflow-hidden relative group"
            >
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-dark-accent/20 to-transparent">
                <img
                  src="/profile.jpeg"
                  alt="Himamshu Sharma"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute top-4 right-4 w-12 h-12 border border-dark-accent/30 rounded-full animate-pulse" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border border-dark-accent/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
