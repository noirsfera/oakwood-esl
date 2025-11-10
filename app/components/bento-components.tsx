"use client"

import type React from "react"

import { useState, useRef, type MouseEvent } from "react"
import { ArrowRight } from "lucide-react"

type BentoTiltProps = {
  children: React.ReactNode
  className?: string
}

export const BentoTilt = ({ children, className = "" }: BentoTiltProps) => {
  const [transformStyle, setTransformStyle] = useState<string>("")
  const itemRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return

    const { left, top, width, height } = itemRef.current.getBoundingClientRect()

    const relativeX = (event.clientX - left) / width
    const relativeY = (event.clientY - top) / height

    const tiltX = (relativeY - 0.5) * 5
    const tiltY = (relativeX - 0.5) * -5

    setTransformStyle(`perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`)
  }

  const handleMouseLeave = () => setTransformStyle("")

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle, transition: "transform 0.3s ease-out" }}
    >
      {children}
    </div>
  )
}

type BentoCardProps = {
  src: string
  title: string
  description?: string
  isImage?: boolean
}

export const BentoCard = ({ src, title, description, isImage = false }: BentoCardProps) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [hoverOpacity, setHoverOpacity] = useState(0)
  const hoverButtonRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!hoverButtonRef.current) return
    const rect = hoverButtonRef.current.getBoundingClientRect()

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    })
  }

  const handleMouseEnter = () => setHoverOpacity(1)
  const handleMouseLeave = () => setHoverOpacity(0)

  return (
    <div className="relative size-full overflow-hidden rounded-lg">
      {isImage ? (
        <img src={src} alt={title} className="absolute left-0 top-0 size-full object-cover object-center" />
      ) : (
        <video src={src} loop muted autoPlay className="absolute left-0 top-0 size-full object-cover object-center" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      <div className="relative z-10 flex size-full flex-col justify-between p-6 text-white">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
          {description && <p className="text-sm md:text-base text-white/90 max-w-xs">{description}</p>}
        </div>

        <div
          ref={hoverButtonRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="flex w-fit cursor-pointer items-center gap-2 relative overflow-hidden rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-sm uppercase text-white border border-white/30 hover:border-white/60 transition"
        >
          <div
            className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
            style={{
              opacity: hoverOpacity,
              background: `radial-gradient(80px circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(255,255,255,0.3), transparent)`,
            }}
          />
          <a href="/courses">
            <span className="relative z-20">Learn More</span>
          </a>
          <ArrowRight className="relative z-20 w-4 h-4" />
        </div>
      </div>
    </div>
  )
}
