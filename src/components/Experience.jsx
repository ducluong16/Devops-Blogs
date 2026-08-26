import React from 'react'
import { Building, MapPin, Calendar, ChevronRight } from 'lucide-react'

const Experience = () => {
  const experiences = [
    {
      title: 'Senior DevOps Engineer',
      company: 'TechCorp Solutions',
      location: 'San Francisco, CA',
      period: '2022 - Present',
      type: 'Full-time',
      description: 'Leading DevOps initiatives for a fast-growing fintech company, managing cloud infrastructure for 10M+ users.',
      achievements: [
        'Architected and implemented microservices infrastructure on AWS using Kubernetes',
        'Reduced deployment time from 2 hours to 15 minutes through CI/CD automation',
        'Led migration from monolithic to containerized architecture, improving scalability by 300%',
        'Implemented comprehensive monitoring and alerting systems, reducing MTTR by 60%',
        'Mentored junior engineers and established DevOps best practices across the organization'
      ],
      technologies: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'Jenkins', 'Prometheus']
    },
    {
      title: 'DevOps Engineer',
      company: 'CloudTech Inc',
      location: 'Seattle, WA',
      period: '2020 - 2022',
      type: 'Full-time',
      description: 'Managed cloud infrastructure and automated deployment pipelines for multiple client projects.',
      achievements: [
        'Designed and implemented CI/CD pipelines using Jenkins and GitLab',
        'Automated infrastructure provisioning using Terraform and Ansible',
        'Migrated legacy applications to containerized environments',
        'Established monitoring and logging solutions using ELK stack'
      ],
      technologies: ['AWS', 'Docker', 'Jenkins', 'Terraform', 'Ansible', 'ELK']
    },
    {
      title: 'Junior DevOps Engineer',
      company: 'StartupXYZ',
      location: 'Austin, TX',
      period: '2019 - 2020',
      type: 'Full-time',
      description: 'Started my DevOps journey, focusing on automation and cloud infrastructure.',
      achievements: [
        'Automated deployment processes reducing manual effort by 80%',
        'Implemented backup and disaster recovery solutions',
        'Maintained and optimized existing infrastructure'
      ],
      technologies: ['AWS', 'Python', 'Bash', 'Git', 'Linux']
    }
  ]

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Professional Experience
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A journey through various roles that shaped my expertise in DevOps, cloud infrastructure, and automation.
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
                      <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-1">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{exp.location}</span>
                      </div>
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