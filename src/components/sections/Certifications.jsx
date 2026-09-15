import React from 'react'
import { Award, CheckCircle2, Calendar, ExternalLink, Shield } from 'lucide-react'

const Certifications = () => {
  const certifications = [
    {
      name: 'AWS Solutions Architect',
      level: 'Professional',
      provider: 'Amazon Web Services',
      date: 'Oct 2024',
      validUntil: 'Oct 2027',
      credentialId: 'AWS-PSA-12345',
      description: 'Thiết kế và deploy các hệ thống phức tạp trên AWS với tính khả dụng cao',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      borderColor: 'border-orange-200 dark:border-orange-800',
      textColor: 'text-orange-600 dark:text-orange-400'
    },
    {
      name: 'Certified Kubernetes Administrator',
      level: 'CKA',
      provider: 'Cloud Native Computing Foundation',
      date: 'Sep 2024',
      validUntil: 'Sep 2027',
      credentialId: 'CKA-2024-000123',
      description: 'Quản trị Kubernetes cluster, troubleshooting và best practices',
      icon: <Award className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      textColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      name: 'Docker Certified Associate',
      level: 'DCA',
      provider: 'Docker Inc.',
      date: 'Aug 2024',
      validUntil: 'Aug 2026',
      credentialId: 'DCA-2024-5678',
      description: 'Container orchestration, Docker security và production deployment',
      icon: <CheckCircle2 className="w-6 h-6" />,
      color: 'from-cyan-500 to-teal-500',
      bgColor: 'bg-cyan-50 dark:bg-cyan-900/20',
      borderColor: 'border-cyan-200 dark:border-cyan-800',
      textColor: 'text-cyan-600 dark:text-cyan-400'
    },
    {
      name: 'HashiCorp Terraform Associate',
      level: 'Professional',
      provider: 'HashiCorp',
      date: 'Jul 2024',
      validUntil: 'Jul 2026',
      credentialId: 'HCP-TF-003456',
      description: 'Infrastructure as Code với Terraform, state management và modules',
      icon: <Award className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800',
      textColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      name: 'Jenkins Engineer',
      level: 'Certified',
      provider: 'CloudBees',
      date: 'Jun 2024',
      validUntil: 'Jun 2026',
      credentialId: 'JE-2024-789',
      description: 'CI/CD pipeline design, Jenkins administration và plugin development',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-red-500 to-orange-500',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-800',
      textColor: 'text-red-600 dark:text-red-400'
    },
    {
      name: 'Prometheus Certified Associate',
      level: 'PCA',
      provider: 'Linux Foundation',
      date: 'May 2024',
      validUntil: 'May 2027',
      credentialId: 'PCA-2024-111',
      description: 'Monitoring, metrics collection, alerting và PromQL advanced queries',
      icon: <CheckCircle2 className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
      textColor: 'text-green-600 dark:text-green-400'
    }
  ]

  return (
    <section id="certifications" className="section-top-pad pb-20 px-4 bg-gray-50 dark:bg-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Professional Certifications
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Các chứng chỉ chuyên nghiệp trong lĩnh vực DevOps, Cloud và Infrastructure
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className={`group relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 ${cert.borderColor} hover:scale-105`}
            >
              {/* Header with gradient */}
              <div className={`relative h-32 bg-gradient-to-br ${cert.color} p-6 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-white">
                    {cert.icon}
                  </div>
                  <div>
                    <p className="text-white/80 text-xs font-medium">{cert.provider}</p>
                    <h3 className="text-white font-bold text-lg leading-tight mt-1">
                      {cert.level}
                    </h3>
                  </div>
                </div>
                <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                  {cert.name}
                </h4>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {cert.description}
                </p>

                {/* Metadata */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>Issued: <span className="font-medium">{cert.date}</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Valid until: <span className="font-medium">{cert.validUntil}</span></span>
                  </div>
                </div>

                {/* Credential ID */}
                <div className={`${cert.bgColor} rounded-lg p-3 mb-4`}>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Credential ID</p>
                  <p className={`text-sm font-mono font-semibold ${cert.textColor}`}>
                    {cert.credentialId}
                  </p>
                </div>

                {/* Verify Button */}
                <button className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border-2 ${cert.borderColor} ${cert.textColor} font-medium text-sm hover:bg-gradient-to-r ${cert.color} hover:text-white hover:border-transparent transition-all duration-300`}>
                  <ExternalLink className="w-4 h-4" />
                  Verify Certificate
                </button>
              </div>

              {/* Corner decoration */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${cert.color} opacity-10 rounded-bl-full`}></div>
            </div>
          ))}
        </div>

        {/* Stats Summary */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          <div className="text-center p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
            <p className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{certifications.length}</p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Certifications</p>
          </div>
          <div className="text-center p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
            <p className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">5+</p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Providers</p>
          </div>
          <div className="text-center p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
            <p className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 mb-2">100%</p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Active Status</p>
          </div>
          <div className="text-center p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
            <p className="text-2xl sm:text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">2024</p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Latest Year</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Certifications
