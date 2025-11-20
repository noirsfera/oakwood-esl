"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

interface BentoTiltProps {
  children: React.ReactNode
  className?: string
}

export const BentoTilt = ({ children, className = "" }: BentoTiltProps) => {
  const [transform, setTransform] = useState("")
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -5
    const rotateY = ((x - centerX) / centerX) * 5

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`)
  }

  const handleMouseLeave = () => {
    setTransform("")
  }

  return (
    <div
      ref={cardRef}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}

interface BentoCardProps {
  src: string | string[]
  isImage: boolean
  title: string
  description: string
}

export const BentoCard = ({ src, isImage, title, description }: BentoCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = Array.isArray(src) ? src : [src]

  useEffect(() => {
    if (isImage && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isImage, images.length])

  return (
    <div className="relative h-full w-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 group">
      {/* Media Content */}
      <div className="absolute inset-0">
        {isImage ? (
          images.map((image, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{ opacity: currentImageIndex === index ? 1 : 0 }}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))
        ) : (
          <video
            src={src as string}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Text Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transform transition-transform duration-300">
        <h3 className="text-white text-xl md:text-2xl font-bold mb-2 text-balance leading-tight">
          {title}
        </h3>
        <p className="text-white/80 text-sm md:text-base leading-relaxed">
          {description}
        </p>
      </div>

      {/* Image indicator dots */}
      {isImage && images.length > 1 && (
        <div className="absolute top-4 right-4 flex gap-1.5">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                currentImageIndex === index ? "bg-white w-4" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
