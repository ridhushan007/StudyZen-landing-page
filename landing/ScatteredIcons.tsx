"use client"

import type React from "react"
import { motion } from "framer-motion"
import { FaReact } from "react-icons/fa"

interface ScatteredIconsProps {
  Icon?: any
  color?: string
}

const ScatteredIcons: React.FC<ScatteredIconsProps> = ({ Icon = FaReact, color = "blue" }) => {
  return (
    <div className="absolute inset-0 h-full w-full" style={{ overflow: "hidden" }}>
      {[...Array(30)].map((_, i) => {
        const x = Math.random() * 100
        const y = Math.random() * 100
        const rotate = Math.random() * 360
        const delay = Math.random() * 2

        return (
          <motion.div
            key={i}
            className="scattered-icon absolute"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              rotate: rotate,
              color: color,
            }}
            animate={{
              y: [y, y - 20, y],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: delay,
            }}
          >
            <Icon size={20} />
          </motion.div>
        )
      })}
    </div>
  )
}

export default ScatteredIcons

