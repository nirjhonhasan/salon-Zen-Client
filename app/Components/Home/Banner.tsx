import Image from "next/image";
import { Search, MapPin, ArrowRight, CalendarCheck, ShieldCheck, Sparkles, Headphones } from "lucide-react";

export default function Banner() {
  return (
    <section className="relative min-h-[90vh] bg-zinc-950 text-zinc-100 flex items-center overflow-hidden pt-24 pb-16">
    
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

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl space-y-8">
          
          {/* স্মল ট্যাগ/ব্যাজ */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs md:text-sm font-medium tracking-wide shadow-sm">
            <Sparkles className="w-4 h-4" />
            <span>Premium Salon Experience</span>
          </div>

          {/* মেইন হেডিং */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white leading-[1.1]">
            Look Beautiful, <br />
            <span className="text-amber-500 italic font-normal">Feel Amazing</span>
          </h1>

          {/* সাবটাইটেল বা ডেসক্রিপশন */}
          <p className="text-base sm:text-lg text-zinc-300 max-w-xl font-light leading-relaxed">
            Book your favorite salon services easily with SalonBook. Hair, Skin, Beauty & More — All in One Place.
          </p>

          {/* সার্চ এবং লোকেশন ফিল্টার বক্স */}
          <div className="bg-zinc-900/90 border border-zinc-800 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center gap-3">
            
            {/* সার্চ ইনপুট */}
            <div className="flex items-center gap-3 flex-1 w-full px-3 py-2 bg-zinc-950/60 rounded-xl border border-zinc-800/80 focus-within:border-amber-500/50 transition">
              <Search className="w-5 h-5 text-amber-500 shrink-0" />
              <input 
                type="text" 
                placeholder="Search for services... (e.g. Hair Cut, Facial)" 
                className="bg-transparent text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none w-full"
              />
            </div>

            {/* লোকেশন সিলেক্টর */}
            <div className="flex items-center gap-3 w-full md:w-auto px-3 py-2 bg-zinc-950/60 rounded-xl border border-zinc-800/80 shrink-0">
              <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
              <select className="bg-transparent text-sm text-zinc-200 focus:outline-none cursor-pointer pr-4">
                <option value="dhaka" className="bg-zinc-900 text-zinc-200">Dhaka</option>
                <option value="barishal" className="bg-zinc-900 text-zinc-200">Barishal</option>
                <option value="chittagong" className="bg-zinc-900 text-zinc-200">Chittagong</option>
              </select>
            </div>

            {/* ফাইন্ড সার্ভিস বাটন */}
            <button className="w-full md:w-auto px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-semibold rounded-xl shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2 shrink-0">
              <span>Find Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

          {/* ফিচার হাইলাইটস (নিচের ছোট চারটা কার্ড/অপশন) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 pt-6 gap-4 border-t border-zinc-800/80">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-zinc-200">Easy Booking</h4>
                <p className="text-[11px] text-zinc-400">In Just a Few Clicks</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-zinc-200">Trusted & Secure</h4>
                <p className="text-[11px] text-zinc-400">Your Data, Our Priority</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-zinc-200">Premium Services</h4>
                <p className="text-[11px] text-zinc-400">Beauty Beyond Ordinary</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-zinc-200">24/7 Support</h4>
                <p className="text-[11px] text-zinc-400">Always Here for You</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}