import React from 'react'
import { ArrowUp, Code2, MapPin } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative overflow-hidden border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" aria-hidden="true"></div>
      <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" aria-hidden="true"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
        <div className="flex items-end justify-between gap-6">
          <div className="min-w-0 space-y-3">
            <div>
              <p className="text-sm font-semibold text-slate-200">
                © {currentYear} Phạm Đức Lương
              </p>
              <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500">
                Junior DevOps Engineer focused on Linux, containers, CI/CD automation and reliable cloud infrastructure.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-cyan-500" />
                Hanoi, Vietnam
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Code2 className="h-3.5 w-3.5 text-purple-400" />
                Built with React, Vite &amp; Tailwind CSS
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/60" />
                Available for opportunities
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-slate-400 transition-all hover:-translate-y-0.5 hover:border-blue-500 hover:text-blue-400 hover:shadow-lg hover:shadow-blue-500/10"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
