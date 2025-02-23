"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, useAnimation } from "framer-motion"
import { Heart } from "lucide-react"

const Confession = ({ content, likes }) => (
  <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded mb-2">
    <p className="text-xs text-gray-600 dark:text-gray-300">{content}</p>
    <div className="flex items-center mt-1">
      <Heart className="w-3 h-3 text-blue-500 dark:text-blue-400 mr-1" />
      <span className="text-xs text-gray-500 dark:text-gray-400">{likes}</span>
    </div>
  </div>
)

export default function PublicConfessionAnimation() {
  const contentControls = useAnimation()
  const animationRef = useRef(null)
  const [confessions, setConfessions] = useState([
    { content: "I'm struggling with imposter syndrome in my CS classes.", likes: 15 },
    { content: "I finally understood recursion today!", likes: 23 },
    { content: "Sometimes I feel like I'm the only one who doesn't get it in class.", likes: 8 },
    { content: "Just pulled an all-nighter to finish my project. Was it worth it?", likes: 42 },
    { content: "I'm considering changing my major. This is harder than I thought.", likes: 19 },
  ])

  const runAnimation = useCallback(async () => {
    await contentControls.start("visible")
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Cycle through confessions
    for (let i = 0; i < confessions.length; i++) {
      setConfessions((prev) => {
        const newConfessions = [...prev]
        newConfessions.unshift(newConfessions.pop())
        return newConfessions
      })
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }

    await contentControls.start("hidden")

    setTimeout(() => {
      if (animationRef.current) {
        animationRef.current = requestAnimationFrame(runAnimation)
      }
    }, 1000)
  }, [contentControls, confessions])

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
        <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">Public Confessions</h3>
        <div className="space-y-2">
          {confessions.slice(0, 3).map((confession, index) => (
            <Confession key={index} content={confession.content} likes={confession.likes} />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

