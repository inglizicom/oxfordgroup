import { useState } from 'react'
import { Plus } from 'lucide-react'

const FAQS = [
  {
    q: 'Do I need any prior experience to join?',
    a: 'Not at all! We welcome complete beginners. Our free placement test determines your level and places you in the right class — from A1 (absolute beginner) to C2 (mastery). We have a class for every starting point.',
  },
  {
    q: 'What languages do you teach?',
    a: 'We currently offer English (all levels), French (all levels including Classes Préparatoires), Spanish (beginner–intermediate), and Mandarin Chinese (beginner). New languages are added regularly.',
  },
  {
    q: 'Are online classes as effective as in-center?',
    a: 'Absolutely. Our online platform offers live HD classes, interactive whiteboards, breakout conversation rooms, and instant teacher feedback. Many students actually prefer the flexibility. Outcomes and certifications are identical.',
  },
  {
    q: 'What certifications can I earn?',
    a: 'We prepare students for IELTS, TOEFL, Cambridge (B1–C2), DELF, DALF, and TOEIC. Our specialized programs have a 95%+ first-attempt pass rate for internationally recognized exams.',
  },
  {
    q: 'How long does it take to reach fluency?',
    a: 'It depends on your starting level and study intensity. Most students move up one CEFR level (e.g., A2 to B1) in 3–6 months with 2–3 sessions per week. Intensive programs can accelerate this significantly.',
  },
  {
    q: 'Can I switch between online and in-center?',
    a: 'Yes! Our blended learning option lets you combine both. Attend center classes on weekdays and access online content on weekends. Many students find this the optimal arrangement.',
  },
  {
    q: 'Is there a trial class or refund policy?',
    a: 'We offer a free trial class for new students. If you enroll and are unsatisfied within the first week (2 classes), we issue a full refund — no questions asked.',
  },
  {
    q: 'Do you offer group discounts or family plans?',
    a: 'Yes! Group enrollments (3+ students) receive a 15% discount. Family plans with 2+ members from the same household receive 20%. Corporate packages for companies are also available.',
  },
]

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? 'border-oxford-200 bg-oxford-50' : 'border-gray-200 bg-white hover:border-oxford-100'}`}
    >
      <button
        className="w-full flex items-center justify-between p-5 md:p-6 text-left gap-4"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className={`font-semibold text-base transition-colors duration-200 ${isOpen ? 'text-oxford-700' : 'text-gray-800'}`}>
          {item.q}
        </span>
        <span
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                      ${isOpen ? 'bg-oxford-600 text-white rotate-45' : 'bg-gray-100 text-gray-600 hover:bg-oxford-100 hover:text-oxford-600'}`}
        >
          <Plus size={16} />
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <p className="px-5 md:px-6 pb-5 text-gray-600 text-sm leading-relaxed">
          {item.a}
        </p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="py-24 bg-white" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label">FAQ</span>
          <h2 id="faq-heading" className="section-title">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-lg mx-auto">
            Everything you need to know before you start. Can't find your answer?{' '}
            <a href="https://wa.me/212600000000" className="text-oxford-600 font-semibold hover:underline" target="_blank" rel="noopener noreferrer">
              Chat with us on WhatsApp
            </a>
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <FAQItem
              key={i}
              item={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        {/* Bottom prompt */}
        <div className="mt-12 text-center bg-oxford-50 rounded-3xl p-8 border border-oxford-100">
          <p className="text-oxford-800 font-bold text-lg mb-2">Still have questions?</p>
          <p className="text-gray-500 text-sm mb-5">
            Our advisors are available Mon–Sat, 9am–7pm. We respond within minutes on WhatsApp.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/212600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-3 rounded-full transition-colors duration-200 text-sm"
            >
              💬 WhatsApp Us
            </a>
            <a href="tel:+212600000000" className="btn-secondary text-sm py-3 px-6">
              📞 Call Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
