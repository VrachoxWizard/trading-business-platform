'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FadeInStaggerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  delay?: number
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: (custom: { staggerDelay: number; delay: number }) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom.staggerDelay,
      delayChildren: custom.delay,
    },
  }),
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 40,
      damping: 15,
      mass: 1,
    },
  },
}

export function FadeInStaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
  delay = 0,
}: FadeInStaggerProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      custom={{ staggerDelay, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function FadeInItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  )
}
