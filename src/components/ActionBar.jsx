import { CalendarDays, Info, UserPlus, MessageCircle } from 'lucide-react'
import { withHomeHash } from '../utils/homeLink'

const ACTIONS = [
  {
    icon: <CalendarDays size={20} />,
    label: 'Book a Lesson Now',
    href: withHomeHash('contact'),
    bg: 'from-oxford-600 to-blue-600',
    shadow: 'shadow-blue-500/30',
    hoverShadow: 'hover:shadow-blue-500/50',
  },
  {
    icon: <Info size={20} />,
    label: 'Our schools',
    href: withHomeHash('our-schools'),
    bg: 'from-indigo-600 to-oxford-700',
    shadow: 'shadow-indigo-500/30',
    hoverShadow: 'hover:shadow-indigo-500/50',
  },
  {
    icon: <UserPlus size={20} />,
    label: 'Sign Up Today',
    href: withHomeHash('contact'),
    bg: 'from-gold-500 to-orange-500',
    shadow: 'shadow-amber-500/30',
    hoverShadow: 'hover:shadow-amber-500/50',
  },
  {
    icon: <MessageCircle size={20} />,
    label: 'Contact Us',
    href: 'https://wa.me/212600000000',
    bg: 'from-emerald-500 to-green-600',
    shadow: 'shadow-green-500/30',
    hoverShadow: 'hover:shadow-green-500/50',
    external: true,
  },
]

export default function ActionBar() {
  return (
    <section className="relative z-20 -mt-8" aria-label="Quick actions">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {ACTIONS.map(action => (
            <a
              key={action.label}
              href={action.href}
              target={action.external ? '_blank' : undefined}
              rel={action.external ? 'noopener noreferrer' : undefined}
              className={`
                flex flex-col sm:flex-row items-center justify-center gap-2.5 p-4 sm:p-5
                rounded-2xl text-white font-semibold text-sm text-center
                bg-gradient-to-br ${action.bg}
                shadow-lg ${action.shadow} ${action.hoverShadow}
                hover:scale-105 hover:shadow-xl
                transition-all duration-300 group
              `}
            >
              <span className="bg-white/20 p-2 rounded-xl group-hover:bg-white/30 transition-colors duration-200">
                {action.icon}
              </span>
              <span className="leading-tight">{action.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
