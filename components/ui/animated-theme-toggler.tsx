"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { flushSync } from "react-dom"

import { Moon, Sun } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"

type AnimatedThemeTogglerProps = {
  className?: string
}

export const AnimatedThemeToggler = ({
  className,
}: AnimatedThemeTogglerProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  // IMPORTANT:
  // Start the same on server and client to avoid hydration mismatch.
  const [mounted, setMounted] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const syncTheme = () => {
      setDarkMode(
        document.documentElement.classList.contains("dark")
      )
    }

    syncTheme()
    setMounted(true)

    const observer = new MutationObserver(syncTheme)

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  const onToggle = useCallback(async () => {
    const button = buttonRef.current
    if (!button) return

    const nextDarkMode = !darkMode

    // Start the browser View Transition.
    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setDarkMode(nextDarkMode)

        document.documentElement.classList.toggle(
          "dark",
          nextDarkMode
        )

        localStorage.setItem(
          "theme",
          nextDarkMode ? "dark" : "light"
        )
      })
    })

    await transition.ready

    // Measure the button AFTER the theme has been updated.
    const { left, top, width, height } =
      button.getBoundingClientRect()

    const centerX = left + width / 2
    const centerY = top + height / 2

    const maxDistance = Math.hypot(
      Math.max(centerX, window.innerWidth - centerX),
      Math.max(centerY, window.innerHeight - centerY)
    )

    // Circular reveal from the theme button.
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${centerX}px ${centerY}px)`,
          `circle(${maxDistance}px at ${centerX}px ${centerY}px)`,
        ],
      },
      {
        duration: 700,
        easing: "ease-in-out",
        fill: "forwards",
        pseudoElement: "::view-transition-new(root)",
      }
    )
  }, [darkMode])

  return (
    <button
      ref={buttonRef}
      onClick={onToggle}
      aria-label="Switch theme"
      className={cn(
        "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full p-2 outline-none focus:outline-none active:outline-none focus:ring-0",
        className
      )}
      type="button"
    >
      {mounted && (
        <AnimatePresence mode="wait" initial={false}>
          {darkMode ? (
            <motion.span
              key="sun-icon"
              initial={{
                opacity: 0,
                scale: 0.55,
                rotate: 25,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.33,
              }}
              className="text-white"
            >
              <Sun />
            </motion.span>
          ) : (
            <motion.span
              key="moon-icon"
              initial={{
                opacity: 0,
                scale: 0.55,
                rotate: -25,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.33,
              }}
              className="text-black"
            >
              <Moon />
            </motion.span>
          )}
        </AnimatePresence>
      )}
    </button>
  )
}