import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { portfolio } from '../data/portfolio'
import { isMobile } from '../utils/device'

gsap.registerPlugin(ScrollTrigger)

const Experience: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mobile = isMobile();

      if (mobile) {
        // Simple reveal for mobile instead of scrub
        gsap.to(lineRef.current, {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top center',
            toggleActions: 'play none none reverse',
          },
        })
      } else {
        // Premium scrub for desktop
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top center',
              end: 'bottom center',
              scrub: true,
            },
          },
        )
      }

      // Animate experience cards
      const cards = gsap.utils.toArray('.experience-card')
      cards.forEach((card: any, i: number) => {
        gsap.from(card, {
          opacity: 0,
          x: mobile ? 0 : (i % 2 === 0 ? -50 : 50),
          y: mobile ? 30 : 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    }, timelineRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" className="py-24 px-6 bg-dark-bg relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold text-dark-text mb-4">
            Journey & <span className="text-dark-accent">Experience</span>
          </h2>
          <p className="text-dark-muted max-w-2xl mx-auto">
            My professional evolution through various roles and responsibilities.
          </p>
        </motion.div>

        <div ref={timelineRef} className="relative">
          {/* Vertical Line */}
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 w-px h-full bg-dark-accent/30 -translate-x-1/2 origin-top"
          />

          <div className="space-y-24">
            {portfolio.experience.map((exp, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-center justify-between gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Content */}
                <div className="experience-card w-full md:w-5/12 p-6 bg-dark-surface border border-dark-accent/10 rounded-3xl hover:border-dark-accent/30 transition-colors group will-change-transform">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-dark-text group-hover:text-dark-accent transition-colors">
                      {exp.role}
                    </h3>
                    <span className="text-xs font-medium text-dark-accent bg-dark-accent/10 px-3 py-1 rounded-full">
                      {exp.duration}
                    </span>
                  </div>
                  <h4 className="text-md font-medium text-dark-muted mb-3">{exp.company}</h4>
                  <p className="text-sm text-dark-muted leading-relaxed mb-4">
                    {exp.description}
                  </p>
                  <ul className="space-y-2">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-dark-muted flex items-start gap-2">
                        <span className="text-dark-accent mt-1">•</span> {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Center Point */}
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-dark-bg border-2 border-dark-accent rounded-full z-10 group">
                  <div className="absolute inset-0 bg-dark-accent rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                </div>

                {/* Empty space for balance */}
                <div className="hidden md:block w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
