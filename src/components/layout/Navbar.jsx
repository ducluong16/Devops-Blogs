import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, Moon, Sun, Terminal, X } from 'lucide-react'
import { pageVisibility } from '../../config/pageVisibility'

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const navItems = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: 'Giới thiệu', path: '/about', visible: pageVisibility.about },
    { name: 'Kỹ năng', path: '/skills' },
    { name: 'Kinh nghiệm', path: '/experience' },
    { name: 'Chứng chỉ', path: '/certifications', visible: pageVisibility.certifications },
    { name: 'Dự án', path: '/projects' },
    { name: 'Liên hệ', path: '/contact', visible: pageVisibility.contact }
  ].filter((item) => item.visible !== false)

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const isActive = (path) => path === '/'
    ? location.pathname === '/'
    : location.pathname === path || location.pathname.startsWith(`${path}/`)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="relative flex justify-between items-center h-14 sm:h-16 px-3 sm:px-5 rounded-2xl bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl border border-gray-200/80 dark:border-gray-700/70 shadow-lg shadow-gray-900/5 dark:shadow-black/20">
          {/* Logo/Avatar */}
          <Link to="/" className="group flex items-center gap-2.5 shrink-0">
            <div className="relative w-9 h-9 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:rotate-3 group-hover:scale-105 transition-transform">
              <Terminal className="w-5 h-5 text-white" />
              <span className="absolute -right-0.5 -bottom-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white dark:border-gray-950"></span>
            </div>
            <div className="hidden sm:block leading-tight">
              <span className="block font-bold text-sm text-gray-900 dark:text-white">Phạm Đức Lương</span>
              <span className="block text-[10px] font-medium tracking-wide text-gray-500 dark:text-gray-400">DEVOPS PORTFOLIO</span>
            </div>
          </Link>

          {/* Navigation Items */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 p-1.5 rounded-xl bg-gray-100/80 dark:bg-gray-900/90 border border-gray-200/70 dark:border-gray-700/70 shadow-inner">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 lg:px-4 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? 'text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md shadow-blue-500/25'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-gray-800'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side - Theme toggle and availability */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleDarkMode}
              aria-label={darkMode ? 'Bật giao diện sáng' : 'Bật giao diện tối'}
              className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:-translate-y-0.5 transition-all duration-200"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
            
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
                <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">Sẵn sàng</span>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden absolute top-[64px] sm:top-[72px] left-0 right-0 p-2 rounded-2xl bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-2xl max-h-[calc(100dvh-150px)] overflow-y-auto overscroll-contain">
              <div className="grid grid-cols-2 gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl text-sm font-semibold transition-colors ${
                      isActive(item.path)
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
