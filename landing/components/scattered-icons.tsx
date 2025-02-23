"use client"

import {
  BookOpen,
  Coffee,
  Headphones,
  Moon,
  Sun,
  Music,
  Pencil,
  Lightbulb,
  Zap,
  Star,
  Heart,
  Smile,
} from "lucide-react"
import { motion } from "framer-motion"

const icons = [BookOpen, Coffee, Headphones, Moon, Sun, Music, Pencil, Lightbulb, Zap, Star, Heart, Smile]

const ScatteredIcon = ({ delay, duration, x, y }) => {
  const Icon = icons[Math.floor(Math.random() * icons.length)]
  return (
    <motion.div
      className="absolute text-blue-400 dark:text-blue-600 opacity-20"
      style={{ left: x, top: y }}
      animate={{
        y: [0, -10, 0],
        opacity: [0.2, 0.3, 0.2],
      }}
      transition={{
        duration: 5 + Math.random() * 3,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
        delay,
      }}
    >
      <Icon size={32} />
    </motion.div>
  )
}

export default function ScatteredIcons() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(50)].map((_, i) => {
        const x = `${Math.random() * 100}vw`
        const y = `${Math.random() * 100}vh`
        const delay = Math.random() * 5
        const duration = 3 + Math.random() * 2

        return <ScatteredIcon key={i} delay={delay} duration={duration} x={x} y={y} />
      })}
    </div>
  )
}

