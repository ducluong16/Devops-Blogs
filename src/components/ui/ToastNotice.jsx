import React, { useState, useEffect } from 'react'
import { AlertCircle, Clock, Info, X } from 'lucide-react'

export const notifyNotice = (title, message) => {
  window.dispatchEvent(
    new CustomEvent('app-toast-notice', {
      detail: { title, message }
    })
  )
}

export default function ToastNotice() {
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const handleToast = (event) => {
      const { title, message } = event.detail || {}
      setToast({
        id: Date.now(),
        title: title || 'Thông báo',
        message: message || 'Tính năng hiện chưa khả dụng!'
      })
    }

    window.addEventListener('app-toast-notice', handleToast)
    return () => window.removeEventListener('app-toast-notice', handleToast)
  }, [])

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => {
      setToast(null)
    }, 3500)
    return () => clearTimeout(timer)
  }, [toast])

  if (!toast) return null

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-[9999] max-w-sm w-full animate-bounce-in">
      <div className="relative overflow-hidden rounded-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl p-4 border border-amber-500/40 shadow-2xl shadow-amber-500/10 flex items-start gap-3">
        {/* Glow Accent */}
        <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-amber-500 via-orange-500 to-amber-600"></div>

        {/* Icon */}
        <div className="w-9 h-9 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
          <Clock className="w-5 h-5" />
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0 pr-2">
          <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-snug">
            {toast.title}
          </h4>
          <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5 leading-relaxed">
            {toast.message}
          </p>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={() => setToast(null)}
          className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          aria-label="Đóng thông báo"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
