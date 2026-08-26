import React from 'react'
import { Link } from 'react-router-dom'
import { Github, ExternalLink } from 'lucide-react'
import { projects } from '../data/projectData'
import * as Icons from 'lucide-react'

const Projects = () => {

  return (
    <section id="projects" className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Các dự án DevOps đã thực hiện, từ CI/CD automation đến infrastructure management
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const Icon = Icons[project.icon] || Icons.Box
            return (
            <Link
              key={index}
              to={`/projects/${project.id}`}
              className="group bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 block"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${project.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-6 h-6" />
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                {project.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <span className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <Github className="w-4 h-4" />
                  <span>Code</span>
                </span>
                <span className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  <span>Demo</span>
                </span>
              </div>
            </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Projects
