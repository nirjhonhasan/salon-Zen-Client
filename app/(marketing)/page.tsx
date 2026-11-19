import About from "@/app/Components/Home/About"
import Banner from "@/app/Components/Home/Banner"
import FeaturedServices from "@/app/Components/Home/FeaturedServices"

export default function HomePage() {
  return (
    <div>
      <Banner />
      <FeaturedServices />
      <About />
    </div>
  )
}
