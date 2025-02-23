"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { LayoutDashboard, TrendingUp, MessageCircle, BookOpen, MessageSquare, Book, ChevronRight } from "lucide-react"

const Sidebar = ({ children }) => (
  <div className="w-64 h-full bg-indigo-800 text-white p-4 flex flex-col">
    <h1 className="text-2xl font-bold mb-8">Study Zen</h1>
    {children}
  </div>
)

const SidebarItem = ({ icon: Icon, label, isActive }) => (
  <div className={`flex items-center space-x-2 p-2 rounded ${isActive ? "bg-indigo-700" : "hover:bg-indigo-700"}`}>
    <Icon size={20} />
    <span>{label}</span>
    {isActive && <ChevronRight className="ml-auto" size={16} />}
  </div>
)

const Cursor = ({ control }) => (
  <motion.div
    className="w-4 h-4 border-2 border-gray-800 border-r-transparent rotate-45 absolute z-50"
    animate={control}
  />
)

const InsightCard = ({ title, value, color }) => (
  <div className={`bg-${color}-100 p-4 rounded-lg`}>
    <h3 className={`text-${color}-800 font-semibold`}>{title}</h3>
    <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
  </div>
)

export default function StudyZenAnimation() {
  const cursorControls = useAnimation()
  const contentControls = useAnimation()

  const runAnimation = async () => {
    // Move cursor to dashboard item
    await cursorControls.start({ x: 100, y: 120, transition: { duration: 1 } })
    await new Promise((resolve) => setTimeout(resolve, 500)) // Pause

    // Click effect
    await cursorControls.start({ scale: 0.8, transition: { duration: 0.1 } })
    await cursorControls.start({ scale: 1, transition: { duration: 0.1 } })

    // Show dashboard content
    await contentControls.start("dashboard")
    await new Promise((resolve) => setTimeout(resolve, 4000)) // Show dashboard for 4 seconds

    // Reset animation
    await contentControls.start("initial")
    await cursorControls.start({ x: 0, y: 0, transition: { duration: 1 } })

    // Restart animation after a delay
    setTimeout(() => runAnimation(), 2000)
  }

  useEffect(() => {
    runAnimation()
  }, []) // Updated dependency array

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar>
        <SidebarItem icon={LayoutDashboard} label="Dashboard" isActive={true} />
        <SidebarItem icon={TrendingUp} label="Progress" />
        <SidebarItem icon={MessageCircle} label="Confessions" />
        <SidebarItem icon={BookOpen} label="Quiz" />
        <SidebarItem icon={MessageSquare} label="Chat" />
        <SidebarItem icon={Book} label="Journal" />
      </Sidebar>
      <div className="flex-1 p-8 relative">
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
            <InsightCard title="Tasks Completed" value="12/15" color="yellow" />
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
  )
}

