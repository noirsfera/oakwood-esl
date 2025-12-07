"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

const images = [
  "/assets/photo_2025-11-09_11-30-03.jpg",
  "/assets/photo_2025-11-09_11-30-37.jpg",
  "/assets/photo_2025-11-09_11-30-50.jpg",
  "/assets/photo_2025-11-09_11-29-30.jpg",
  "/assets/photo_2025-11-09_11-30-00.jpg",
  "/assets/photo_2025-11-09_11-30-26.jpg",
  "/assets/photo_2025-11-09_11-31-03.jpg",
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
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <Image
        src={images[current]}
        alt=""
        fill
        priority
        className="object-cover transition-opacity duration-700"
      />

      <div className="absolute inset-0 bg-black/40" />
    </div>
  )
}
