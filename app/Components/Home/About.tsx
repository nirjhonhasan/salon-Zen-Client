import Link from "next/link";
import { Award, CheckCircle2, ArrowRight, Scissors } from "lucide-react";

const About = () => {
    const highlights = [
        "Certified & Experienced Beauty Specialists",
        "100% Organic & International Standard Products",
        "Hygienic, Relaxing & Luxury Ambience",
        "Flexible Online Booking & Zero Waiting Time",
    ];

    return (
        <section id="about" className="py-20 bg-zinc-950 text-zinc-100 border-t border-zinc-900">

            <h2 className="flex justify-center items-center  py-10 text-amber-500 text-4xl font-medium">About SalonBook</h2>

            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* বাম পাশ: ভিজ্যুয়াল কার্ড এবং ফ্লোটিং ব্যাজ */}
                    <div className="relative">
                        <div className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900/50 p-6 sm:p-10 shadow-2xl">

                            {/* ফ্লোটিং অ্যাওয়ার্ড ব্যাজ (এখন কার্ডের ওপরের ডানপাশে সুন্দরভাবে সেট করা) */}
                            <div className="absolute top-6 right-6 hidden sm:flex items-center gap-3 bg-zinc-900/90 backdrop-blur-md border border-amber-500/30 px-4 py-2.5 rounded-2xl shadow-xl z-20">
                                <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center text-zinc-950 shrink-0">
                                    <Award className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-white">Top Rated Salon</p>
                                    <p className="text-[11px] text-amber-500">4.9 ★ Customer Rating</p>
                                </div>
                            </div>

                            {/* ডেকোরেটিভ ব্যাকগ্রাউন্ড গ্লো */}
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                            {/* মেইন ভিজ্যুয়াল কনটেন্ট বক্স */}
                            <div className="relative z-10 space-y-6">
                                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
                                    <Scissors className="w-7 h-7" />
                                </div>

                                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-snug">
                                    Redefining Luxury Grooming & Self-Care in Bangladesh
                                </h3>

                                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                                    At <span className="text-amber-500 font-medium">SalonBook</span>, we believe self-care is an art. From precision haircuts and rejuvenating facials to bridal makeovers, our sanctuary is designed to help you unwind and step out with unmatched confidence.
                                </p>

                                {/* স্ট্যাটিস্টিকস গ্রিড */}
                                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-800/80">
                                    <div>
                                        <h4 className="text-2xl sm:text-3xl font-bold text-amber-500">8+</h4>
                                        <p className="text-xs text-zinc-400 mt-1">Years Experience</p>
                                    </div>
                                    <div>
                                        <h4 className="text-2xl sm:text-3xl font-bold text-amber-500">15k+</h4>
                                        <p className="text-xs text-zinc-400 mt-1">Happy Clients</p>
                                    </div>
                                    <div>
                                        <h4 className="text-2xl sm:text-3xl font-bold text-amber-500">25+</h4>
                                        <p className="text-xs text-zinc-400 mt-1">Expert Stylists</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ডান পাশ: টেক্সট ও ফিচার লিস্ট */}
                    <div className="space-y-6">


                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
                            Where Elegance Meets <br />
                            <span className="text-amber-500 italic font-normal">Modern Styling</span>
                        </h2>

                        <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                            We combine timeless beauty techniques with modern trends to give you a personalized salon experience. Whether you are preparing for a special occasion or just need a refreshing break, our dedicated team ensures every detail is tailored to your unique style.
                        </p>

                        {/* চেকলিস্ট */}
                        <ul className="space-y-3 pt-2">
                            {highlights.map((item, index) => (
                                <li key={index} className="flex items-center gap-3 text-sm sm:text-base text-zinc-200">
                                    <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        {/* অ্যাকশন বাটন */}
                        <div className="pt-4 flex flex-wrap items-center gap-4">
                            <Link
                                href="/services"
                                className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-semibold rounded-xl shadow-lg shadow-amber-500/20 transition inline-flex items-center gap-2"
                            >
                                <span>Explore Services</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>

                            <Link
                                href="/services"
                                className="px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-amber-500 font-medium rounded-xl transition"
                            >
                                Book Now
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;