"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const images = [
  "/assets/photo_2025-11-09_11-30-03.webp",
  "/assets/photo_2025-11-09_11-30-37.webp",
  "/assets/photo_2025-11-09_11-30-50.webp",
  "/assets/photo_2025-11-09_11-29-30.webp",
  "/assets/photo_2025-11-09_11-30-00.webp",
  "/assets/photo_2025-11-09_11-30-26.webp",
  "/assets/photo_2025-11-09_11-31-03.webp",
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-[60vh] sm:h-screen overflow-hidden bg-black">
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{ willChange: "opacity" }}
        >
          <Image
            src={src}
            alt={`Slide ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
            quality={50}
            sizes="100vw"
          />
        </div>
      ))}

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      
    </div>
  )
}
