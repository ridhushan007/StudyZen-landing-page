"use client"

import { motion } from "framer-motion"

const Ring = ({ size, duration, reverse, opacity, blur }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: size,
      height: size,
      border: `4px solid transparent`,
      borderRadius: "50%",
      backgroundOrigin: "border-box",
      backgroundClip: "content-box, border-box",
      background: `
        linear-gradient(#000, #000) padding-box, 
        linear-gradient(to right, #00ffff, #ff00ff) border-box
      `,
      opacity: opacity,
      filter: `blur(${blur}px)`,
    }}
    animate={{
      rotate: reverse ? -360 : 360,
    }}
    transition={{
      duration: duration,
      repeat: Number.POSITIVE_INFINITY,
      ease: "linear",
    }}
  />
)

const PulsingCore = () => (
  <motion.div
    className="absolute w-8 h-8 rounded-full bg-white"
    animate={{
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    }}
  />
)

export default function ComplexGradientRings() {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="relative">
        <Ring size={200} duration={10} reverse={false} opacity={0.3} blur={5} />
        <Ring size={160} duration={8} reverse={true} opacity={0.4} blur={4} />
        <Ring size={120} duration={6} reverse={false} opacity={0.5} blur={3} />
        <Ring size={80} duration={4} reverse={true} opacity={0.6} blur={2} />
        <PulsingCore />
      </div>
    </div>
  )
}

