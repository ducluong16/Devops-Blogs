import React, { useState } from 'react'
import { Mail, Copy, Check, Terminal, Github, MapPin, Send, ExternalLink } from 'lucide-react'
import { siGithub, siZalo } from 'simple-icons'
import { notifyNotice } from '../../ui/ToastNotice'

const SimpleBrandLogo = ({ icon, className = '' }) => (
  <svg className={`w-4 h-4 ${className}`} viewBox="0 0 24 24" role="img" aria-hidden="true" fill="currentColor">
    <path d={icon.path} />
  </svg>
)

export default function HomeCta() {
  const [copied, setCopied] = useState(false)
  const email = 'luongpham162k@gmail.com'

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    notifyNotice('Thông tin liên hệ', `Đã sao chép email: ${email}!`)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <section id="contact-cta" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-gray-50/50 via-white to-blue-50/30 dark:from-gray-900/50 dark:via-gray-900 dark:to-gray-950 border-t border-gray-200/60 dark:border-gray-800/80">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="relative rounded-3xl p-[1px] bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 shadow-2xl shadow-blue-500/10">
          <div className="rounded-[calc(1.5rem-1px)] bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl p-8 sm:p-12 lg:p-14 text-center relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>

            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              STATUS: OPEN_FOR_OPPORTUNITY
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-5">
              Ready to build.{' '}
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 dark:from-blue-400 dark:via-cyan-300 dark:to-indigo-400 bg-clip-text text-transparent">
                Ready for the next challenge.
              </span>
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              Mở cửa cho cơ hội nghề nghiệp và những dự án mới trong Cloud & DevOps. Có một dự án thú vị? Hãy cùng trao đổi.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
              {/* Copy Email Button */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 shadow-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">Đã sao chép Email!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Sao chép: {email}</span>
                  </>
                )}
              </button>

              {/* Send Mail Button */}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  notifyNotice('Thông tin liên hệ', 'Địa chỉ email hiện chưa được cập nhật!')
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <Send className="w-4 h-4" />
                <span>Gửi Email Trực Tiếp</span>
              </a>

              {/* GitHub Button */}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  notifyNotice('Thông tin liên hệ', 'Liên kết GitHub hiện chưa được cập nhật!')
                }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-gray-400 transition-all duration-200"
              >
                <SimpleBrandLogo icon={siGithub} />
                <span>GitHub Profile</span>
              </a>

              {/* Zalo Button */}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  notifyNotice('Thông tin liên hệ', 'Địa chỉ Zalo hiện chưa được cập nhật!')
                }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 hover:border-sky-400 transition-all duration-200"
              >
                <SimpleBrandLogo icon={siZalo} />
                <span>Nhắn qua Zalo</span>
              </a>
            </div>

            {/* Quick Meta Info */}
            <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-6 border-t border-gray-200/80 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                Hà Nội, Việt Nam
              </span>
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-blue-500" />
                DevOps Engineer • Cloud &amp; Infrastructure
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
