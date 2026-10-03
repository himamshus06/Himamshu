import React from 'react'
import { motion } from 'framer-motion'
import { portfolio } from '../data/portfolio'
import { Mail, Linkedin, Github } from 'lucide-react'

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 px-6 bg-dark-bg relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-8xl font-display font-bold text-dark-text mb-8 tracking-tighter">
            Let's build something <span className="text-dark-accent">interesting</span>.
          </h2>
          <p className="text-xl text-dark-muted max-w-2xl mx-auto leading-relaxed">
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
          <motion.a
            href={`mailto:${portfolio.profile.email}`}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-8 py-4 bg-dark-surface border border-dark-accent/20 text-dark-text rounded-full hover:border-dark-accent transition-all group"
          >
            <Mail size={20} className="text-dark-accent group-hover:rotate-12 transition-transform" />
            <span className="font-medium">Email Me</span>
          </motion.a>

          <motion.a
            href={portfolio.profile.linkedin}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-8 py-4 bg-dark-surface border border-dark-accent/20 text-dark-text rounded-full hover:border-dark-accent transition-all group"
          >
            <Linkedin size={20} className="text-dark-accent group-hover:rotate-12 transition-transform" />
            <span className="font-medium">LinkedIn</span>
          </motion.a>

          <motion.a
            href={portfolio.profile.github}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-8 py-4 bg-dark-surface border border-dark-accent/20 text-dark-text rounded-full hover:border-dark-accent transition-all group"
          >
            <Github size={20} className="text-dark-accent group-hover:rotate-12 transition-transform" />
            <span className="font-medium">GitHub</span>
          </motion.a>
        </div>

        {/* Decorative element */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-dark-accent/10 blur-[120px] pointer-events-none z-0"
        />
      </div>
    </section>
  )
}

export default Contact
