import React, { useState } from 'react'
import { Clock, Users, Zap, Award, Code, Server, Cloud, GitBranch, Target, Rocket, TrendingUp, Coffee, BookOpen, Heart, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react'

const About = () => {
  const [activeTab, setActiveTab] = useState('story')

  const stats = [
    {
      icon: Clock,
      number: '5+',
      label: 'Years Experience',
      color: 'from-blue-500 to-cyan-500',
      description: 'Building & scaling infrastructure'
    },
    {
      icon: Rocket,
      number: '50+',
      label: 'Projects Delivered',
      color: 'from-purple-500 to-pink-500',
      description: 'Successful deployments'
    },
    {
      icon: TrendingUp,
      number: '99.9%',
      label: 'Uptime Achieved',
      color: 'from-green-500 to-emerald-500',
      description: 'System reliability'
    },
    {
      icon: Award,
      number: '6',
      label: 'Certifications',
      color: 'from-orange-500 to-red-500',
      description: 'Professional credentials'
    }
  ]

  const expertise = [
    {
      icon: <Cloud className="w-6 h-6" />,
      title: 'Cloud Architecture',
      description: 'Designing scalable, resilient cloud infrastructure on AWS, Azure, and GCP',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <GitBranch className="w-6 h-6" />,
      title: 'CI/CD Pipelines',
      description: 'Automated deployment workflows with Jenkins, GitLab CI, and GitHub Actions',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: 'Container Orchestration',
      description: 'Kubernetes clusters management with Helm charts and automated scaling',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Infrastructure as Code',
      description: 'Terraform and Ansible for reproducible, version-controlled infrastructure',
      color: 'from-orange-500 to-red-500'
    }
  ]

  const achievements = [
    { text: 'Reduced deployment time by 80% through automated CI/CD pipelines', icon: <Rocket className="w-5 h-5" /> },
    { text: 'Achieved 99.9% uptime for critical production systems', icon: <TrendingUp className="w-5 h-5" /> },
    { text: 'Led migration of 15+ applications to Kubernetes', icon: <Server className="w-5 h-5" /> },
    { text: 'Implemented IaC reducing manual errors by 90%', icon: <CheckCircle2 className="w-5 h-5" /> },
    { text: 'Optimized cloud costs saving $50K+ annually', icon: <Target className="w-5 h-5" /> },
    { text: 'Built monitoring systems with 100+ custom metrics', icon: <Zap className="w-5 h-5" /> }
  ]

  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Reliability First',
      description: 'Building systems that teams can depend on, with robust monitoring and alerting',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Automation Everything',
      description: 'Eliminating manual processes to increase efficiency and reduce human error',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Team Empowerment',
      description: 'Enabling developers with tools and practices that improve their workflow',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Continuous Learning',
      description: 'Staying current with latest technologies and sharing knowledge with community',
      color: 'from-green-500 to-emerald-500'
    }
  ]

  const tabs = [
    { id: 'story', label: 'My Story', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'expertise', label: 'Expertise', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'values', label: 'Values', icon: <Heart className="w-4 h-4" /> }
  ]

  return (
    <section id="about" className="pt-[88px] pb-20 px-4 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden min-h-screen">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 right-10 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
            <Coffee className="w-4 h-4" />
            Get to know me
          </div>
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Turning complex infrastructure challenges into elegant, automated solutions
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-transparent shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer overflow-hidden"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="relative">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    {stat.description}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Tabs Navigation */}
        <div className="flex justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:scale-105 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-200 dark:border-gray-700">
          {/* Story Tab */}
          {activeTab === 'story' && (
            <div className="animate-fadeIn">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </span>
                    My Journey
                  </h3>
                  
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    With over <span className="font-bold text-blue-600 dark:text-blue-400">5 years of experience</span> in DevOps and cloud infrastructure, 
                    I've helped organizations transform their development processes and achieve superior deployment efficiency. 
                    My journey started with a passion for <span className="font-semibold">automation</span> and has evolved into 
                    architecting complex, scalable systems.
                  </p>
                  
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    I specialize in bridging the gap between development and operations through modern practices like 
                    <span className="font-semibold text-purple-600 dark:text-purple-400"> CI/CD</span>, 
                    <span className="font-semibold text-green-600 dark:text-green-400"> containerization</span>, and 
                    <span className="font-semibold text-orange-600 dark:text-orange-400"> infrastructure as code</span>. 
                    My approach focuses on reliability, scalability, and security while maintaining developer productivity.
                  </p>

                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    When I'm not optimizing infrastructure, you'll find me contributing to 
                    <span className="font-semibold"> open-source projects</span>, writing technical articles, 
                    or exploring the latest developments in cloud technology. I believe in 
                    <span className="font-semibold text-blue-600 dark:text-blue-400"> continuous learning</span> and 
                    sharing knowledge with the DevOps community.
                  </p>
                </div>

                {/* Achievements */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-yellow-500" />
                    Key Achievements
                  </h3>
                  <div className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className="group flex items-start gap-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-600"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          {achievement.icon}
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 leading-relaxed pt-1.5">
                          {achievement.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Expertise Tab */}
          {activeTab === 'expertise' && (
            <div className="animate-fadeIn">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Core Expertise
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {expertise.map((item, index) => (
                  <div
                    key={index}
                    className="group relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-600 hover:border-transparent shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    
                    <div className="relative">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                        {item.icon}
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span>Learn more</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Values Tab */}
          {activeTab === 'values' && (
            <div className="animate-fadeIn">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                What Drives Me
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-500"
                  >
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6 text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 mx-auto`}>
                      {value.icon}
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                      {value.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-center">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 shadow-2xl">
            <h3 className="text-3xl font-bold text-white mb-4">
              Let's Build Something Amazing Together
            </h3>
            <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
              Looking for someone to help optimize your infrastructure or implement DevOps best practices?
            </p>
            <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Get In Touch
            </button>
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
          animation: fadeIn 0.5s ease-out;
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

export default About
