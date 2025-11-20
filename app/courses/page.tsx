"use client"

import Link from "next/link"
import { BookOpen, Users, Mic, ArrowRight, CheckCircle } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/lib/translation"
import Head from "next/head"
import type { LucideIcon } from "lucide-react"

type Course = {
  id: string
  icon: LucideIcon
  title: string
  description: string
  features: string[]
  highlight: boolean
}

type CourseBook = {
  id: number
  title: string
  subtitle: string
  image: string
  color: string
}

export default function Courses() {
  const { language } = useLanguage()
  const t = translations[language].courses

  const courses: Course[] = [
    {
      id: "individual",
      icon: BookOpen,
      title: t.individual.title,
      description: t.individual.description,
      features: [
        t.individual.feature1,
        t.individual.feature2,
        t.individual.feature3,
        t.individual.feature4,
        t.individual.feature5,
      ],
      highlight: false,
    },
    {
      id: "groups",
      icon: Users,
      title: t.group.title,
      description: t.group.description,
      features: [
        t.group.feature1,
        t.group.feature2,
        t.group.feature3,
        t.group.feature4,
        t.group.feature5,
      ],
      highlight: false,
    },
    {
      id: "club",
      icon: Mic,
      title: t.club.title,
      description: t.club.description,
      features: [
        t.club.feature1,
        t.club.feature2,
        t.club.feature3,
        t.club.feature4,
        t.club.feature5,
      ],
      highlight: false,
    },
  ]

  const courseBooks: CourseBook[] = [
    {
      id: 1,
      title: t.book1.title,
      subtitle: t.book1.subtitle,
      image: "/assets/books/IMG-20251113-WA0001.jpg",
      color: "from-orange-400 to-yellow-500",
    },
    {
      id: 2,
      title: t.book2.title,
      subtitle: t.book2.subtitle,
      image: "/assets/books/IMG-20251113-WA0002.jpg",
      color: "from-green-400 to-emerald-500",
    },
    {
      id: 3,
      title: t.book3.title,
      subtitle: t.book3.subtitle,
      image: "/assets/books/IMG-20251113-WA0000.jpg",
      color: "from-cyan-400 to-blue-500",
    },
    {
      id: 4,
      title: t.book4.title,
      subtitle: t.book4.subtitle,
      image: "/assets/books/IMG-20251113-WA0003.jpg",
      color: "from-pink-400 to-rose-500",
    },
  ]

  return (
    <>
      <Head>
        <title>Courses - Your Language School</title>
        <meta
          name="description"
          content="Explore our language courses: Individual, Group, and Club classes designed to help you learn efficiently. Check out course details and our recommended books."
        />
      </Head>

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-24 px-4 bg-gradient-to-b from-primary via-primary to-primary/95 text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-block">
              <span className="text-sm font-semibold bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                {t.badge}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-balance">{t.hero.title}</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto text-pretty">
              {t.hero.subtitle}
            </p>
          </div>
        </section>

        {/* Courses Section */}
        <section className="py-24 px-4 bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className={`relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl ${
                    course.highlight
                      ? "ring-2 ring-primary shadow-lg md:scale-105 origin-center"
                      : "border border-border/50 hover:border-primary/30"
                  }`}
                >
                  {course.highlight && (
                    <div className="absolute -top-px left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                  )}

                  <div
                    className={`p-8 h-full flex flex-col bg-white ${
                      course.highlight ? "bg-gradient-to-br from-white to-blue-50/20" : ""
                    }`}
                  >
                    {course.highlight && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs font-bold tracking-wide">
                        {language === "ru" ? "САМЫЙ ПОПУЛЯРНЫЙ" : "MOST POPULAR"}
                      </div>
                    )}

                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`p-3 rounded-lg ${
                          course.highlight ? "bg-primary/10" : "bg-muted"
                        }`}
                      >
                        <course.icon
                          className={`w-6 h-6 ${
                            course.highlight ? "text-primary" : "text-foreground/70"
                          }`}
                        />
                      </div>
                      {course.highlight && (
                        <span className="text-xs font-bold text-primary tracking-wider">
                          {language === "ru" ? "РЕКОМЕНДУЕТСЯ" : "RECOMMENDED"}
                        </span>
                      )}
                    </div>

                    <h2 className="text-2xl font-bold mb-2 text-foreground">{course.title}</h2>
                    <p className="text-foreground/70 mb-8 text-sm leading-relaxed">{course.description}</p>

                    <div className="mb-8 space-y-3 flex-grow">
                      <div className="text-xs font-bold text-foreground uppercase tracking-wider">
                        {language === "ru" ? "Что включено" : "What's Included"}
                      </div>
                      {course.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                          <span className="text-sm text-foreground/80">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href="/pricing"
                      className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                        course.highlight
                          ? "bg-primary text-primary-foreground hover:shadow-lg hover:bg-primary/95"
                          : "bg-primary/10 text-primary hover:bg-primary/20"
                      }`}
                    >
                      {t.learnMore}
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Books Section */}
        <section className="py-24 px-4 bg-gradient-to-b from-muted/30 to-background">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t.booksTitle}</h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">{t.booksSubtitle}</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {courseBooks.map((book) => (
                <div
                  key={book.id}
                  className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="aspect-[3/4] relative bg-gradient-to-br overflow-hidden">
                    <Image
                      src={book.image || "/placeholder.svg"}
                      alt={`${book.title} - ${book.subtitle}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-bold text-lg">{book.title}</h3>
                    <p className="text-white/80 text-sm">{book.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 px-4 bg-muted/30">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t.howItWorks.title}</h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">{t.howItWorks.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 relative">
              <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary to-transparent -z-10" />

              {[
                { step: 1, title: t.howItWorks.step1.title, description: t.howItWorks.step1.description, icon: "📚" },
                { step: 2, title: t.howItWorks.step2.title, description: t.howItWorks.step2.description, icon: "✅" },
                { step: 3, title: t.howItWorks.step3.title, description: t.howItWorks.step3.description, icon: "👨‍🏫" },
                { step: 4, title: t.howItWorks.step4.title, description: t.howItWorks.step4.description, icon: "⏰" },
              ].map((item) => (
                <div key={item.step} className="text-center relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary rounded-full flex items-center justify-center font-bold mx-auto mb-6 text-2xl relative z-10 bg-white">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-3">{item.title}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-4 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{t.finalCta.title}</h2>
              <p className="text-lg text-white/90 text-pretty">{t.finalCta.subtitle}</p>
            </div>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-bold hover:shadow-xl transition-all duration-200 hover:bg-white/95"
            >
              {t.finalCta.button}
              <ArrowRight size={20} />
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
