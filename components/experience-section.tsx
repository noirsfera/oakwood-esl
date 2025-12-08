"use client"

import { BentoTilt, BentoCard } from "./bento-components"
import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/lib/translation"

export const ExperiencesSection = () => {
  const { language } = useLanguage()
  const t = translations[language].home.vision

  return (
    <section className="py-20 px-4 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Section Intro */}
        <div className="mb-16 text-center">
          <p className="text-emerald-400 text-sm font-semibold tracking-wider uppercase mb-3">{t.badge}</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance leading-tight">{t.title}</h2>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto text-pretty leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          <BentoTilt className="md:col-span-8 h-[500px] md:h-[600px]">
            <BentoCard
              src={["/assets/photo_2025-11-09_11-31-47.webp", "/assets/photo_2025-11-09_11-29-30.webp"]}
              isImage={true}
              title={t.card1.title}
              description={t.card1.description}
            />
          </BentoTilt>

          {/* Row 1: Core Values - Portrait Video */}
          <BentoTilt className="md:col-span-4 h-[500px] md:h-[600px]">
            <BentoCard
              src="/assets/videos/Play.mp4"
              isImage={false}
              title={t.card2.title}
              description={t.card2.description}
            />
          </BentoTilt>

          <BentoTilt className="md:col-span-4 h-[380px]">
            <BentoCard
              src={["/assets/photo_2025-11-09_11-31-50.webp", "/assets/photo_2025-11-09_11-29-52.webp"]}
              isImage={true}
              title={t.card3.title}
              description={t.card3.description}
            />
          </BentoTilt>

          <BentoTilt className="md:col-span-4 h-[380px]">
            <BentoCard
              src={["/assets/photo_2025-11-09_11-29-37.webp", "/assets/photo_2025-11-09_11-30-06.webp"]}
              isImage={true}
              title={t.card4.title}
              description={t.card4.description}
            />
          </BentoTilt>

          <BentoTilt className="md:col-span-4 h-[380px]">
            <BentoCard
              src="/assets/videos/Play.mp4"
              isImage={false}
              title={t.card5.title}
              description={t.card5.description}
            />
          </BentoTilt>
        </div>

        <div className="mt-16 text-center">
          <blockquote className="text-2xl md:text-3xl font-medium text-white max-w-4xl mx-auto italic text-balance leading-relaxed">
            {t.quote}
          </blockquote>
          <p className="mt-6 text-emerald-400 font-semibold text-lg">{t.quoteAuthor}</p>
        </div>
      </div>
    </section>
  )
}
