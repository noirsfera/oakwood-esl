"use client"

import { useLanguage } from '@/contexts/language-context'
import { Globe } from 'lucide-react'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <button
      onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
      aria-label="Switch language"
    >
      <Globe size={18} />
      <span className="text-sm font-medium">{language === 'ru' ? 'EN' : 'RU'}</span>
    </button>
  )
}
