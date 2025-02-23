"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, useAnimation } from "framer-motion"
import { PlusCircle } from "lucide-react"

const JournalEntry = ({ title, date }) => (
  <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded mb-2">
    <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400">{title}</h4>
    <p className="text-xs text-gray-500 dark:text-gray-400">{date}</p>
  </div>
)

export default function JournalPageAnimation() {
  const contentControls = useAnimation()
  const animationRef = useRef(null)
  const [showNewEntry, setShowNewEntry] = useState(false)

  const runAnimation = useCallback(async () => {
    await contentControls.start("visible")
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setShowNewEntry(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setShowNewEntry(false)
    await contentControls.start("hidden")

    setTimeout(() => {
      if (animationRef.current) {
        animationRef.current = requestAnimationFrame(runAnimation)
      }
    }, 1000)
  }, [contentControls])

  useEffect(() => {
    animationRef.current = requestAnimationFrame(runAnimation)
    return () => cancelAnimationFrame(animationRef.current)
  }, [runAnimation])

  return (
    <div className="w-full h-full bg-white dark:bg-gray-800 p-4 flex flex-col">
      <motion.div
        initial="hidden"
        animate={contentControls}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        className="flex-1"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Study Journal</h3>
          <PlusCircle className="w-5 h-5 text-blue-500 dark:text-blue-400" />
        </div>
        <div className="space-y-2">
          <JournalEntry title="Mastering Data Structures" date="May 15, 2023" />
          <JournalEntry title="Algorithm Breakthroughs" date="May 12, 2023" />
          <JournalEntry title="Web Dev Progress" date="May 10, 2023" />
        </div>
      </motion.div>
      {showNewEntry && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="mt-4 p-2 bg-blue-200 dark:bg-blue-700 rounded"
        >
          <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400">New Entry</h4>
          <p className="text-xs text-gray-600 dark:text-gray-300">Adding today's reflection...</p>
        </motion.div>
      )}
    </div>
  )
}

