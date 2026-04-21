import { useState } from 'react'
import { MapPin, X } from 'lucide-react'

/* City pin positions (percentage of SVG viewBox 0 0 400 500) */
const CITIES = [
  {
    id: 1,
    name: 'Casablanca',
    x: 110, y: 200,
    branches: ['Oxford', 'Les Classes Préparatoires'],
    students: '2,100+',
    phone: '+212 600 000 001',
  },
  {
    id: 2,
    name: 'Rabat',
    x: 105, y: 175,
    branches: ['Oxford', 'Oxford Academy'],
    students: '800+',
    phone: '+212 600 000 002',
  },
  {
    id: 3,
    name: 'Marrakech',
    x: 140, y: 275,
    branches: ['Oxford Academy', 'Smart Generations'],
    students: '650+',
    phone: '+212 600 000 003',
  },
  {
    id: 4,
    name: 'Fès',
    x: 185, y: 150,
    branches: ['Smart Generations'],
    students: '420+',
    phone: '+212 600 000 004',
  },
  {
    id: 5,
    name: 'Tanger',
    x: 130, y: 100,
    branches: ['Englishy'],
    students: '380+',
    phone: '+212 600 000 005',
  },
  {
    id: 6,
    name: 'Agadir',
    x: 105, y: 330,
    branches: ['Oxford Academy', 'Bridge'],
    students: '310+',
    phone: '+212 600 000 006',
  },
  {
    id: 7,
    name: 'Meknès',
    x: 168, y: 158,
    branches: ['Smart Generations'],
    students: '280+',
    phone: '+212 600 000 007',
  },
  {
    id: 8,
    name: 'Oujda',
    x: 268, y: 148,
    branches: ['Bridge'],
    students: '200+',
    phone: '+212 600 000 008',
  },
  {
    id: 9,
    name: 'Tétouan',
    x: 148, y: 95,
    branches: ['Englishy'],
    students: '240+',
    phone: '+212 600 000 009',
  },
  {
    id: 10,
    name: 'Nador',
    x: 230, y: 100,
    branches: ['Bridge'],
    students: '170+',
    phone: '+212 600 000 010',
  },
  {
    id: 11,
    name: 'Safi',
    x: 100, y: 245,
    branches: ['Oxford'],
    students: '150+',
    phone: '+212 600 000 011',
  },
]

/* Simplified Morocco SVG outline path */
const MOROCCO_PATH = `
  M 148 72 L 158 68 L 172 70 L 185 68 L 200 72 L 220 70 L 238 75
  L 255 80 L 268 88 L 278 100 L 280 115 L 275 128 L 278 140
  L 285 150 L 290 165 L 288 178 L 280 188 L 270 192
  L 265 205 L 260 220 L 258 238 L 250 252 L 238 260
  L 222 268 L 208 278 L 195 290 L 182 302 L 170 315
  L 160 328 L 148 342 L 138 355 L 128 368 L 118 380
  L 108 368 L 98 350 L 88 335 L 80 315 L 76 298
  L 72 280 L 75 262 L 78 245 L 80 228 L 82 210
  L 80 192 L 76 178 L 72 162 L 70 145 L 72 130
  L 78 115 L 85 100 L 95 88 L 108 80 L 122 74 Z
`

export default function MoroccoMap() {
  const [selected, setSelected] = useState(null)
  const [hovered,  setHovered]  = useState(null)

  const activeCity = selected ?? hovered

  return (
    <section
      id="map"
      className="py-24 bg-gradient-to-b from-oxford-900 via-oxford-800 to-oxford-900 relative overflow-hidden border-t border-slate-200/20"
      aria-labelledby="map-heading"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-gold-400 bg-gold-400/10 px-4 py-1.5 rounded-full mb-4">
            Nationwide Presence
          </span>
          <h2 id="map-heading" className="section-title text-white">
            Oxford Group Across <span style={{ color: '#f59e0b' }}>Morocco</span>
          </h2>
          <p className="mt-4 text-oxford-300 max-w-lg mx-auto text-lg">
            10+ cities, one mission — making world-class language education accessible to every Moroccan.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── SVG Map ──────────────────────────────────────── */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-md mx-auto">
              <svg
                viewBox="60 60 240 340"
                className="w-full drop-shadow-2xl"
                aria-label="Interactive map of Morocco showing Oxford Group branch locations"
              >
                {/* Country fill */}
                <path
                  d={MOROCCO_PATH}
                  fill="rgba(30,58,138,0.6)"
                  stroke="rgba(99,155,255,0.5)"
                  strokeWidth="1.5"
                />

                {/* City pins */}
                {CITIES.map(city => {
                  const isActive = activeCity?.id === city.id
                  return (
                    <g key={city.id}>
                      {/* Ping ring */}
                      {isActive && (
                        <circle
                          cx={city.x}
                          cy={city.y}
                          r={12}
                          fill="rgba(245,158,11,0.2)"
                          style={{ animation: 'ping 1.5s cubic-bezier(0,0,0.2,1) infinite' }}
                        />
                      )}

                      {/* Pin dot */}
                      <circle
                        cx={city.x}
                        cy={city.y}
                        r={isActive ? 7 : 5}
                        fill={isActive ? '#f59e0b' : '#60a5fa'}
                        stroke="white"
                        strokeWidth="1.5"
                        className="cursor-pointer transition-all duration-200"
                        onMouseEnter={() => setHovered(city)}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() => setSelected(selected?.id === city.id ? null : city)}
                        style={{ filter: isActive ? 'drop-shadow(0 0 8px rgba(245,158,11,0.8))' : 'none' }}
                      />

                      {/* City label */}
                      <text
                        x={city.x}
                        y={city.y - 10}
                        textAnchor="middle"
                        fontSize="6"
                        fill={isActive ? '#f59e0b' : 'rgba(255,255,255,0.7)'}
                        fontWeight={isActive ? 'bold' : 'normal'}
                        className="pointer-events-none select-none transition-all duration-200"
                      >
                        {city.name}
                      </text>
                    </g>
                  )
                })}
              </svg>
            </div>
          </div>

          {/* ── Info panel ──────────────────────────────────── */}
          <div className="space-y-4">

            {/* Active city card */}
            {activeCity ? (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6 animate-fade-in">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin size={18} className="text-gold-400" />
                      <h3 className="text-xl font-bold text-white">{activeCity.name}</h3>
                    </div>
                    <p className="text-oxford-300 text-sm">{activeCity.students} students enrolled</p>
                  </div>
                  {selected && (
                    <button
                      onClick={() => setSelected(null)}
                      className="text-white/50 hover:text-white transition-colors"
                      aria-label="Close city info"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>

                <div className="mb-4">
                  <p className="text-oxford-300 text-xs uppercase tracking-widest mb-2">Branches</p>
                  <div className="flex flex-wrap gap-2">
                    {activeCity.branches.map(b => (
                      <span
                        key={b}
                        className="text-sm bg-gold-500/20 text-gold-300 border border-gold-500/30 px-3 py-1 rounded-full font-medium"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-oxford-200">
                  <span>📞</span>
                  <span>{activeCity.phone}</span>
                </div>

                <a
                  href="#contact"
                  className="mt-5 block w-full text-center py-3 rounded-2xl bg-gold-500 hover:bg-gold-400 text-oxford-900 font-bold text-sm transition-colors duration-200"
                >
                  Enroll in {activeCity.name}
                </a>
              </div>
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center">
                <div className="text-4xl mb-3">🗺️</div>
                <p className="text-oxford-300 text-sm">
                  Hover over a city or tap a pin to see branch details
                </p>
              </div>
            )}

            {/* City list */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CITIES.map(city => (
                <button
                  key={city.id}
                  onClick={() => setSelected(selected?.id === city.id ? null : city)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all duration-200
                              ${selected?.id === city.id
                                ? 'bg-gold-500 text-oxford-900'
                                : 'bg-white/10 text-oxford-200 hover:bg-white/20 hover:text-white'
                              }`}
                >
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${selected?.id === city.id ? 'bg-oxford-900' : 'bg-blue-400'}`} />
                  {city.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
