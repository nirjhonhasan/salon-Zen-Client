"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"

// Sample reviews. Replace the names and text with your own.
const reviews = [
  {
    name: "Ayesha Rahman",
    service: "Hair Coloring",
    text: "I booked in two minutes and the colour came out exactly how I wanted. A friendly team and no waiting at all.",
  },
  {
    name: "Nusrat Jahan",
    service: "Facial & Skincare",
    text: "The facial was deeply relaxing and my skin glowed for days. Paying online was quick and easy.",
  },
  {
    name: "Tanvir Hasan",
    service: "Haircut & Styling",
    text: "The best haircut I have had in years. The stylist listened carefully and the salon was spotless.",
  },
  {
    name: "Mim Akter",
    service: "Bridal Makeup",
    text: "My bridal look was flawless and lasted the whole day. I felt like a queen. Thank you, SalonBook!",
  },
  {
    name: "Sadia Karim",
    service: "Spa & Massage",
    text: "A calm, luxurious place to switch off. The massage was exactly what I needed after a busy week.",
  },
]

export default function Testimonials() {
  // The number of the review we are showing now (0 = the first one).
  const [current, setCurrent] = useState(0)

  function goNext() {
    setCurrent((old) => (old + 1) % reviews.length)
  }

  function goPrevious() {
    setCurrent((old) => (old - 1 + reviews.length) % reviews.length)
  }

  // Move to the next review by itself every 6 seconds.
  // Clicking a button changes "current", which restarts this timer.
  useEffect(() => {
    const timer = setInterval(goNext, 6000)
    return () => clearInterval(timer)
  }, [current])

  return (
    <section className="overflow-hidden border-t border-zinc-900 bg-zinc-950 py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-amber-500" />
            <p className="text-xs font-semibold tracking-[0.3em] text-amber-500 uppercase">
              Testimonials
            </p>
            <span className="h-px w-10 bg-amber-500" />
          </div>

          <h2 className="mt-5 font-[family-name:var(--font-heading)] text-4xl font-semibold text-white sm:text-5xl">
            Loved by Our <span className="text-amber-500 italic">Guests</span>
          </h2>
        </div>

        {/* Slider: all cards sit in one row, and we slide the row left */}
        <div className="relative mt-8">
          {/* pt-8 leaves room so the quote badge is not cut off */}
          <div className="overflow-hidden pt-8">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {reviews.map((review) => (
                <div key={review.name} className="w-full shrink-0 p-1">
                  <div className="relative rounded-3xl border border-amber-500/30 bg-gradient-to-br from-zinc-900 via-zinc-900 to-amber-500/10 px-6 py-12 text-center sm:px-16">
                    {/* Big gold quote badge on top of the card */}
                    <span className="absolute -top-0 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-amber-500 text-zinc-950 shadow-lg shadow-amber-500/30">
                      <Quote className="h-6 w-6" />
                    </span>

                    <div className="flex justify-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="h-4 w-4 fill-amber-500 text-amber-500"
                        />
                      ))}
                    </div>

                    <p className="mt-6 font-[family-name:var(--font-heading)] text-2xl leading-relaxed text-zinc-100 italic sm:text-3xl">
                      &ldquo;{review.text}&rdquo;
                    </p>

                    <div className="mt-8 flex items-center justify-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-lg font-bold text-zinc-950 ring-4 ring-amber-500/20">
                        {review.name[0]}
                      </span>
                      <div className="text-left">
                        <p className="font-semibold text-white">
                          {review.name}
                        </p>
                        <p className="text-xs text-amber-500">
                          {review.service}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls: previous, dots, next */}
          <div className="mt-8 flex items-center justify-center gap-5">
            <button
              onClick={goPrevious}
              aria-label="Previous review"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 text-zinc-300 transition hover:border-amber-500 hover:text-amber-500"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {reviews.map((review, index) => (
                <button
                  key={review.name}
                  onClick={() => setCurrent(index)}
                  aria-label={`Show review ${index + 1}`}
                  className={
                    index === current
                      ? "h-2.5 w-8 rounded-full bg-amber-500 transition-all"
                      : "h-2.5 w-2.5 rounded-full bg-zinc-700 transition-all hover:bg-zinc-500"
                  }
                />
              ))}
            </div>

            <button
              onClick={goNext}
              aria-label="Next review"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 text-zinc-300 transition hover:border-amber-500 hover:text-amber-500"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
