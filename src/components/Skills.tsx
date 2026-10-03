import React from 'react'
import { motion } from 'framer-motion'
import { portfolio } from '../data/portfolio'

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 px-6 bg-dark-bg relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-bold text-dark-text mb-4"
          >
            Technical <span className="text-dark-accent">Arsenal</span>
          </motion.h2>
          <p className="text-dark-muted max-w-2xl mx-auto">
            A curated set of technologies and tools I use to bring ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(portfolio.skills).map(([category, skills], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="p-8 bg-dark-surface border border-dark-accent/10 rounded-3xl"
            >
              <h3 className="text-xl font-bold text-dark-text mb-6 capitalize">
                {category.replace('_', ' ')}
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.1, color: '#00f2ff' }}
                    className="text-sm px-4 py-2 bg-dark-bg border border-dark-accent/20 text-dark-muted rounded-xl cursor-default transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
