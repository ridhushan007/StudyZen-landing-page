"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import ProgressTrackerAnimation from "./progress-tracker-animation"
import JournalPageAnimation from "./journal-page-animation"
import PublicConfessionAnimation from "./public-confession-animation"
import QuizManagementAnimation from "./quiz-management-animation"
import AnonymousChatAnimation from "./anonymous-chat-animation"

const FeatureSection = ({ title, description, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mb-12">
      <motion.div className="bg-white p-6 rounded-lg shadow-md cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold text-indigo-600">{title}</h3>
          <ChevronDown
            className={`w-6 h-6 text-gray-500 transition-transform ${isOpen ? "transform rotate-180" : ""}`}
          />
        </div>
        <p className="mt-2 text-gray-600">{description}</p>
      </motion.div>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="pt-6">{children}</div>
      </motion.div>
    </div>
  )
}

export default function StudyZenLandingPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-indigo-600 mb-8">Welcome to StudyZen</h1>
        <p className="text-xl text-center text-gray-600 mb-16">
          Elevate your learning experience with our comprehensive study tools and features.
        </p>

        <FeatureSection
          title="Progress Tracker"
          description="Monitor your advancement in various subjects and set goals."
        >
          <ProgressTrackerAnimation />
        </FeatureSection>

        <FeatureSection
          title="Study Journal"
          description="Maintain a personal log of your learning experiences and reflections."
        >
          <JournalPageAnimation />
        </FeatureSection>

        <FeatureSection
          title="Public Confessions"
          description="Share your thoughts and experiences anonymously with fellow students."
        >
          <PublicConfessionAnimation />
        </FeatureSection>

        <FeatureSection
          title="Quiz Management"
          description="Create, attempt, and review quizzes to reinforce your learning."
        >
          <QuizManagementAnimation />
        </FeatureSection>

        <FeatureSection title="Anonymous Chat" description="Connect with other students for discussions and support.">
          <AnonymousChatAnimation />
        </FeatureSection>
      </div>
    </div>
  )
}

