import About from "@/app/Components/Home/About"
import Banner from "@/app/Components/Home/Banner"
import Categories from "@/app/Components/Home/Categories"
import FeaturedServices from "@/app/Components/Home/FeaturedServices"
import Testimonials from "@/app/Components/Home/Testimonials"
import WhyChooseUs from "@/app/Components/Home/WhyChooseUs"

export default function HomePage() {
  return (
    <div>
      <Banner />
      <FeaturedServices />
      <Categories />
      <WhyChooseUs />
      <Testimonials />
      <About />
    </div>
  )
}
