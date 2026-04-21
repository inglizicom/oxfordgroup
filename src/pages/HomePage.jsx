import Hero          from '../components/Hero'
import ActionBar     from '../components/ActionBar'
import SocialProof   from '../components/SocialProof'
import OurSchools    from '../components/OurSchools'
import Branches      from '../components/Branches'
import MoroccoMap    from '../components/MoroccoMap'
import Testimonials  from '../components/Testimonials'
import PlacementTest from '../components/PlacementTest'
import FAQ           from '../components/FAQ'
import ContactForm   from '../components/ContactForm'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ActionBar />
      <OurSchools />
      <SocialProof />
      <Branches />
      <MoroccoMap />
      <Testimonials />
      <PlacementTest />
      <FAQ />
      <ContactForm />
    </main>
  )
}
