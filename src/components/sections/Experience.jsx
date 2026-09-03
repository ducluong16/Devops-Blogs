import React from 'react'
import { Building, MapPin, Calendar, ChevronRight } from 'lucide-react'

const Experience = () => {
  const experiences = [
    {
      title: 'DevOps Engineer',
      company: 'Techlab Technology',
      location: '19 Tố Hữu Street, Hanoi',
      period: '2026 – Present',
      type: 'Cloud',
      description: 'Operating cloud infrastructure, Kubernetes platforms, delivery pipelines, security services, observability, and database environments across multiple projects.',
      achievements: [
        'Managed Kubernetes clusters across multiple projects and environments.',
        'Supported CI/CD deployments across Dev, Test, Staging, and Production environments.',
        'Managed secrets using HashiCorp Vault integrated with Kubernetes.',
        'Integrated Keycloak and Google authentication for internal applications.',
        'Managed infrastructure using Terraform and GitOps with Argo CD.',
        'Implemented monitoring with Prometheus and Grafana, and centralized logging with the ELK Stack.',
        'Built and managed VPN infrastructure for internal systems.',
        'Managed Dev, Test, and Staging databases.',
        'Supported developers in debugging application and system issues.',
        'Managed infrastructure on Google Cloud and OpenStack.'
      ],
      technologies: ['Kubernetes', 'CI/CD', 'Terraform', 'Argo CD', 'Vault', 'Keycloak', 'Prometheus', 'Grafana', 'ELK', 'GCP', 'OpenStack', 'Linux', 'Database']
    },
    {
      title: 'DevOps Engineer',
      company: 'ETC Technology Systems JSC',
      location: '63 Lê Văn Lương Street, Hanoi',
      period: '2025 – 2026',
      type: 'On-Premises',
      description: 'Operated on-premises Kubernetes platforms, CI/CD pipelines, databases, and application environments for multiple internal and customer projects.',
      achievements: [
        'Managed multiple large-scale Kubernetes clusters across Dev, Test, and UAT environments, supporting multiple internal projects.',
        'Built and maintained CI/CD pipelines for automated testing, application builds, and deployments.',
        'Supported development teams in debugging and troubleshooting application, deployment, and infrastructure issues.',
        'Assisted customers with application deployment and troubleshooting in production environments.',
        'Assisted in building and configuring Kubernetes and database clusters based on specialized project requirements.',
        'Managed and maintained test environment databases for selected projects.'
      ],
      technologies: ['Kubernetes', 'Docker', 'CI/CD', 'Git', 'Linux', 'Database', 'DevOps']
    }
  ]

  return (
    <section id="experience" className="pt-[88px] pb-20 bg-gray-50 dark:bg-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Experience
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Kinh nghiệm thực tế trong vận hành hạ tầng cloud và on-premises, nền tảng Kubernetes, quy trình CI/CD và hệ thống production.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 h-full w-0.5 bg-gradient-to-b from-blue-600 to-purple-600"></div>

          {experiences.map((exp, index) => (
            <div key={index} className="relative flex items-center mb-12">
              {/* Timeline dot */}
              <div className="absolute left-4 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-gray-800 z-10"></div>

              {/* Content */}
              <div className="w-full ml-12">
                <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {exp.title}
                      </h3>
                      <div className="flex items-center text-blue-600 dark:text-blue-400 mb-2">
                        <Building className="w-4 h-4 mr-2" />
                        <span className="font-medium">{exp.company}</span>
                      </div>
                      {exp.location && <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-1">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{exp.location}</span>
                      </div>}
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{exp.period}</span>
                      </div>
                      <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-medium">
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Key Achievements */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Achievements:</h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start">
                          <ChevronRight className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300 text-sm">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
