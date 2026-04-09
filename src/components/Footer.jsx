import { GraduationCap, Mail, Phone, MapPin, Instagram, Facebook, Youtube, Twitter } from 'lucide-react'

const LINKS = {
  'Learn': [
    { label: 'English Courses',        href: '#branches' },
    { label: 'French Courses',         href: '#branches' },
    { label: 'Kids & Teens',           href: '#branches' },
    { label: 'Online Programs',        href: '#online-offline' },
    { label: 'Classes Préparatoires',  href: '#branches' },
    { label: 'Corporate Training',     href: '#contact' },
  ],
  'Centers': [
    { label: 'Oxford',                 href: '#branches' },
    { label: 'Oxford Academy',         href: '#branches' },
    { label: 'Smart Generations',      href: '#branches' },
    { label: 'Bridge',                 href: '#branches' },
    { label: 'Englishy',               href: '#branches' },
    { label: 'Les Classes Prépa',      href: '#branches' },
  ],
  'Company': [
    { label: 'About Us',               href: '#' },
    { label: 'Our Teachers',           href: '#teachers' },
    { label: 'Careers',                href: 'mailto:careers@oxfordgroup.ma' },
    { label: 'Testimonials',           href: '#testimonials' },
    { label: 'Blog',                   href: '#' },
    { label: 'Privacy Policy',         href: '#' },
  ],
}

const SOCIALS = [
  { icon: <Instagram size={18} />, href: '#', label: 'Instagram', color: 'hover:text-pink-400' },
  { icon: <Facebook  size={18} />, href: '#', label: 'Facebook',  color: 'hover:text-blue-400' },
  { icon: <Youtube   size={18} />, href: '#', label: 'YouTube',   color: 'hover:text-red-400'  },
  { icon: <Twitter   size={18} />, href: '#', label: 'Twitter',   color: 'hover:text-sky-400'  },
]

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400" aria-label="Site footer">
      {/* Final CTA band */}
      <div className="bg-gradient-to-r from-oxford-800 via-oxford-700 to-blue-600 py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            Ready to Start Learning? 🚀
          </h2>
          <p className="text-blue-200 mb-8 text-lg">
            Join 5,000+ students. Your first consultation is completely free.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#contact" className="btn-gold text-base py-4 px-9 font-bold shadow-xl">
              Enroll Now
            </a>
            <a
              href="https://wa.me/212600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg text-base"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">

          {/* Brand column */}
          <div className="col-span-2 lg:col-span-2">
            <a href="#home" className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-oxford-600 to-blue-500 flex items-center justify-center">
                <GraduationCap size={22} className="text-white" />
              </div>
              <div>
                <span className="block text-lg font-bold text-white">Oxford <span className="text-gold-400">Group</span></span>
                <span className="block text-[10px] text-gray-500 uppercase tracking-widest">Language Center</span>
              </div>
            </a>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Morocco's leading language education group. Empowering students since 2010 to communicate confidently with the world.
            </p>

            {/* Contact info */}
            <div className="space-y-2.5 text-sm mb-6">
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-oxford-400 flex-shrink-0" />
                <a href="tel:+212600000000" className="hover:text-white transition-colors duration-200">+212 600 000 000</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-oxford-400 flex-shrink-0" />
                <a href="mailto:info@oxfordgroup.ma" className="hover:text-white transition-colors duration-200">info@oxfordgroup.ma</a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-oxford-400 flex-shrink-0 mt-0.5" />
                <span>10+ locations across Morocco</span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className={`w-9 h-9 rounded-xl bg-gray-800 flex items-center justify-center transition-all duration-200 ${s.color} hover:bg-gray-700 hover:scale-110`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(LINKS).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-white font-bold text-sm mb-5 uppercase tracking-widest">{group}</h3>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} Oxford Group. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
