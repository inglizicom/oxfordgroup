import { useState } from 'react'
import { X } from 'lucide-react'

export default function WhatsAppButton() {
  const [open,    setOpen]    = useState(false)
  const [message, setMessage] = useState('')

  const WA_NUMBER = '212600000000'
  const DEFAULT_MSG = "Hello Oxford Group! I'm interested in learning more about your courses."

  const send = () => {
    const text = encodeURIComponent(message.trim() || DEFAULT_MSG)
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank', 'noopener,noreferrer')
    setOpen(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3">

      {/* Chat popup */}
      {open && (
        <div className="w-72 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-green-500 px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">🧑‍💼</div>
              <div>
                <p className="text-white font-bold text-sm">Oxford Group</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
                  <span className="text-green-100 text-xs">Usually replies in minutes</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Close WhatsApp chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat bubble */}
          <div className="p-4 bg-[#e5ddd5]">
            <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm max-w-[85%]">
              <p className="text-gray-800 text-sm leading-relaxed">
                👋 Hi! Ready to start your language journey with <strong>Oxford Group</strong>? Send us a message and we'll get back to you right away!
              </p>
              <p className="text-gray-400 text-[10px] mt-1.5 text-right">Oxford Group · Now</p>
            </div>
          </div>

          {/* Input */}
          <div className="p-4 bg-gray-50">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Type a message…"
                className="flex-1 px-4 py-2.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 bg-white"
                aria-label="WhatsApp message"
              />
              <button
                onClick={send}
                className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center text-white transition-colors duration-200 flex-shrink-0"
                aria-label="Send WhatsApp message"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width={18} height={18}>
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
            <p className="text-[10px] text-gray-400 mt-2 text-center">
              Continue on WhatsApp after clicking send
            </p>
          </div>
        </div>
      )}

      {/* Main FAB button */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className="whatsapp-btn w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Open WhatsApp chat"
        aria-expanded={open}
      >
        {open ? (
          <X size={22} className="text-white" />
        ) : (
          <svg viewBox="0 0 24 24" fill="white" width={28} height={28} aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        )}
      </button>

      {/* Notification dot */}
      {!open && (
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-white text-white text-[9px] flex items-center justify-center font-bold animate-bounce-slow">
          1
        </span>
      )}
    </div>
  )
}
