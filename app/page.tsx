"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { FaUsers, FaClock, FaBolt, FaGlobe } from "react-icons/fa"
import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/lib/translation"

const HeroSlider = dynamic(() => import("@/components/Slider"), {
  ssr: false,
  loading: () => <div className="w-full h-screen bg-black" />,
})

const ExperiencesSection = dynamic(
  () => import("@/components/experience-section").then((mod) => ({ default: mod.ExperiencesSection })),
  {
    ssr: false,
    loading: () => <div className="py-20 bg-slate-950 min-h-[600px]" />,
  },
)

export default function HomePage() {
  const { language } = useLanguage()
  const t = translations[language].home

  return (
    <main className="min-h-screen">
      <HeroSlider />

      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">{t.whyChoose.title}</h2>

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
              <div key={i} className="p-6 rounded-lg border border-border bg-card hover:shadow-lg transition">
                <item.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-foreground/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCES SECTION */}
      <ExperiencesSection />

      {/* METRICS */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">{t.impact.title}</h2>
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
