import Navbar        from './components/Navbar'
import Hero          from './components/Hero'
import ActionBar     from './components/ActionBar'
import SocialProof   from './components/SocialProof'
import Branches      from './components/Branches'
import OnlineOffline from './components/OnlineOffline'
import MoroccoMap    from './components/MoroccoMap'
import Teachers      from './components/Teachers'
import Testimonials  from './components/Testimonials'
import PlacementTest from './components/PlacementTest'
import FAQ           from './components/FAQ'
import ContactForm   from './components/ContactForm'
import Footer        from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

export default function App() {
  return (
    <>
      {/* ── Fixed UI ──────────────────────────────────── */}
      <Navbar />
      <WhatsAppButton />

      {/* ── Page flow (Attention → Trust → Decision → Action) ── */}
      <main>
        {/* 1. ATTENTION */}
        <Hero />
        <ActionBar />

        {/* 2. TRUST */}
        <SocialProof />
        <Branches />

        {/* 3. DECISION */}
        <OnlineOffline />
        <MoroccoMap />
        <Teachers />
        <Testimonials />
        <PlacementTest />

        {/* 4. ACTION */}
        <FAQ />
        <ContactForm />
      </main>

      <Footer />
    </>
  )
}
