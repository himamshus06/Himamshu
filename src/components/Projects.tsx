import React from 'react'
import { motion } from 'framer-motion'
import { portfolio } from '../data/portfolio'
import { ExternalLink, Github } from 'lucide-react'

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 px-6 bg-dark-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-display font-bold text-dark-text mb-4"
            >
              Selected <span className="text-dark-accent">Projects</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-dark-muted"
            >
              Turning complex problems into elegant, functional software solutions.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolio.projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative p-8 bg-dark-bg border border-dark-accent/10 rounded-3xl overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-dark-accent/10 blur-3xl group-hover:bg-dark-accent/20 transition-colors" />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold text-dark-text group-hover:text-dark-accent transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex gap-3">
                    {project.github !== '#' && (
                      <a href={project.github} target="_blank" rel="noreferrer" className="text-dark-muted hover:text-dark-accent transition-colors">
                        <Github size={20} />
                      </a>
                    )}
                    {project.link !== '#' && (
                      <a href={project.link} target="_blank" rel="noreferrer" className="text-dark-muted hover:text-dark-accent transition-colors">
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-dark-muted mb-8 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-xs font-medium px-3 py-1 bg-dark-surface border border-dark-accent/20 text-dark-accent rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
