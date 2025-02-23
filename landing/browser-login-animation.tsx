"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const BrowserFrame = ({ children }) => (
  <div className="w-full max-w-3xl mx-auto overflow-hidden rounded-lg shadow-lg bg-white">
    <div className="h-8 bg-gray-100 flex items-center px-4 space-x-2">
      <div className="w-3 h-3 rounded-full bg-red-400" />
      <div className="w-3 h-3 rounded-full bg-yellow-400" />
      <div className="w-3 h-3 rounded-full bg-green-400" />
    </div>
    <div className="p-4 bg-blue-50">{children}</div>
  </div>
)

const Cursor = ({ x, y }) => (
  <motion.div
    className="w-4 h-4 border-2 border-gray-800 border-r-transparent rotate-45 absolute z-50"
    style={{ left: x, top: y }}
  />
)

export default function BrowserLoginAnimation() {
  const [step, setStep] = useState(0)

  const cursorVariants = {
    initial: { x: 0, y: 0 },
    login: { x: 280, y: 80, transition: { duration: 1 } },
    form: { x: 200, y: 200, transition: { duration: 0.5 } },
  }

  const formVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  }

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  }

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center p-4">
      <BrowserFrame>
        <motion.div className="relative h-96">
          <motion.div initial="initial" animate={step > 0 ? "login" : "initial"} variants={cursorVariants}>
            <Cursor />
          </motion.div>

          {step === 0 && (
            <motion.div
              className="absolute top-16 left-64"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep(1)}
              >
                Login
              </motion.button>
            </motion.div>
          )}

          <motion.div
            className="absolute inset-0 bg-white p-8"
            initial="hidden"
            animate={step >= 1 ? "visible" : "hidden"}
            variants={formVariants}
          >
            <h2 className="text-2xl font-bold mb-4 text-blue-600">Login</h2>
            <input className="w-full p-2 mb-4 border rounded" placeholder="Username" type="text" />
            <input className="w-full p-2 mb-4 border rounded" placeholder="Password" type="password" />
            <motion.button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep(2)}
            >
              Submit
            </motion.button>
          </motion.div>

          <motion.div
            className="absolute inset-0 bg-white p-8"
            initial="hidden"
            animate={step === 2 ? "visible" : "hidden"}
            variants={contentVariants}
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
            initial="hidden"
            animate={step === 2 ? "visible" : "hidden"}
            variants={contentVariants}
            transition={{ delay: 2 }}
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4 text-blue-600">Start Your Free Trial Today</h2>
              <motion.button
                className="px-6 py-3 bg-blue-500 text-white rounded-lg text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </BrowserFrame>
    </div>
  )
}

