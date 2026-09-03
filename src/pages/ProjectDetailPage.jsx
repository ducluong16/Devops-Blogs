import { useParams, Link, useNavigate } from 'react-router-dom'
import { getProject } from '../data/projectData'
import { ArrowLeft, Github, ExternalLink, AlertCircle, CheckCircle } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import * as Icons from 'lucide-react'

function ProjectDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = getProject(id)

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-[88px] pb-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Project Not Found
          </h1>
          <Link to="/projects" className="text-blue-600 hover:underline">
            ← Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  const Icon = Icons[project.icon] || Icons.Box

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-[88px] pb-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/projects')}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </button>

        {/* Project Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className={`bg-gradient-to-r ${project.color} p-8`}>
            <div className="flex items-center mb-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <Icon className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-white/90 mb-6">
              {project.description}
            </p>
            
            {/* Links */}
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                className="inline-flex items-center px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
              >
                <Github className="w-5 h-5 mr-2" />
                View Code
              </button>
              <button
                type="button"
                className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors font-semibold"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Live Demo
              </button>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.tech.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Challenges & Solutions Grid */}
        {project.challenges && project.solutions && (
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Challenges */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl mr-4">
                  <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Challenges
                </h2>
              </div>
              <ul className="space-y-4">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {challenge}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl mr-4">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Solutions
                </h2>
              </div>
              <ul className="space-y-4">
                {project.solutions.map((solution, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {solution}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Detailed Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <ReactMarkdown
              children={project.fullDescription}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter
                      children={String(children).replace(/\n$/, '')}
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    />
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                }
              }}
            />
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetailPage
