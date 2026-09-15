import React, { useState, useEffect } from 'react'
import { Mail, ArrowDown, Terminal, Cloud, Server, Code2, GitBranch, Cpu, Database, Network, Monitor } from 'lucide-react'
import { siGithub, siGmail, siZalo } from 'simple-icons'

const LinkedinLogo = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" role="img" aria-hidden="true">
    <path fill="#0A66C2" d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.42v1.57h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.41a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.04H3.54V8.98H7.1v11.47Z" />
  </svg>
)

const SimpleBrandLogo = ({ icon, className = '' }) => (
  <svg className={`w-7 h-7 ${className}`} viewBox="0 0 24 24" role="img" aria-hidden="true" style={className ? undefined : { color: `#${icon.hex}` }}>
    <path fill="currentColor" d={icon.path} />
  </svg>
)

const Hero = () => {
  const [typedText, setTypedText] = useState('')
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const roles = ['CI/CD Automation Enthusiast', 'Cloud & Infrastructure Learner', 'Containers & Kubernetes Explorer']
  
  useEffect(() => {
    let timeout
    const currentRole = roles[currentRoleIndex]
    
    if (typedText.length < currentRole.length) {
      timeout = setTimeout(() => {
        setTypedText(currentRole.slice(0, typedText.length + 1))
      }, 100)
    } else {
      timeout = setTimeout(() => {
        setTypedText('')
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
      }, 2000)
    }
    
    return () => clearTimeout(timeout)
  }, [typedText, currentRoleIndex])

  const techIcons = [
    { icon: <Terminal className="w-8 h-8" />, name: 'Terminal', color: 'text-green-500', delay: '0s' },
    { icon: <Cloud className="w-8 h-8" />, name: 'Cloud', color: 'text-blue-500', delay: '0.5s' },
    { icon: <Server className="w-8 h-8" />, name: 'Server', color: 'text-purple-500', delay: '1s' },
    { icon: <Code2 className="w-8 h-8" />, name: 'Code', color: 'text-orange-500', delay: '1.5s' },
    { icon: <GitBranch className="w-8 h-8" />, name: 'Git', color: 'text-red-500', delay: '2s' },
    { icon: <Cpu className="w-8 h-8" />, name: 'CPU', color: 'text-cyan-500', delay: '2.5s' },
    { icon: <Database className="w-8 h-8" />, name: 'Database', color: 'text-indigo-500', delay: '3s' },
    { icon: <Network className="w-8 h-8" />, name: 'Network', color: 'text-pink-500', delay: '3.5s' },
  ]

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 pb-6">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-5"></div>
      
      {/* Floating Tech Icons Background */}
      <div className="absolute inset-0 overflow-hidden">
        {techIcons.map((tech, index) => (
          <div
            key={index}
            className={`absolute ${tech.color} opacity-10 dark:opacity-5 animate-float`}
            style={{
              left: `${(index * 12) % 90}%`,
              top: `${(index * 15) % 80}%`,
              animationDelay: tech.delay,
              animationDuration: '10s'
            }}
          >
            {tech.icon}
          </div>
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 xl:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-full text-green-700 dark:text-green-400 text-sm font-medium backdrop-blur-sm shadow-sm mb-4 animate-fade-in">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Sẵn sàng cho cơ hội mới
            </div>

            {/* Fixed Role Title */}
            <div className="relative min-h-[108px] sm:min-h-[124px] mb-3 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <h1 className="font-bold tracking-[-0.035em] leading-[0.98] text-5xl sm:text-6xl lg:text-[64px]">
                <span className="block text-gray-900 dark:text-white">DevOps</span>
                <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-500 dark:from-blue-400 dark:via-cyan-300 dark:to-indigo-400 bg-clip-text text-transparent">Engineer</span>
              </h1>
            </div>

            {/* Typing Specialization */}
            <div className="flex min-h-10 sm:min-h-7 items-center justify-center lg:justify-start gap-2 mb-4 animate-fade-in-up" style={{animationDelay: '0.35s'}}>
              <span className="w-8 h-px shrink-0 bg-gradient-to-r from-blue-600 to-cyan-400"></span>
              <p className="text-sm sm:text-base font-semibold tracking-wide text-cyan-600 dark:text-cyan-400">
                {typedText}<span className="inline-block ml-1 w-0.5 h-5 bg-cyan-500 align-middle animate-blink"></span>
              </p>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0 mb-5 leading-6 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
              Tôi là <span className="font-semibold text-gray-900 dark:text-white">Phạm Đức Lương</span>, Junior DevOps Engineer tại Hà Nội theo định hướng thực chiến. Tập trung vào <span className="font-semibold text-blue-600 dark:text-blue-400">Linux, Kubernetes, CI/CD GitOps</span> và hạ tầng Cloud để tự động hóa quy trình vận hành.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 mb-5 animate-fade-in-up" style={{animationDelay: '0.65s'}}>
              <button
                type="button"
                onClick={() => {
                  const el = window.innerWidth < 768
                    ? document.getElementById('recent-articles')
                    : (document.getElementById('featured-projects') || document.getElementById('recent-articles'))
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
                className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/30"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Terminal className="w-4 h-4" />
                  Dự Án &amp; Bài Viết
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('contact-cta')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
                className="group relative px-6 py-3 bg-white/80 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold text-sm rounded-xl backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-0.5 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  Kết Nối Ngay
                </span>
              </button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start gap-4 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
              <a
                href="https://github.com/ducluong16"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="group relative p-3 bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 rounded-xl backdrop-blur-sm hover:border-gray-500 dark:hover:border-gray-400 transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-gray-950/40 inline-flex items-center justify-center"
              >
                <SimpleBrandLogo icon={siGithub} className="text-gray-900 dark:text-white" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="group relative p-3 bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 rounded-xl backdrop-blur-sm hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20 inline-flex items-center justify-center"
              >
                <LinkedinLogo />
              </a>
              <a
                href="mailto:ducluong16@gmail.com"
                aria-label="Send Email"
                className="group relative p-3 bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 rounded-xl backdrop-blur-sm hover:border-red-400 dark:hover:border-red-500 transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/20 inline-flex items-center justify-center"
              >
                <SimpleBrandLogo icon={siGmail} />
              </a>
              <a
                href="https://zalo.me"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Zalo"
                className="group relative p-3 bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 rounded-xl backdrop-blur-sm hover:border-sky-400 dark:hover:border-sky-500 transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-500/20 inline-flex items-center justify-center"
              >
                <SimpleBrandLogo icon={siZalo} />
              </a>
            </div>
          </div>

          {/* Right Side - DevOps Lab */}
          <div className="hidden lg:block relative animate-fade-in" style={{animationDelay: '0.5s'}}>
            <div className="absolute -inset-8 bg-gradient-to-r from-blue-500/20 via-purple-500/15 to-cyan-500/20 rounded-full blur-3xl"></div>
            <div className="relative rounded-[2rem] p-[1px] bg-gradient-to-br from-blue-400/70 via-purple-500/40 to-cyan-400/60 shadow-2xl shadow-blue-500/20">
              <div className="relative overflow-hidden rounded-[calc(2rem-1px)] bg-white/90 dark:bg-gray-900/95 backdrop-blur-xl p-5">
                <div className="absolute inset-0 opacity-40 dark:opacity-20 bg-grid-pattern"></div>

                <div className="relative flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                      <Terminal className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">DevOps Lab</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">learning • building • improving</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">Lab online</span>
                  </div>
                </div>

                <div className="relative bg-[#0b1220] rounded-2xl overflow-hidden border border-slate-700/80 shadow-xl">
                  <div className="flex items-center px-4 py-3 bg-slate-800/90 border-b border-slate-700">
                    <div className="flex gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    </div>
                    <span className="mx-auto pr-12 text-xs text-slate-400 font-mono">devops@lab:~/portfolio</span>
                  </div>
                  <div className="p-4 font-mono text-[12px] xl:text-[13px] leading-5 min-h-[190px] text-slate-300">
                    <p><span className="text-purple-400">const</span> <span className="text-cyan-300">devOpsEngineer</span> <span className="text-slate-500">=</span> <span className="text-amber-300">{'{'}</span></p>
                    <p className="pl-4"><span className="text-blue-300">name</span><span className="text-slate-500">:</span> <span className="text-emerald-300">&quot;Phạm Đức Lương&quot;</span><span className="text-slate-500">,</span></p>
                    <p className="pl-4"><span className="text-blue-300">role</span><span className="text-slate-500">:</span> <span className="text-emerald-300">&quot;Junior DevOps Engineer&quot;</span><span className="text-slate-500">,</span></p>
                    <p className="pl-4"><span className="text-blue-300">location</span><span className="text-slate-500">:</span> <span className="text-emerald-300">&quot;Hanoi, Vietnam&quot;</span><span className="text-slate-500">,</span></p>
                    <p className="pl-4"><span className="text-blue-300">skills</span><span className="text-slate-500">:</span> <span className="text-amber-300">[</span></p>
                    <p className="pl-8 text-emerald-300">&quot;Linux&quot;, &quot;Docker&quot;, &quot;Kubernetes&quot;,</p>
                    <p className="pl-8 text-emerald-300">&quot;CI/CD&quot;, &quot;Terraform&quot;, &quot;Cloud&quot;</p>
                    <p className="pl-4"><span className="text-amber-300">]</span><span className="text-slate-500">,</span></p>
                    <p className="pl-4"><span className="text-blue-300">status</span><span className="text-slate-500">:</span> <span className="text-emerald-400">&quot;Learning & Building...&quot;</span></p>
                    <p><span className="text-amber-300">{'}'}</span><span className="text-slate-500">;</span><span className="inline-block ml-2 w-2 h-4 bg-cyan-400 align-middle animate-blink"></span></p>
                  </div>
                </div>

                <div className="relative grid grid-cols-4 gap-3 mt-4">
                  {[
                    { label: 'Plan', icon: Code2, color: 'text-violet-500', bg: 'from-violet-50 to-purple-50 dark:from-violet-950/50 dark:to-purple-950/30' },
                    { label: 'Build', icon: GitBranch, color: 'text-blue-500', bg: 'from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/30' },
                    { label: 'Deploy', icon: Cloud, color: 'text-cyan-500', bg: 'from-cyan-50 to-sky-50 dark:from-cyan-950/50 dark:to-sky-950/30' },
                    { label: 'Observe', icon: Monitor, color: 'text-emerald-500', bg: 'from-emerald-50 to-green-50 dark:from-emerald-950/50 dark:to-green-950/30' }
                  ].map(({ label, icon: StageIcon, color, bg }) => (
                    <div key={label} className={`group flex flex-col items-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-br ${bg} border border-white/70 dark:border-gray-700/70 hover:-translate-y-1 transition-all duration-300`}>
                      <StageIcon className={`w-5 h-5 ${color} group-hover:scale-110 transition-transform`} />
                      <span className="text-[11px] font-semibold text-gray-600 dark:text-gray-300">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute -right-5 -top-7 flex items-center gap-3 p-3 pr-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl animate-float">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-[2px]">
                  <div className="w-full h-full rounded-[10px] bg-white dark:bg-gray-900 flex items-center justify-center text-sm font-bold bg-clip-padding">PL</div>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 dark:text-white">Build. Learn. Repeat.</p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">One commit at a time</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById('stats-overview')
            if (el) el.scrollIntoView({ behavior: 'smooth' })
          }}
          aria-label="Cuộn xuống xem nội dung"
          className="hidden sm:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer animate-bounce items-center justify-center text-gray-400 hover:text-blue-500 dark:text-gray-500 dark:hover:text-blue-400"
        >
          <ArrowDown className="w-5 h-5" />
        </button>
      </div>
    </section>
  )
}

export default Hero
