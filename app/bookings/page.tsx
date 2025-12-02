"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Head from "next/head"
import { Calendar, Users, BookOpen, CheckCircle, Gift, ArrowRight } from "lucide-react"
import { BsTelegram } from "react-icons/bs"
import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/lib/translation"

export default function Booking() {
  const { language } = useLanguage()
  const t = translations[language].booking

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    courseType: "",
    level: "",
    packageType: "",
    preferredDate: "",
    preferredTime: "",
    goals: "",
    hearAboutUs: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/send-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert(t.alerts.success)
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          courseType: "",
          level: "",
          packageType: "",
          preferredDate: "",
          preferredTime: "",
          goals: "",
          hearAboutUs: "",
        })
      } else {
        alert(t.alerts.error)
      }
    } catch (error) {
      console.error("Booking submission error:", error)
      alert(t.alerts.error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Fixed benefits array typing
  const benefits: { icon: React.ComponentType<{ className?: string }>; title: string; description: string }[] = [
    { icon: Gift, title: t.benefits.trial.title, description: t.benefits.trial.description },
    { icon: Users, title: t.benefits.teachers.title, description: t.benefits.teachers.description },
    { icon: Calendar, title: t.benefits.schedule.title, description: t.benefits.schedule.description },
    { icon: CheckCircle, title: t.benefits.commitment.title, description: t.benefits.commitment.description },
  ]

  return (
    <>
      <Head>
  <title>Book Your English Course | Language School</title>
  <meta
    name="description"
    content="Reserve your spot in our English courses today. Choose your level, package, and schedule, and start improving your language skills with expert teachers."
  />
</Head>
      <main className="min-h-screen bg-background">
        {/* Header Section */}
        <section className="py-24 px-4 bg-gradient-to-b from-primary to-primary/95 text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-block">
              <span className="text-sm font-semibold bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm flex items-center gap-2">
                <Gift className="w-4 h-4" />
                {t.badge}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-balance">
              {t.hero.title}
            </h1>

            <p className="text-xl text-white/90 max-w-2xl mx-auto text-pretty">
              {t.hero.subtitle}
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 px-4 bg-muted/20">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6">
              {benefits.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-border/30 p-6 text-center hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-foreground/70">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-20 px-4 bg-background">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl border border-border/30 p-8 shadow-lg">
                  <h2 className="text-3xl font-bold text-foreground mb-6">
                    {t.form.title}
                  </h2>

                  <p className="text-foreground/70 mb-8">{t.form.subtitle}</p>

                  {/* FORM */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* PERSONAL INFO */}
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary" />
                        {t.form.personalInfo}
                      </h3>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            {t.form.firstName} *
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            placeholder={t.form.firstNamePlaceholder}
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-primary/50"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            {t.form.lastName} *
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            placeholder={t.form.lastNamePlaceholder}
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-primary/50"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            {t.form.email} *
                          </label>
                          <input
                            type="email"
                            name="email"
                            placeholder={t.form.emailPlaceholder}
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            {t.form.phone} *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            placeholder={t.form.phonePlaceholder}
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* COURSE SELECTION */}
                    <div className="pt-6 border-t border-border">
                      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-primary" />
                        {t.form.courseSelection}
                      </h3>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            {t.form.courseType} *
                          </label>
                          <select
                            name="courseType"
                            value={formData.courseType}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border"
                            required
                          >
                            <option value="">{t.form.selectCourse}</option>
                            <option value="general">{t.form.individual}</option>
                            <option value="general">{t.form.club}</option>
                            <option value="general">{t.form.homeVisit}</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            {t.form.level} *
                          </label>
                          <select
                            name="level"
                            value={formData.level}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border"
                            required
                          >
                            <option value="">{t.form.selectLevel}</option>
                            <option value="beginner">{t.form.beginner}</option>
                            <option value="elementary">{t.form.elementary}</option>
                            <option value="intermediate">{t.form.intermediate}</option>
                            <option value="upper-intermediate">{t.form.upperIntermediate}</option>
                            <option value="advanced">{t.form.advanced}</option>
                            <option value="proficient">{t.form.proficient}</option>
                            <option value="not-sure">{t.form.notSure}</option>
                          </select>
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-semibold mb-2">
                          {t.form.packageType} *
                        </label>
                        <select
                          name="packageType"
                          value={formData.packageType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border"
                          required
                        >
                          <option value="">{t.form.selectPackage}</option>
                          <option value="trial">{t.form.individual}</option>
                          <option value="starter">{t.form.group}</option>
                          <option value="standard">{t.form.club}</option>
                          <option value="intensive">{t.form.homeVisit}</option>
                          
                        </select>
                      </div>
                    </div>

                    {/* SCHEDULING */}
                    <div className="pt-6 border-t border-border">
                      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        {t.form.scheduling}
                      </h3>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            {t.form.preferredDate} *
                          </label>
                          <input
                            type="date"
                            name="preferredDate"
                            value={formData.preferredDate}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            {t.form.preferredTime} *
                          </label>
                          <select
                            name="preferredTime"
                            value={formData.preferredTime}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border"
                            required
                          >
                            <option value="">{t.form.selectTime}</option>
                            <option value="morning">{t.form.morning}</option>
                            <option value="afternoon">{t.form.afternoon}</option>
                            <option value="evening">{t.form.evening}</option>
                            <option value="flexible">{t.form.flexible}</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* ADDITIONAL INFO */}
                    <div className="pt-6 border-t border-border">
                      <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">
                          {t.form.goals}
                        </label>
                        <textarea
                          name="goals"
                          value={formData.goals}
                          onChange={handleChange}
                          placeholder={t.form.goalsPlaceholder}
                          rows={4}
                          className="w-full px-4 py-3 rounded-lg border resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          {t.form.hearAboutUs}
                        </label>
                        <select
                          name="hearAboutUs"
                          value={formData.hearAboutUs}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border"
                        >
                          <option value="">{t.form.selectOption}</option>
                          <option value="google">{t.form.google}</option>
                          <option value="social">{t.form.social}</option>
                          <option value="friend">{t.form.friend}</option>
                          <option value="telegram">{t.form.telegram}</option>
                          <option value="advertisement">{t.form.advertisement}</option>
                          <option value="other">{t.form.other}</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-primary-foreground py-4 px-6 rounded-lg font-bold hover:shadow-lg transition flex items-center justify-center gap-2 text-lg disabled:opacity-50"
                    >
                      {isSubmitting ? t.form.submitting : t.form.submit}
                      <ArrowRight className="w-5 h-5" />
                    </button>

                    <p className="text-sm text-foreground/60 text-center">
                      {t.form.terms}
                    </p>
                  </form>
                </div>
              </div>

              {/* SIDEBAR omitted for brevity */}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
