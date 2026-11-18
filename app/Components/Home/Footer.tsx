import Link from "next/link";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Globe, 
  Share2, 
  MessageCircle 
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-300 border-t w-full border-zinc-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-amber-500 tracking-wider">
                SalonZen
              </span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Your premier destination for luxury salon services. Look beautiful, feel amazing with our expert styling and care.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-amber-500 hover:border-amber-500 transition" title="Facebook">
                <Globe className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-amber-500 hover:border-amber-500 transition" title="Instagram">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-amber-500 hover:border-amber-500 transition" title="Twitter">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Important Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-amber-500 transition">Home</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-amber-500 transition">Browse Services</Link>
              </li>
              <li>
                <Link href="/sign-in" className="hover:text-amber-500 transition">Sign In</Link>
              </li>
              <li>
                <Link href="/sign-up" className="hover:text-amber-500 transition">Sign Up</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span>123 Salon Avenue, Gulshan, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                <span>+880 1234-567890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-amber-500 shrink-0" />
                <span>support@salonzen.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Opening Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Opening Hours</h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Saturday - Thursday</p>
                  <p>10:00 AM - 9:00 PM</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Friday</p>
                  <p>3:00 PM - 10:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Section */}
        <div className="border-t border-zinc-900 pt-8 mt-8 text-center text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} SalonZen. All rights reserved. Built with Next.js & Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}