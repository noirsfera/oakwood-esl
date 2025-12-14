import Image from "next/image"
import LazyVideo from "./lazy-video";

export default function ExperiencesSection({ t }: { t: any }) {
  return (
    <section className="py-20 px-4 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <p className="text-emerald-400 text-sm font-semibold mb-3">
            {t.badge}
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {t.title}
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-6">
          <CardImage span="md:col-span-8" src="/assets/photo_2025-11-09_11-31-47.webp" />
          <LazyVideo span="md:col-span-4" />
          <CardImage span="md:col-span-4" src="/assets/photo_2025-11-09_11-31-50.webp" />
          <CardImage span="md:col-span-4" src="/assets/photo_2025-11-09_11-29-37.webp" />
          <LazyVideo span="md:col-span-4" />
        </div>

        <blockquote className="mt-16 text-center text-2xl text-white italic">
          {t.quote}
          <p className="mt-4 text-emerald-400 font-semibold">
            {t.quoteAuthor}
          </p>
        </blockquote>
      </div>
    </section>
  )
}

function CardImage({ src, span }: { src: string; span: string }) {
  return (
    <div className={`${span} h-[380px] relative`}>
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover rounded-xl"
      />
    </div>
  )
}
