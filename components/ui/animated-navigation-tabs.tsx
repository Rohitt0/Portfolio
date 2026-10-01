"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

type NavItem = {
  id: string
  label: string
  href: string
}

type AnimatedNavigationTabsProps = {
  items: NavItem[]
}

export function AnimatedNavigationTabs({
  items,
}: AnimatedNavigationTabsProps) {
  const pathname = usePathname()
  const [hovered, setHovered] = useState<string | null>(null)

  // Determine the active tab from the current URL.
  const getActiveId = () => {
    if (pathname === "/") return "home"
    if (pathname.startsWith("/projects")) return "projects"
    if (pathname.startsWith("/blog")) return "blog"
    return null
  }

  const activeId = getActiveId()

  return (
    <nav aria-label="Main navigation">
      <ul className="flex items-center gap-1">
        {items.map((item) => {
          const isActive = activeId === item.id
          const isHovered = hovered === item.id

          return (
            <li key={item.id}>
              <a
                href={item.href}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                className={cn(
                  "relative block overflow-hidden rounded-md px-3 py-2 text-sm transition-colors duration-200",
                  isActive
                    ? "text-[var(--fg)]"
                    : "text-[var(--mute)] hover:text-[var(--fg)]"
                )}
              >
                {/* Hover background */}
                {isHovered && (
                  <motion.span
                    layoutId="nav-hover-bg"
                    className="absolute inset-0 rounded-md bg-[var(--hover)]"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 35,
                      mass: 0.7,
                    }}
                  />
                )}

                {/* Current page underline */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute bottom-0 left-2 right-2 h-px bg-[var(--fg)]"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 35,
                      mass: 0.7,
                    }}
                  />
                )}

                {/* Hover underline */}
                {isHovered && !isActive && (
                  <motion.span
                    layoutId="nav-hover-line"
                    className="absolute bottom-0 left-2 right-2 h-px bg-[var(--fg)]"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 35,
                      mass: 0.7,
                    }}
                  />
                )}

                <span className="relative z-10">
                  {item.label}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}