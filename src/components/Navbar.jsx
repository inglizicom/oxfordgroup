import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, GraduationCap } from 'lucide-react'
import { withHomeHash } from '../utils/homeLink'

const NAV_LINKS = [
  { label: 'Home',         href: '#home' },
  { label: 'Our schools',  href: '#our-schools' },
  { label: 'Teachers',     href: '#teachers' },
  { label: 'Students',     href: '#testimonials' },
  {
    label: 'Programs',
    href: '#our-schools',
    children: [
      { label: 'English & French',      href: '#our-schools' },
      { label: 'Classes Préparatoires', href: '#placement' },
      { label: 'Placement test',        href: '#placement' },
      { label: 'Our cities',            href: '#map' },
    ],
  },
]

function sectionHref(h) {
  if (h.startsWith('#')) return withHomeHash(h.slice(1))
  return h
}

export default function Navbar() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [open,        setOpen]        = useState(false)
  const [scrolled,    setScrolled]    = useState(false)
  const [activeNav,   setActiveNav]   = useState('home')
  const [dropdownOpen, setDropdownOpen] = useState(null)
  const lightOnHero = isHome && !scrolled

  useEffect(() => {
    const onScroll = () => {
      if (isHome) {
        setScrolled(window.scrollY > 20)
        const sections = ['home', 'our-schools', 'teachers', 'map', 'testimonials', 'placement', 'contact']
        for (const id of sections) {
          const sectionEl = document.getElementById(id)
          if (sectionEl) {
            const rect = sectionEl.getBoundingClientRect()
            if (rect.top <= 100 && rect.bottom >= 100) {
              setActiveNav(id)
              break
            }
          }
        }
      }
      const bar = document.getElementById('scroll-progress')
      if (bar) {
        const total = document.body.scrollHeight - window.innerHeight
        const pct = total > 0 ? (window.scrollY / total) * 100 : 0
        bar.style.width = `${pct}%`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  const navClass = (lightOnHero
    ? 'bg-transparent'
    : 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100')

  return (
    <>
      {/* Scroll progress */}
      <div id="scroll-progress" style={{ width: 0 }} />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navClass}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* ── Logo ─────────────────────────────────────── */}
            <Link to="/" className="flex items-center gap-2.5 group" aria-label="Oxford Group – Home">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-oxford-700 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                <GraduationCap size={22} className="text-white" />
              </div>
              <div className="leading-tight">
                <span className={`block text-lg font-bold tracking-tight transition-colors duration-300 ${lightOnHero ? 'text-white' : 'text-oxford-800'}`}>
                  Oxford <span className="text-gold-500">Group</span>
                </span>
                <span className={`block text-[10px] font-medium tracking-widest uppercase transition-colors duration-300 ${lightOnHero ? 'text-blue-200' : 'text-gray-400'}`}>
                  Language Center
                </span>
              </div>
            </Link>

            {/* ── Desktop links ─────────────────────────────── */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(link => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.children && setDropdownOpen(link.label)}
                  onMouseLeave={() => setDropdownOpen(null)}
                >
                  <a
                    href={sectionHref(link.href)}
                    className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                      ${activeNav === link.href.replace('#', '')
                        ? (lightOnHero ? 'text-white bg-white/20' : 'text-oxford-700 bg-oxford-50')
                        : (lightOnHero ? 'text-blue-100 hover:text-white hover:bg-white/20' : 'text-gray-600 hover:text-oxford-700 hover:bg-oxford-50')
                      }`}
                    aria-current={activeNav === link.href.replace('#', '') ? 'page' : undefined}
                  >
                    {link.label}
                    {link.children && <ChevronDown size={14} className={`transition-transform duration-200 ${dropdownOpen === link.label ? 'rotate-180' : ''}`} />}
                  </a>

                  {/* Dropdown */}
                  {link.children && dropdownOpen === link.label && (
                    <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-slide-up">
                      {link.children.map(child => (
                        <a
                          key={child.label}
                          href={sectionHref(child.href)}
                          className="block px-5 py-3 text-sm text-gray-700 hover:bg-oxford-50 hover:text-oxford-700 transition-colors duration-150"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* ── CTA ──────────────────────────────────────── */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={withHomeHash('contact')}
                className={`text-sm font-medium transition-colors duration-200 ${lightOnHero ? 'text-blue-100 hover:text-white' : 'text-gray-600 hover:text-oxford-700'}`}
              >
                Log In
              </a>
              <a
                href={withHomeHash('contact')}
                className="btn-primary text-sm py-2.5 px-5"
              >
                Start Learning →
              </a>
            </div>

            {/* ── Mobile toggle ─────────────────────────────── */}
            <button
              className={`lg:hidden p-2 rounded-xl transition-colors duration-200 ${lightOnHero ? 'text-white hover:bg-white/20' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setOpen(prev => !prev)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* ── Mobile drawer ─────────────────────────────────── */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-screen' : 'max-h-0'} bg-white border-t border-gray-100`}
        >
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map(link => (
              <div key={link.label}>
                <a
                  href={sectionHref(link.href)}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-oxford-50 hover:text-oxford-700 transition-colors duration-150"
                >
                  {link.label}
                </a>
                {link.children && (
                  <div className="ml-6 mt-1 space-y-1">
                    {link.children.map(child => (
                      <a
                        key={child.label}
                        href={sectionHref(child.href)}
                        onClick={() => setOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-500 hover:text-oxford-700 hover:bg-oxford-50 rounded-lg transition-colors"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
              <a href={withHomeHash('contact')} onClick={() => setOpen(false)} className="btn-primary justify-center">
                Start Learning →
              </a>
              <a href={withHomeHash('placement')} onClick={() => setOpen(false)} className="btn-secondary justify-center">
                Take Placement Test
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
