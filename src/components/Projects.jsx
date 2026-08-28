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
            <article key={index} className="group bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 flex flex-col">
              <Link to={`/projects/${project.id}`} className="flex flex-col flex-1 focus:outline-none">
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
              </Link>

              <div className="grid grid-cols-2 gap-3 pt-4 mt-auto border-t border-gray-200 dark:border-gray-700">
                <a href={project.github} target="_blank" rel="noreferrer" className="group/action flex items-center justify-center gap-2.5 px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900/40 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 transition-colors duration-200" aria-label={`Xem source code của ${project.title}`}>
                  <Github className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover/action:text-gray-900 dark:group-hover/action:text-white transition-colors" />
                  <span className="text-sm font-medium">Code</span>
                </a>
                <a href={project.demo} target="_blank" rel="noreferrer" className="group/action flex items-center justify-center gap-2.5 px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900/40 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 transition-colors duration-200" aria-label={`Mở demo của ${project.title}`}>
                  <ExternalLink className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover/action:text-gray-900 dark:group-hover/action:text-white transition-colors" />
                  <span className="text-sm font-medium">Demo</span>
                </a>
              </div>
            </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Projects
