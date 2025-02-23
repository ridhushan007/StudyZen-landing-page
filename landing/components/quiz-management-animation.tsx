"use client"

import { useEffect, useRef, useCallback } from "react"
import { motion, useAnimation } from "framer-motion"
import { CheckCircle, XCircle } from "lucide-react"

const QuizQuestion = ({ question, isCorrect }) => (
  <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded mb-2">
    <p className="text-sm text-gray-600 dark:text-gray-300">{question}</p>
    {isCorrect ? (
      <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 mt-1" />
    ) : (
      <XCircle className="w-4 h-4 text-red-500 dark:text-red-400 mt-1" />
    )}
  </div>
)

export default function QuizManagementAnimation() {
  const contentControls = useAnimation()
  const animationRef = useRef(null)

  const runAnimation = useCallback(async () => {
    await contentControls.start("visible")
    await new Promise((resolve) => setTimeout(resolve, 3000))
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
      >
        <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">Quiz: Data Structures</h3>
        <div className="space-y-2">
          <QuizQuestion question="What is a stack?" isCorrect={true} />
          <QuizQuestion question="Explain binary search trees." isCorrect={true} />
          <QuizQuestion question="Define hash tables." isCorrect={false} />
        </div>
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
          <span className="font-semibold">Score:</span> 2/3
        </div>
      </motion.div>
    </div>
  )
}

