import Hero          from '../components/Hero'
import ActionBar     from '../components/ActionBar'
import OurSchools    from '../components/OurSchools'
import MoroccoMap    from '../components/MoroccoMap'
import Testimonials  from '../components/Testimonials'
import PlacementTest from '../components/PlacementTest'
import ContactForm   from '../components/ContactForm'

export default function HomePage() {
  return (
    <main className="bg-slate-50 text-slate-900">
      <Hero />
      <ActionBar />
      <OurSchools />
      <MoroccoMap />
      <Testimonials />
      <PlacementTest />
      <ContactForm />
    </main>
  )
}
