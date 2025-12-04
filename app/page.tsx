"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { FaUsers, FaClock, FaBolt, FaGlobe } from "react-icons/fa"
import { ExperiencesSection } from "@/components/experience-section"
import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/lib/translation"

const images = [
  "/assets/photo_2025-11-09_11-30-03.jpg",
  "/assets/photo_2025-11-09_11-30-37.jpg",
  "/assets/photo_2025-11-09_11-30-50.jpg",
  "/assets/photo_2025-11-09_11-29-30.jpg",
  "/assets/photo_2025-11-09_11-30-00.jpg",
  "/assets/photo_2025-11-09_11-30-26.jpg",
  "/assets/photo_2025-11-09_11-31-03.jpg",
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const autoplayRef = useRef(true)

  const { language } = useLanguage()
  const t = translations[language].home

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      if (autoplayRef.current) {
        setCurrentSlide((prev) => (prev + 1) % images.length)
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    autoplayRef.current = false
    setCurrentSlide((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    autoplayRef.current = false
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <main className="min-h-screen">
      {/* HERO SECTION */}
      <section
        className="relative w-full h-screen max-h-screen overflow-hidden bg-black"
        onMouseEnter={() => (autoplayRef.current = false)}
        onMouseLeave={() => (autoplayRef.current = true)}
      >
        {/* Fallback to avoid black screen */}
        <div className="absolute inset-0 bg-black/40 z-[1]" />

        {/* Optimized Slider */}
        {images.map((image, index) => {
          const isActive = currentSlide === index
          const isNext = (currentSlide + 1) % images.length === index

          return (
            <div
              key={index}
              className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
              style={{ opacity: isActive ? 1 : 0 }}
            >
              {(isActive || isNext) && (
                <Image
                  src={image}
                  alt=""
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="100vw"
                  placeholder="empty"
                />
              )}
            </div>
          )
        })}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 z-[5]" />

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-[10] bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-[10] bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[10] flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                autoplayRef.current = false
                setCurrentSlide(idx)
              }}
              className={`h-2 rounded-full transition-all ${
                currentSlide === idx ? "bg-white w-8" : "bg-white/40 w-2"
              }`}
            />
          ))}
        </div>

        {/* HERO CONTENT */}
        <div className="absolute inset-0 flex items-center justify-center z-[10]">
          <div className="text-center text-white max-w-2xl px-4">
            <div className="inline-block bg-blue-500/30 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-medium">{t.badge}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {t.hero.title}{" "}
              <span className="text-blue-300">{t.hero.titleHighlight}</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses"
                className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
              >
                {t.hero.exploreCourses}
              </Link>
              <Link
                href="https://t.me/+JHwfsOY7k-YzMTFi"
                className="bg-white/20 text-white border border-white/50 px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition backdrop-blur-sm"
              >
                {t.hero.contactTelegram}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            {t.whyChoose.title}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FaUsers,
                title: t.whyChoose.feature1.title,
                description: t.whyChoose.feature1.description,
              },
              {
                icon: FaClock,
                title: t.whyChoose.feature2.title,
                description: t.whyChoose.feature2.description,
              },
              {
                icon: FaBolt,
                title: t.whyChoose.feature3.title,
                description: t.whyChoose.feature3.description,
              },
              {
                icon: FaGlobe,
                title: t.whyChoose.feature4.title,
                description: t.whyChoose.feature4.description,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-lg border border-border bg-card hover:shadow-lg transition"
              >
                <item.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-foreground/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ExperiencesSection />

      {/* METRICS */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            {t.impact.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">25+</div>
              <p className="text-lg opacity-90">{t.impact.students}</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">10+</div>
              <p className="text-lg opacity-90">{t.impact.teachers}</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">3+</div>
              <p className="text-lg opacity-90">{t.impact.countries}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">{t.cta.title}</h2>
          <p className="text-xl text-foreground/70 mb-8">{t.cta.subtitle}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing"
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              {t.cta.viewPricing}
            </Link>
            <Link
              href="/courses"
              className="bg-secondary text-secondary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              {t.cta.exploreCourses}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
