import React from 'react'
import { portfolio } from '../data/portfolio'
import { Github, Linkedin, Globe } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="py-12 px-6 bg-dark-surface border-t border-dark-accent/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <div className="text-xl font-display font-bold text-dark-text mb-2">
            Himamshu S<span className="text-dark-accent">.</span>
          </div>
          <p className="text-sm text-dark-muted">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a href={portfolio.profile.github} target="_blank" rel="noreferrer" className="text-dark-muted hover:text-dark-accent transition-colors">
            <Github size={20} />
          </a>
          <a href={portfolio.profile.linkedin} target="_blank" rel="noreferrer" className="text-dark-muted hover:text-dark-accent transition-colors">
            <Linkedin size={20} />
          </a>
          <a href={portfolio.profile.website} target="_blank" rel="noreferrer" className="text-dark-muted hover:text-dark-accent transition-colors">
            <Globe size={20} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
