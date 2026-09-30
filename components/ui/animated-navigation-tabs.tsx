"use client"

import { useState } from "react"
import { motion } from "motion/react"
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
  const [active, setActive] = useState(items[0]?.id)
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <nav aria-label="Main navigation">
      <ul className="flex items-center gap-1">
        {items.map((item) => {
          const isActive = active === item.id
          const isHovered = hovered === item.id

          return (
            <li key={item.id}>
              <a
                href={item.href}
                onClick={() => setActive(item.id)}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                className={cn(
                  "relative block overflow-hidden rounded-md px-3 py-2 text-sm transition-colors duration-300",
                  isActive
                    ? "text-[var(--fg)]"
                    : "text-[var(--mute)] hover:text-[var(--fg)]"
                )}
              >
                {/* Sliding hover background */}
                {isHovered && (
                  <motion.span
                    layoutId="nav-hover"
                    className="absolute inset-0 rounded-md bg-[var(--hover)]"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 35,
                      mass: 0.7,
                    }}
                  />
                )}

                {/* Sliding active underline */}
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

                <span className="relative z-10">{item.label}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}