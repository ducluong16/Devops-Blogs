import React, { useState, useEffect } from 'react'
import { Cloud, Container, GitBranch, Monitor, Code, Star, Zap, TrendingUp, Award, Sparkles } from 'lucide-react'

const Skills = () => {
  const [activeTab, setActiveTab] = useState('All Skills')
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const [animatedValues, setAnimatedValues] = useState({})

  const skillCategories = [
    { name: 'All Skills', icon: Sparkles, color: 'from-purple-500 to-pink-500' },
    { name: 'Cloud Platforms', icon: Cloud, color: 'from-blue-500 to-cyan-500' },
    { name: 'Containers & Orchestration', icon: Container, color: 'from-indigo-500 to-purple-500' },
    { name: 'CI/CD & Automation', icon: GitBranch, color: 'from-green-500 to-emerald-500' },
    { name: 'Monitoring & Logging', icon: Monitor, color: 'from-orange-500 to-red-500' },
    { name: 'Languages & Scripts', icon: Code, color: 'from-pink-500 to-rose-500' }
  ]

  const skills = [
    {
      name: 'Amazon Web Services',
      shortName: 'AWS',
      category: 'Cloud Platforms',
      color: 'from-orange-400 to-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      borderColor: 'border-orange-200 dark:border-orange-800',
      textColor: 'text-orange-600 dark:text-orange-400',
      expertise: 'Expert',
      level: 95,
      icon: '☁️',
      projects: 25
    },
    {
      name: 'Google Cloud Platform',
      shortName: 'GCP',
      category: 'Cloud Platforms',
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      textColor: 'text-blue-600 dark:text-blue-400',
      expertise: 'Advanced',
      level: 85,
      icon: '🌐',
      projects: 15
    },
    {
      name: 'Microsoft Azure',
      shortName: 'Azure',
      category: 'Cloud Platforms',
      color: 'from-blue-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800',
      textColor: 'text-purple-600 dark:text-purple-400',
      expertise: 'Advanced',
      level: 80,
      icon: '⚡',
      projects: 12
    },
    {
      name: 'Docker',
      shortName: 'Docker',
      category: 'Containers & Orchestration',
      color: 'from-cyan-400 to-blue-600',
      bgColor: 'bg-cyan-50 dark:bg-cyan-900/20',
      borderColor: 'border-cyan-200 dark:border-cyan-800',
      textColor: 'text-cyan-600 dark:text-cyan-400',
      expertise: 'Expert',
      level: 95,
      icon: '🐳',
      projects: 30
    },
    {
      name: 'Kubernetes',
      shortName: 'K8s',
      category: 'Containers & Orchestration',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      borderColor: 'border-indigo-200 dark:border-indigo-800',
      textColor: 'text-indigo-600 dark:text-indigo-400',
      expertise: 'Expert',
      level: 92,
      icon: '⎈',
      projects: 28
    },
    {
      name: 'Helm',
      shortName: 'Helm',
      category: 'Containers & Orchestration',
      color: 'from-pink-500 to-red-600',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20',
      borderColor: 'border-pink-200 dark:border-pink-800',
      textColor: 'text-pink-600 dark:text-pink-400',
      expertise: 'Advanced',
      level: 85,
      icon: '⚓',
      projects: 20
    },
    {
      name: 'Jenkins',
      shortName: 'Jenkins',
      category: 'CI/CD & Automation',
      color: 'from-red-500 to-orange-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-800',
      textColor: 'text-red-600 dark:text-red-400',
      expertise: 'Expert',
      level: 90,
      icon: '🔨',
      projects: 22
    },
    {
      name: 'GitHub Actions',
      shortName: 'Actions',
      category: 'CI/CD & Automation',
      color: 'from-gray-600 to-gray-800',
      bgColor: 'bg-gray-50 dark:bg-gray-800/50',
      borderColor: 'border-gray-300 dark:border-gray-700',
      textColor: 'text-gray-700 dark:text-gray-300',
      expertise: 'Advanced',
      level: 88,
      icon: '🚀',
      projects: 18
    },
    {
      name: 'Terraform',
      shortName: 'Terraform',
      category: 'CI/CD & Automation',
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800',
      textColor: 'text-purple-600 dark:text-purple-400',
      expertise: 'Advanced',
      level: 87,
      icon: '🏗️',
      projects: 16
    },
    {
      name: 'Ansible',
      shortName: 'Ansible',
      category: 'CI/CD & Automation',
      color: 'from-red-500 to-pink-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-800',
      textColor: 'text-red-600 dark:text-red-400',
      expertise: 'Advanced',
      level: 82,
      icon: '⚙️',
      projects: 14
    },
    {
      name: 'Prometheus',
      shortName: 'Prometheus',
      category: 'Monitoring & Logging',
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      borderColor: 'border-orange-200 dark:border-orange-800',
      textColor: 'text-orange-600 dark:text-orange-400',
      expertise: 'Advanced',
      level: 88,
      icon: '🔥',
      projects: 19
    },
    {
      name: 'Grafana',
      shortName: 'Grafana',
      category: 'Monitoring & Logging',
      color: 'from-orange-400 to-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      textColor: 'text-yellow-600 dark:text-yellow-500',
      expertise: 'Advanced',
      level: 86,
      icon: '📊',
      projects: 17
    },
    {
      name: 'ELK Stack',
      shortName: 'ELK',
      category: 'Monitoring & Logging',
      color: 'from-yellow-400 to-green-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      textColor: 'text-yellow-600 dark:text-yellow-500',
      expertise: 'Intermediate',
      level: 75,
      icon: '📈',
      projects: 10
    },
    {
      name: 'Python',
      shortName: 'Python',
      category: 'Languages & Scripts',
      color: 'from-blue-500 to-yellow-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      textColor: 'text-blue-600 dark:text-blue-400',
      expertise: 'Advanced',
      level: 85,
      icon: '🐍',
      projects: 24
    },
    {
      name: 'Bash/Shell',
      shortName: 'Bash',
      category: 'Languages & Scripts',
      color: 'from-gray-600 to-green-600',
      bgColor: 'bg-gray-50 dark:bg-gray-800/50',
      borderColor: 'border-gray-300 dark:border-gray-700',
      textColor: 'text-gray-700 dark:text-gray-300',
      expertise: 'Expert',
      level: 93,
      icon: '💻',
      projects: 35
    },
    {
      name: 'YAML',
      shortName: 'YAML',
      category: 'Languages & Scripts',
      color: 'from-red-400 to-pink-500',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-800',
      textColor: 'text-red-600 dark:text-red-400',
      expertise: 'Expert',
      level: 95,
      icon: '📄',
      projects: 40
    },
    {
      name: 'JavaScript',
      shortName: 'JS',
      category: 'Languages & Scripts',
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      textColor: 'text-yellow-600 dark:text-yellow-500',
      expertise: 'Intermediate',
      level: 72,
      icon: '⚡',
      projects: 11
    }
  ]

  const filteredSkills = activeTab === 'All Skills'
    ? skills
    : skills.filter(skill => skill.category === activeTab)

  useEffect(() => {
    filteredSkills.forEach((skill, index) => {
      setTimeout(() => {
        setAnimatedValues(prev => ({
          ...prev,
          [skill.name]: skill.level
        }))
      }, index * 100)
    })
  }, [activeTab])

  const getExpertiseStars = (expertise) => {
    const levels = {
      'Expert': 5,
      'Advanced': 4,
      'Intermediate': 3
    }
    return levels[expertise] || 3
  }

  return (
    <section id="skills" className="py-20 px-4 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 right-10 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            My Technical Arsenal
          </div>
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A comprehensive toolkit mastered through years of hands-on experience in modern DevOps practices
          </p>
        </div>

        <div className="flex flex-wrap justify-center mb-12 gap-3">
          {skillCategories.map((category) => {
            const IconComponent = category.icon
            return (
              <button
                key={category.name}
                onClick={() => setActiveTab(category.name)}
                className={`group flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === category.name
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:scale-105 border border-gray-200 dark:border-gray-700'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span>{category.name}</span>
                {activeTab === category.name && (
                  <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                    {filteredSkills.length}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              className={`group relative bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 ${skill.borderColor} hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-rotate-1 cursor-pointer overflow-hidden`}
              style={{
                animationDelay: `${index * 50}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

              <div className="relative mb-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${skill.color} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                  {skill.icon}
                </div>
                {hoveredSkill === skill.name && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                {skill.name}
              </h3>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Proficiency</span>
                  <span className={`text-xs font-bold ${skill.textColor}`}>
                    {animatedValues[skill.name] || 0}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${animatedValues[skill.name] || 0}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${skill.bgColor} ${skill.textColor} border ${skill.borderColor}`}>
                  {skill.expertise}
                </span>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 transition-all duration-300 ${
                        i < getExpertiseStars(skill.expertise)
                          ? 'text-yellow-400 fill-yellow-400 scale-110'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 pt-3 border-t border-gray-200 dark:border-gray-700">
                <Award className="w-4 h-4" />
                <span className="font-medium">{skill.projects} projects</span>
              </div>

              {hoveredSkill === skill.name && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/95 to-gray-50/95 dark:from-gray-800/95 dark:to-gray-900/95 backdrop-blur-sm rounded-2xl p-6 flex flex-col justify-center items-center text-center animate-fadeIn">
                  <TrendingUp className={`w-12 h-12 ${skill.textColor} mb-3`} />
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                    Used in <span className="font-bold text-lg">{skill.projects}</span> production projects
                  </p>
                  <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                    Click to view projects
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white text-center shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="text-5xl font-bold mb-2">{skills.length}+</div>
            <div className="text-lg opacity-90">Technologies Mastered</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white text-center shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="text-5xl font-bold mb-2">5+</div>
            <div className="text-lg opacity-90">Years Experience</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-8 text-white text-center shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="text-5xl font-bold mb-2">6</div>
            <div className="text-lg opacity-90">Professional Certifications</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
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

export default Skills
