"use client"

import { useRef, useEffect, useState } from "react"

export default function LazyVideo({ span }: { span: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true)
        }
      },
      { rootMargin: "200px" }
    )

    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (load && videoRef.current) {
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // autoplay failed, user interaction may be required
        })
      }
    }
  }, [load])

  return (
    <div ref={ref} className={`${span} h-[380px] rounded-xl bg-black overflow-hidden`}>
      {load && (
        <video
          ref={videoRef}
          src="/assets/videos/Play.mp4"
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover rounded-xl"
        />
      )}
    </div>
  )
}
