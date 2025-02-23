"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, useAnimation, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Moon, Sun, Brain, Users2, TrendingUp, Instagram, MessageCircle, Linkedin } from "lucide-react"
import ProgressTrackerAnimation from "./progress-tracker-animation"
import JournalPageAnimation from "./journal-page-animation"
import PublicConfessionAnimation from "./public-confession-animation"
import QuizManagementAnimation from "./quiz-management-animation"
import AnonymousChatAnimation from "./anonymous-chat-animation"
import { MousePointer2 } from "@/components/ui/icons"
import ScatteredIcons from "@/components/scattered-icons"
import WavyBackground from "@/components/wavy-background"
import Image from "next/image"

const BrowserFrame = ({ children }) => (
  <div className="w-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-800">
    <div className="h-8 bg-gray-100 dark:bg-gray-700 flex items-center px-4 space-x-2">
      <div className="w-3 h-3 rounded-full bg-red-400" />
      <div className="w-3 h-3 rounded-full bg-yellow-400" />
      <div className="w-3 h-3 rounded-full bg-green-400" />
    </div>
    <div className="flex bg-gray-50 dark:bg-gray-900">
      <div className="w-16 bg-blue-800 dark:bg-blue-900 p-2 flex flex-col items-center">
        <div className="text-white heading-mono text-xl mb-4">SZ</div>
        <div className="space-y-4 mt-4">
          <div className="w-8 h-8 bg-blue-700 dark:bg-blue-800 rounded-lg mx-auto" />
          <div className="w-8 h-8 bg-blue-600 dark:bg-blue-700 rounded-lg mx-auto" />
          <div className="w-8 h-8 bg-blue-600 dark:bg-blue-700 rounded-lg mx-auto" />
          <div className="w-8 h-8 bg-blue-600 dark:bg-blue-700 rounded-lg mx-auto" />
        </div>
      </div>
      <div className="flex-1 p-4 relative">{children}</div>
    </div>
  </div>
)

const FeatureSection = ({ title, description, icon, children, isReversed }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100])

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 100 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      style={{ opacity, scale, y }}
      className={`flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 mb-20`}
    >
      <motion.div variants={itemVariants} className="flex-1 space-y-4">
        <motion.div
          className="flex items-center gap-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Image src={icon || "/placeholder.svg"} alt={title} width={32} height={32} className="w-8 h-8" />
          <h3 className="text-3xl font-bold heading-mono mb-2 feature-title">{title}</h3>
        </motion.div>
        <motion.p
          className="text-black bg-white/80 font-mono text-lg p-4 rounded-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {description}
        </motion.p>
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="flex-1"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <BrowserFrame>
          <div className="relative h-64">
            {children}
            <motion.div
              className="absolute z-10 drop-shadow-lg"
              animate={{
                x: [20, 280, 20],
                y: [20, 180, 20],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <MousePointer2 size={36} className="text-blue-600 dark:text-blue-400" />
            </motion.div>
          </div>
        </BrowserFrame>
      </motion.div>
    </motion.div>
  )
}

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = featureTitleStyle
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  useEffect(() => {
    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)
    return () => {
      document.head.removeChild(link)
    }
  }, [])

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -64 // Adjust this value based on your header height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-blue-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 relative">
      <WavyBackground />
      <ScatteredIcons />
      <div className="grain-overlay" />
      <header
        className={`px-4 lg:px-6 h-16 flex items-center fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md" : ""
        }`}
      >
        <Link className="flex items-center justify-center" href="#" onClick={(e) => handleSmoothScroll(e, "home")}>
          <div className="relative w-10 h-10 mr-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/book-Y8AjG7ZMNLHlyI10HWSQ3VLGJLJskX.png"
              alt="StudyZen Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>

          <span
            className="text-4xl font-bold text-[#00A3FF]"
            style={{
              fontFamily: "'Fredoka One', cursive",
              letterSpacing: "-0.02em",
              transform: "rotate(-2deg)",
            }}
          >
            StudyZen
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 font-mono">
          <Link
            className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            href="#home"
            onClick={(e) => handleSmoothScroll(e, "home")}
          >
            Home
          </Link>
          <Link
            className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            href="#about"
            onClick={(e) => handleSmoothScroll(e, "about")}
          >
            About
          </Link>
          <Link
            className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            href="#features"
            onClick={(e) => handleSmoothScroll(e, "features")}
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, "contact")}
          >
            Contact
          </Link>
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="text-sm font-medium">
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </nav>
      </header>
      <main className="flex-1 pt-16 relative z-10">
        <section id="home" className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/istockphoto-2162620090-640_adpp_is.mp4_1740122085245-0MWaTIwxii9CFRozs3MCAJYugbL71Y.mp4"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 via-blue-600/40 to-blue-500/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl heading-mono tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white font-mono">
                  Unlock Your Study Potential with StudyZen
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl font-mono">
                  Leverage innovative study tools to maximize your learning capacity, boost productivity, and achieve
                  your academic goals with confidence.
                </p>
              </div>
              <div className="space-x-4 font-mono">
                <Button className="bg-blue-600/90 hover:bg-blue-700 text-white backdrop-blur-sm">Get Started</Button>
                <Button
                  variant="outline"
                  className="bg-white/10 hover:bg-white/20 text-white border-white backdrop-blur-sm"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl heading-mono tracking-tighter sm:text-5xl text-center mb-12 text-blue-600 dark:text-blue-400 font-mono">
              Key Features
            </h2>
            <div className="space-y-20">
              <FeatureSection
                title="Progress Tracker"
                description="Visualize your academic journey with interactive charts and graphs, helping you identify areas for improvement and celebrate your achievements."
                icon="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/progress-Hg5JpVgL2xWXVsmTfgpCqv9J4X4hWd.png"
                isReversed={false}
              >
                <ProgressTrackerAnimation />
              </FeatureSection>
              <FeatureSection
                title="Student Reflection Journal"
                description="Cultivate self-awareness and track your personal growth with our digital journaling tool, complete with prompts and mood tracking."
                icon="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/journal-cX4h0W3kHsvYb2xGPVUWqqoTZlaPZh.png"
                isReversed={true}
              >
                <JournalPageAnimation />
              </FeatureSection>
              <FeatureSection
                title="Quiz Management"
                description="Test your knowledge and reinforce learning with our adaptive quizzing system, featuring a vast database of questions across various subjects."
                icon="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/quizz-9vtqACUq3zTAGJV5T1ggMt4AMN4yUh.png"
                isReversed={false}
              >
                <QuizManagementAnimation />
              </FeatureSection>
              <FeatureSection
                title="Anonymous Chat"
                description="Connect with peers and seek advice without revealing your identity, fostering open and honest communication within the student community."
                icon="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chat-UPmFfR0h20FWdDya7pr112GDba2WbH.png"
                isReversed={true}
              >
                <AnonymousChatAnimation />
              </FeatureSection>
              <FeatureSection
                title="Public Confessions"
                description="Share your thoughts, struggles, and triumphs anonymously with the StudyZen community, creating a supportive and understanding environment for all students."
                icon="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/confession-Jh0nt2q9uBguvBB4jpnuYZajafdUJu.png"
                isReversed={false}
              >
                <PublicConfessionAnimation />
              </FeatureSection>
            </div>
          </div>
        </section>
        <section
          id="why-choose-us"
          className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white dark:from-blue-900 dark:to-gray-900 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid-blue-500/[0.02] dark:bg-grid-blue-400/[0.02]" />
          <div className="container px-4 md:px-6 mx-auto relative">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl heading-mono tracking-tighter text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600 font-mono"
            >
              Why Choose StudyZen?
            </motion.h2>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto font-mono"
            >
              {[
                {
                  icon: Brain,
                  image: {
                    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pngtree-children-learning-on-laptops-together-png-image_14702374-removebg-preview-LACa5lN3DcCVztz1qcqpFSs2KtYKJn.png",
                    alt: "Stress-Free Studying",
                  },
                  title: "Stress-Free Studying",
                  description:
                    "Experience a calming approach to learning with our intuitive tools and supportive environment.",
                },
                {
                  icon: Users2,
                  image: {
                    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/student-community-illustration-download-in-svg-png-gif-file-formats--college-students-communicating-school-education-illustrations-3444300-JZDBwop59LfYnf6LTZwYYzAhxUm5cd.png",
                    alt: "Empowered Learning Community",
                  },
                  title: "Empowered Community",
                  description: "Join a vibrant community of learners who support and inspire each other.",
                },
                {
                  icon: TrendingUp,
                  image: {
                    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/png-transparent-concept-of-man-got-success-and-achieving-goal-illustration-thumbnail-removebg-preview-vMYf4OAkRFxxuJVW94YkBDQ11xQDnm.png",
                    alt: "Personal Growth and Development",
                  },
                  title: "Personal Growth",
                  description: "Track your progress, celebrate achievements, and witness your personal development.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        type: "spring",
                        damping: 15,
                        stiffness: 100,
                      },
                    },
                  }}
                  className="group"
                >
                  <Card className="overflow-hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-blue-200 dark:border-blue-700 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 h-full max-w-xs mx-auto">
                    <CardContent className="p-3 flex flex-col h-full">
                      <div className="relative h-32 mb-2 overflow-hidden rounded-lg bg-gradient-to-br from-blue-500/5 to-blue-500/10 group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-transparent to-blue-500/10 group-hover:opacity-70 transition-opacity duration-300" />
                        <Image
                          src={item.image.src || "/placeholder.svg"}
                          alt={item.image.alt}
                          fill
                          style={{ objectFit: "contain" }}
                          className="transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <motion.div
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1.1 }}
                            className="bg-blue-600 text-white p-2 rounded-full"
                          >
                            <item.icon size={20} />
                          </motion.div>
                        </div>
                      </div>
                      <h3 className="text-sm heading-mono text-blue-600 dark:text-blue-400 mb-1 group-hover:text-blue-500 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-300 flex-grow group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300 font-mono">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        <section
          id="about"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
          <div className="container px-4 md:px-6 mx-auto relative">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-blue-600 dark:text-blue-400">
              About StudyZen
            </h2>
            <p className="max-w-[700px] text-gray-700 dark:text-gray-300 mx-auto text-center mb-12">
              StudyZen is a revolutionary study companion designed to empower students in their academic journey. Our
              platform combines innovative tools with a supportive community to help you achieve your educational goals.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Our Mission</h3>
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  To provide students with the tools and support they need to excel in their studies, manage their time
                  effectively, and cultivate a growth mindset.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Our Vision</h3>
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  To create a world where every student has access to personalized, effective study tools that unlock
                  their full potential and foster a lifelong love of learning.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50 dark:bg-blue-900 font-mono">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl heading-mono tracking-tighter sm:text-5xl text-blue-600 dark:text-blue-400">
                  Be Among the First to Transform Your Study Habits
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-300 md:text-xl font-mono">
                  StudyZen is launching soon! Join our waitlist to get early access and be part of the revolution in
                  student productivity.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600">
                  Join Waitlist
                </Button>
                <Button
                  variant="outline"
                  className="text-blue-600 border-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-900"
                >
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer
        id="contact"
        className="w-full bg-white dark:bg-gray-800 border-t border-blue-200 dark:border-blue-800 py-12 px-4 md:px-6 relative z-10 font-mono"
      >
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">About StudyZen</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              StudyZen is your all-in-one study companion, designed to boost productivity and help you achieve your
              academic goals.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="#home"
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={(e) => handleSmoothScroll(e, "home")}
              >
                Home
              </Link>
              <Link
                href="#about"
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={(e) => handleSmoothScroll(e, "about")}
              >
                About
              </Link>
              <Link
                href="#features"
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={(e) => handleSmoothScroll(e, "features")}
              >
                Features
              </Link>
              <Link
                href="#contact"
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={(e) => handleSmoothScroll(e, "contact")}
              >
                Contact
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Contact Us</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Email: info@studyzen.com
              <br />
              Phone: +94 11 234 5678
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/_studyzen_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://wa.me/94112345678"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <MessageCircle size={24} />
              </a>
              <a
                href="https://www.linkedin.com/company/studyzen"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-blue-200 dark:border-blue-800">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-600 dark:text-gray-400">© 2025 StudyZen. All rights reserved.</p>
            <nav className="flex gap-4 sm:gap-6 mt-4 md:mt-0">
              <Link
                className="text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                href="#"
              >
                Terms of Service
              </Link>
              <Link
                className="text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                href="#"
              >
                Privacy Policy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}

const featureTitleStyle = `
.feature-title {
  color: #2563eb;
  position: relative;
  display: inline-block;
}

.feature-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 100%;
  height: 2px;
  background-color: #2563eb;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.feature-title:hover::after {
  transform: scaleX(1);
}

.dark .feature-title {
  color: #60a5fa;
}

.dark .feature-title::after {
  background-color: #60a5fa;
}

.font-agbalumo {
  font-family: 'Agbalumo', cursive;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
`

