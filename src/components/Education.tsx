import React from 'react'
import { motion } from 'framer-motion'
import { portfolio } from '../data/portfolio'

interface Certification {
  name: string;
  issuer: string;
  date?: string;
}

const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 px-6 bg-dark-surface relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-bold text-dark-text mb-4"
          >
            Education & <span className="text-dark-accent">Learning</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Education */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-dark-text border-l-4 border-dark-accent pl-4">Academic Background</h3>
            {portfolio.education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="p-6 bg-dark-bg border border-dark-accent/10 rounded-3xl"
              >
                <h4 className="text-xl font-bold text-dark-text mb-1">{edu.institution}</h4>
                <p className="text-dark-accent font-medium mb-2">{edu.degree} in {edu.field}</p>
                <p className="text-sm text-dark-muted">{edu.duration} • {edu.location}</p>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-dark-text border-l-4 border-dark-accent pl-4">Certifications</h3>
            {portfolio.certifications.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {(portfolio.certifications as Certification[]).map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="p-6 bg-dark-bg border border-dark-accent/10 rounded-3xl flex justify-between items-center group hover:border-dark-accent/30 transition-colors"
                  >
                    <div>
                      <h4 className="text-md font-bold text-dark-text group-hover:text-dark-accent transition-colors">{cert.name}</h4>
                      <p className="text-xs text-dark-muted">{cert.issuer}</p>
                    </div>
                    <div className="w-2 h-2 bg-dark-accent rounded-full opacity-50" />
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-dark-muted italic text-sm">No certifications listed.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education
