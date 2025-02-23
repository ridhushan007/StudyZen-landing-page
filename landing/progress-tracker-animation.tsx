"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import { BarChart2 } from "lucide-react"

const ProgressBar = ({ progress, color }) => (
  <div className="w-full bg-blue-200 dark:bg-blue-700 rounded-full h-2">
    <motion.div
      className={`h-2 rounded-full ${color}`}
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    />
  </div>
)

export default function ProgressTrackerAnimation() {
  const contentControls = useAnimation()
  const animationRef = useRef(null)

  const runAnimation = async () => {
    await contentControls.start("visible")
    await new Promise((resolve) => setTimeout(resolve, 3000))
    await contentControls.start("hidden")

    setTimeout(() => {
      if (animationRef.current) {
        animationRef.current = requestAnimationFrame(runAnimation)
      }
    }, 1000)
  }

  useEffect(() => {
    animationRef.current = requestAnimationFrame(runAnimation)
    return () => cancelAnimationFrame(animationRef.current)
  }, []) // Removed runAnimation from dependencies

  return (
    <div className="w-full h-full bg-white dark:bg-gray-800 p-4 flex flex-col justify-center">
      <motion.div
        initial="hidden"
        animate={contentControls}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
      >
        <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">Progress Overview</h3>
        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
              <span>Data Structures</span>
              <span>85%</span>
            </div>
            <ProgressBar progress={85} color="bg-blue-500 dark:bg-blue-400" />
          </div>
          <div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
              <span>Algorithms</span>
              <span>70%</span>
            </div>
            <ProgressBar progress={70} color="bg-blue-400 dark:bg-blue-300" />
          </div>
          <div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
              <span>Web Development</span>
              <span>90%</span>
            </div>
            <ProgressBar progress={90} color="bg-blue-600 dark:bg-blue-500" />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm text-gray-600 dark:text-gray-300">
          <BarChart2 className="w-4 h-4 mr-1 text-blue-500 dark:text-blue-400" />
          <span>Overall progress: 82%</span>
        </div>
      </motion.div>
    </div>
  )
}

