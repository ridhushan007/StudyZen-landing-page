"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"

const BrowserFrame = ({ children }) => (
  <div className="w-full max-w-3xl mx-auto overflow-hidden rounded-lg shadow-lg bg-white">
    <div className="h-8 bg-gray-100 flex items-center px-4 space-x-2">
      <div className="w-3 h-3 rounded-full bg-red-400" />
      <div className="w-3 h-3 rounded-full bg-yellow-400" />
      <div className="w-3 h-3 rounded-full bg-green-400" />
    </div>
    <div className="p-4 bg-blue-50 h-96 relative">{children}</div>
  </div>
)

const Cursor = ({ control }) => (
  <motion.div
    className="w-4 h-4 border-2 border-gray-800 border-r-transparent rotate-45 absolute z-50"
    animate={control}
  />
)

export default function AutoBrowserLoginAnimation() {
  const cursorControls = useAnimation()
  const contentControls = useAnimation()

  const runAnimation = async () => {
    // Move cursor to login button
    await cursorControls.start({ x: 280, y: 80, transition: { duration: 1 } })
    await new Promise((resolve) => setTimeout(resolve, 500)) // Pause

    // Click effect
    await cursorControls.start({ scale: 0.8, transition: { duration: 0.1 } })
    await cursorControls.start({ scale: 1, transition: { duration: 0.1 } })

    // Show login form
    await contentControls.start("loginForm")
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Pause

    // Move cursor to input fields and simulate typing
    await cursorControls.start({ x: 100, y: 150, transition: { duration: 0.5 } })
    await new Promise((resolve) => setTimeout(resolve, 500)) // Pause for typing

    await cursorControls.start({ x: 100, y: 200, transition: { duration: 0.5 } })
    await new Promise((resolve) => setTimeout(resolve, 500)) // Pause for typing

    // Move cursor to submit button
    await cursorControls.start({ x: 100, y: 250, transition: { duration: 0.5 } })
    await new Promise((resolve) => setTimeout(resolve, 500)) // Pause

    // Click effect
    await cursorControls.start({ scale: 0.8, transition: { duration: 0.1 } })
    await cursorControls.start({ scale: 1, transition: { duration: 0.1 } })

    // Show dashboard
    await contentControls.start("dashboard")
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Pause to show dashboard

    // Show call-to-action
    await contentControls.start("cta")

    // Reset animation after a delay
    setTimeout(() => runAnimation(), 5000)
  }

  useEffect(() => {
    runAnimation()
  }, []) // Removed runAnimation from the dependency array

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center p-4">
      <BrowserFrame>
        <Cursor control={cursorControls} />

        <motion.div
          className="absolute inset-0"
          initial="initial"
          animate={contentControls}
          variants={{
            initial: { opacity: 1 },
            loginForm: { opacity: 0 },
            dashboard: { opacity: 0 },
            cta: { opacity: 0 },
          }}
        >
          <div className="absolute top-16 left-64">
            <button className="px-4 py-2 bg-blue-500 text-white rounded">Login</button>
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 bg-white p-8"
          initial={{ x: "100%", opacity: 0 }}
          animate={contentControls}
          variants={{
            initial: { x: "100%", opacity: 0 },
            loginForm: { x: 0, opacity: 1 },
            dashboard: { x: "-100%", opacity: 0 },
            cta: { x: "-100%", opacity: 0 },
          }}
        >
          <h2 className="text-2xl font-bold mb-4 text-blue-600">Login</h2>
          <input className="w-full p-2 mb-4 border rounded" placeholder="Username" type="text" />
          <input className="w-full p-2 mb-4 border rounded" placeholder="Password" type="password" />
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
        </motion.div>

        <motion.div
          className="absolute inset-0 bg-white p-8"
          initial={{ x: "100%", opacity: 0 }}
          animate={contentControls}
          variants={{
            initial: { x: "100%", opacity: 0 },
            loginForm: { x: "100%", opacity: 0 },
            dashboard: { x: 0, opacity: 1 },
            cta: { x: "-100%", opacity: 0 },
          }}
        >
          <h2 className="text-2xl font-bold mb-4 text-blue-600">Dashboard</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-100 p-4 rounded">
              <h3 className="font-semibold">Total Users</h3>
              <p className="text-2xl">1,234</p>
            </div>
            <div className="bg-green-100 p-4 rounded">
              <h3 className="font-semibold">Revenue</h3>
              <p className="text-2xl">$5,678</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 bg-white p-8 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={contentControls}
          variants={{
            initial: { opacity: 0 },
            loginForm: { opacity: 0 },
            dashboard: { opacity: 0 },
            cta: { opacity: 1 },
          }}
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-blue-600">Start Your Free Trial Today</h2>
            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg text-lg">Get Started</button>
          </div>
        </motion.div>
      </BrowserFrame>
    </div>
  )
}

