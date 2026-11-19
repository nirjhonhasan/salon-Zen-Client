import Image from "next/image"
import {
  Search,
  MapPin,
  ArrowRight,
  CalendarCheck,
  ShieldCheck,
  Sparkles,
  Headphones,
} from "lucide-react"

export default function Banner() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-zinc-950 pt-24 pb-16 text-zinc-100">
      <div className="absolute inset-0 z-0">
        <Image
          src="/banner_bg.webp"
          alt="SalonBook Luxury Experience"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/20 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <div className="max-w-3xl space-y-8">
          {/* স্মল ট্যাগ/ব্যাজ */}
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-medium tracking-wide text-amber-400 shadow-sm md:text-sm">
            <Sparkles className="h-4 w-4" />
            <span>Premium Salon Experience</span>
          </div>

          {/* মেইন হেডিং */}
          <h1 className="font-serif text-4xl leading-[1.1] font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Look Beautiful, <br />
            <span className="font-normal text-amber-500 italic">
              Feel Amazing
            </span>
          </h1>

          {/* সাবটাইটেল বা ডেসক্রিপশন */}
          <p className="max-w-xl text-base leading-relaxed font-light text-zinc-300 sm:text-lg">
            Book your favorite salon services easily with SalonBook. Hair, Skin,
            Beauty & More — All in One Place.
          </p>

          {/* সার্চ এবং লোকেশন ফিল্টার বক্স */}
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/90 p-3 shadow-2xl backdrop-blur-md sm:p-4 md:flex-row">
            {/* সার্চ ইনপুট */}
            <div className="flex w-full flex-1 items-center gap-3 rounded-xl border border-zinc-800/80 bg-zinc-950/60 px-3 py-2 transition focus-within:border-amber-500/50">
              <Search className="h-5 w-5 shrink-0 text-amber-500" />
              <input
                type="text"
                placeholder="Search for services... (e.g. Hair Cut, Facial)"
                className="w-full bg-transparent text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none"
              />
            </div>

            {/* লোকেশন সিলেক্টর */}
            <div className="flex w-full shrink-0 items-center gap-3 rounded-xl border border-zinc-800/80 bg-zinc-950/60 px-3 py-2 md:w-auto">
              <MapPin className="h-5 w-5 shrink-0 text-amber-500" />
              <select className="cursor-pointer bg-transparent pr-4 text-sm text-zinc-200 focus:outline-none">
                <option value="dhaka" className="bg-zinc-900 text-zinc-200">
                  Dhaka
                </option>
                <option value="barishal" className="bg-zinc-900 text-zinc-200">
                  Barishal
                </option>
                <option
                  value="chittagong"
                  className="bg-zinc-900 text-zinc-200"
                >
                  Chittagong
                </option>
              </select>
            </div>

            {/* ফাইন্ড সার্ভিস বাটন */}
            <button className="flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3.5 font-semibold text-zinc-950 shadow-lg shadow-amber-500/20 transition hover:from-amber-400 hover:to-amber-500 md:w-auto">
              <span>Find Services</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* ফিচার হাইলাইটস (নিচের ছোট চারটা কার্ড/অপশন) */}
          <div className="grid grid-cols-2 gap-4 border-t border-zinc-800/80 pt-6 sm:grid-cols-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-500">
                <CalendarCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-zinc-200 sm:text-sm">
                  Easy Booking
                </h4>
                <p className="text-[11px] text-zinc-400">
                  In Just a Few Clicks
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-500">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-zinc-200 sm:text-sm">
                  Trusted & Secure
                </h4>
                <p className="text-[11px] text-zinc-400">
                  Your Data, Our Priority
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-500">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-zinc-200 sm:text-sm">
                  Premium Services
                </h4>
                <p className="text-[11px] text-zinc-400">
                  Beauty Beyond Ordinary
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-500">
                <Headphones className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-zinc-200 sm:text-sm">
                  24/7 Support
                </h4>
                <p className="text-[11px] text-zinc-400">Always Here for You</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
