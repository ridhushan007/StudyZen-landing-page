"use client"

import { motion } from "framer-motion"

export default function GradientSpinner() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <motion.div
        className="w-16 h-16 rounded-full"
        style={{
          background: "conic-gradient(from 0deg, #ff00cc, #3333ff, #00ffff, #ff00cc)",
          boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
        }}
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: {
            repeat: Number.POSITIVE_INFINITY,
            duration: 1.5,
            ease: "linear",
          },
          scale: {
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
            ease: "easeInOut",
          },
        }}
      />
    </div>
  )
}

