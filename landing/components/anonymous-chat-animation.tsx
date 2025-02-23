"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, useAnimation } from "framer-motion"
import { Send } from "lucide-react"

const ChatMessage = ({ content, isUser }) => (
  <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
    <div
      className={`max-w-[80%] p-2 rounded ${isUser ? "bg-blue-500 text-white" : "bg-blue-100 dark:bg-blue-800 text-gray-800 dark:text-gray-200"}`}
    >
      <p className="text-xs">{content}</p>
    </div>
  </div>
)

export default function AnonymousChatAnimation() {
  const contentControls = useAnimation()
  const animationRef = useRef(null)
  const [messages, setMessages] = useState([])

  const runAnimation = useCallback(async () => {
    await contentControls.start("visible")
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setMessages([{ content: "Hi, I need help with calculus", isUser: true }])
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setMessages((prev) => [
      ...prev,
      { content: "Sure, I'd be happy to help! What specific topic are you struggling with?", isUser: false },
    ])
    await new Promise((resolve) => setTimeout(resolve, 2000))
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
        <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">Anonymous Chat</h3>
        <div className="space-y-2 mb-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} content={message.content} isUser={message.isUser} />
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-2 text-sm border rounded-l bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-blue-300 dark:border-blue-600"
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-r">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  )
}

