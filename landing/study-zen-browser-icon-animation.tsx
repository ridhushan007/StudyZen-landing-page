"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  TrendingUp,
  MessageCircle,
  BookOpen,
  MessageSquare,
  Book,
  X,
  MousePointer2,
} from "lucide-react"

const BrowserFrame = ({ children }) => (
  <div className="w-full max-w-5xl mx-auto overflow-hidden rounded-lg shadow-lg bg-white">
    <div className="h-8 bg-gray-100 flex items-center px-4 space-x-2">
      <div className="w-3 h-3 rounded-full bg-red-400" />
      <div className="w-3 h-3 rounded-full bg-yellow-400" />
      <div className="w-3 h-3 rounded-full bg-green-400" />
    </div>
    <div className="p-4 bg-gray-50">{children}</div>
  </div>
)

const Sidebar = ({ children }) => (
  <div className="w-16 h-[calc(100vh-8rem)] bg-indigo-800 text-white p-2 flex flex-col items-center rounded-l-lg">
    <h1 className="text-2xl font-bold mb-8">SZ</h1>
    {children}
  </div>
)

const SidebarItem = ({ icon: Icon, isActive }) => (
  <div className={`p-2 rounded-lg mb-4 ${isActive ? "bg-indigo-700" : "hover:bg-indigo-700"}`}>
    <Icon size={24} />
  </div>
)

const Cursor = ({ control }) => (
  <motion.div className="absolute z-50" animate={control}>
    <MousePointer2 size={24} className="text-gray-800" />
  </motion.div>
)

const InsightCard = ({ title, value, color, onClick }) => (
  <motion.div
    className={`bg-${color}-100 p-4 rounded-lg cursor-pointer`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    <h3 className={`text-${color}-800 font-semibold`}>{title}</h3>
    <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
  </motion.div>
)

const TasksPopup = ({ onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.15 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.15 }}
      className="bg-white p-6 rounded-lg shadow-xl w-96"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Tasks Completed</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>
      <ul className="space-y-2">
        <li className="flex items-center">
          <input type="checkbox" checked readOnly className="mr-2" />
          <span>Complete Python basics quiz</span>
        </li>
        <li className="flex items-center">
          <input type="checkbox" checked readOnly className="mr-2" />
          <span>Write essay on machine learning</span>
        </li>
        <li className="flex items-center">
          <input type="checkbox" checked readOnly className="mr-2" />
          <span>Review calculus formulas</span>
        </li>
        <li className="flex items-center">
          <input type="checkbox" checked={false} readOnly className="mr-2" />
          <span>Finish reading chapter 5</span>
        </li>
        <li className="flex items-center">
          <input type="checkbox" checked={false} readOnly className="mr-2" />
          <span>Prepare for tomorrow's presentation</span>
        </li>
      </ul>
    </motion.div>
  </motion.div>
)

export default function StudyZenBrowserIconAnimation() {
  const cursorControls = useAnimation()
  const contentControls = useAnimation()
  const animationRef = useRef(null)
  const [showTasksPopup, setShowTasksPopup] = useState(false)
  const [isBlurred, setIsBlurred] = useState(false)

  const runAnimation = async () => {
    // Move cursor to dashboard icon
    await cursorControls.start({ x: 20, y: 130, transition: { duration: 0.3 } })
    await new Promise((resolve) => setTimeout(resolve, 200)) // Pause

    // Click effect on dashboard icon
    await cursorControls.start({ scale: 0.9, transition: { duration: 0.1 } })
    await cursorControls.start({ scale: 1, transition: { duration: 0.1 } })

    // Show dashboard content
    await contentControls.start("dashboard")
    await new Promise((resolve) => setTimeout(resolve, 800)) // Show dashboard for 0.8 seconds

    // Move cursor to Tasks Completed card
    await cursorControls.start({ x: 340, y: 240, transition: { duration: 0.3 } })
    await new Promise((resolve) => setTimeout(resolve, 200)) // Pause

    // Click effect on Tasks Completed card
    await cursorControls.start({ scale: 0.9, transition: { duration: 0.1 } })
    await cursorControls.start({ scale: 1, transition: { duration: 0.1 } })

    // Show Tasks Completed popup
    setIsBlurred(true)
    setShowTasksPopup(true)
    await new Promise((resolve) => setTimeout(resolve, 1500)) // Show popup for 1.5 seconds

    // Close popup
    setShowTasksPopup(false)
    setIsBlurred(false)

    // Reset animation
    await contentControls.start("initial")
    await cursorControls.start({ x: 0, y: 0, transition: { duration: 1 } })

    // Restart animation after a delay
    setTimeout(() => {
      if (animationRef.current) {
        animationRef.current = requestAnimationFrame(runAnimation)
      }
    }, 800)
  }

  useEffect(() => {
    animationRef.current = requestAnimationFrame(runAnimation)
    return () => cancelAnimationFrame(animationRef.current)
  }, []) // Removed runAnimation from dependencies

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <BrowserFrame>
        <div className="flex bg-white rounded-lg shadow-inner">
          <Sidebar>
            <SidebarItem icon={LayoutDashboard} isActive={true} />
            <SidebarItem icon={TrendingUp} />
            <SidebarItem icon={MessageCircle} />
            <SidebarItem icon={BookOpen} />
            <SidebarItem icon={MessageSquare} />
            <SidebarItem icon={Book} />
          </Sidebar>
          <div className={`flex-1 p-8 relative transition-all duration-300 ${isBlurred ? "blur-sm" : ""}`}>
            <Cursor control={cursorControls} />
            <motion.div
              initial="initial"
              animate={contentControls}
              variants={{
                initial: { opacity: 0 },
                dashboard: { opacity: 1 },
              }}
            >
              <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
              <div className="grid grid-cols-2 gap-6">
                <InsightCard title="Study Hours" value="24.5" color="blue" />
                <InsightCard title="Quiz Score" value="85%" color="green" />
                <InsightCard
                  title="Tasks Completed"
                  value="12/15"
                  color="yellow"
                  onClick={() => setShowTasksPopup(true)}
                />
                <InsightCard title="Streak" value="7 days" color="red" />
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
                <ul className="space-y-2">
                  <li>Completed Python Basics Quiz</li>
                  <li>Logged 2 hours of study time</li>
                  <li>Added new entry to study journal</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </BrowserFrame>
      <AnimatePresence>{showTasksPopup && <TasksPopup onClose={() => setShowTasksPopup(false)} />}</AnimatePresence>
    </div>
  )
}

