import React, { useState, useEffect } from 'react'
import { Github, Linkedin, Mail, ArrowDown, MapPin, Terminal, Cloud, Server, Code2, GitBranch, Cpu, Database, Network } from 'lucide-react'

const Hero = () => {
  const [typedText, setTypedText] = useState('')
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const roles = ['DevOps Engineer', 'Cloud Architect', 'Infrastructure Specialist', 'CI/CD Expert']
  
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

  const stats = [
    { value: '5+', label: 'Years Experience' },
    { value: '50+', label: 'Projects Deployed' },
    { value: '99.9%', label: 'Uptime Achievement' },
    { value: '20+', label: 'Technologies' }
  ]

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-16">
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
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-full text-green-700 dark:text-green-400 text-sm font-medium backdrop-blur-sm shadow-sm mb-6 animate-fade-in">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Available for opportunities
            </div>

            {/* Greeting */}
            <div className="mb-4 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <span className="text-gray-600 dark:text-gray-400 text-lg font-medium">
                👋 Hi there! I'm
              </span>
            </div>

            {/* Name with 3D Effect */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-2xl animate-gradient">
                Phạm Đức Lương
              </span>
            </h1>

            {/* Typing Animation Role */}
            <div className="relative mb-8 h-16 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white">
                {typedText}
                <span className="animate-blink">|</span>
              </h2>
            </div>
            
            {/* Location */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6 text-gray-600 dark:text-gray-400 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
              <MapPin className="w-5 h-5 text-red-500" />
              <span className="text-lg">Hanoi, Vietnam 🇻🇳</span>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              Passionate about <span className="font-semibold text-blue-600 dark:text-blue-400">automating infrastructure</span>, 
              building <span className="font-semibold text-purple-600 dark:text-purple-400">scalable cloud solutions</span>, 
              and empowering teams with <span className="font-semibold text-pink-600 dark:text-pink-400">modern DevOps practices</span>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-8 animate-fade-in-up" style={{animationDelay: '0.7s'}}>
              <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Terminal className="w-5 h-5" />
                  View My Work
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button className="group relative px-8 py-4 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-xl">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" />
                  Let's Connect
                </span>
              </button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start gap-4 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
              <a href="#" className="group relative p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-gray-900 dark:hover:border-white transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <Github className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors" />
              </a>
              <a href="#" className="group relative p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-600 dark:hover:border-blue-500 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <Linkedin className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors" />
              </a>
              <a href="#" className="group relative p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-purple-600 dark:hover:border-purple-500 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <Mail className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-500 transition-colors" />
              </a>
            </div>
          </div>

          {/* Right Side - Visual Element */}
          <div className="hidden lg:block relative animate-fade-in" style={{animationDelay: '0.5s'}}>
            {/* Floating Card with Tech Stack */}
            <div className="relative">
              {/* Main Card */}
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
                <div className="space-y-6">
                  {/* Terminal Window */}
                  <div className="bg-gray-900 rounded-xl overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="ml-4 text-gray-400 text-sm">terminal</span>
                    </div>
                    <div className="p-4 font-mono text-sm">
                      <div className="text-green-400">$ kubectl get pods</div>
                      <div className="text-gray-400 mt-2">NAME&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;STATUS&nbsp;&nbsp;&nbsp;READY</div>
                      <div className="text-blue-400">app-deployment&nbsp;&nbsp;&nbsp;Running&nbsp;&nbsp;3/3</div>
                      <div className="text-green-400 mt-4 animate-pulse">$ _</div>
                    </div>
                  </div>

                  {/* Tech Icons Grid */}
                  <div className="grid grid-cols-4 gap-4">
                    {techIcons.slice(0, 8).map((tech, index) => (
                      <div
                        key={index}
                        className={`p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl ${tech.color} hover:scale-110 transition-transform duration-300 cursor-pointer shadow-lg hover:shadow-xl`}
                        style={{animationDelay: tech.delay}}
                      >
                        {tech.icon}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Stats Cards */}
              <div className="absolute -top-6 -right-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-4 shadow-2xl animate-float">
                <div className="text-white text-center">
                  <div className="text-3xl font-bold">99.9%</div>
                  <div className="text-sm opacity-90">Uptime</div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-4 shadow-2xl animate-float" style={{animationDelay: '1s'}}>
                <div className="text-white text-center">
                  <div className="text-3xl font-bold">50+</div>
                  <div className="text-sm opacity-90">Projects</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:scale-105">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-gray-400 dark:text-gray-600" />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-float { animation: float 10s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 1s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out forwards; }
        .animate-blink { animation: blink 1s step-end infinite; }
        .animate-gradient { 
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(156, 163, 175, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(156, 163, 175, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </section>
  )
}

export default Hero