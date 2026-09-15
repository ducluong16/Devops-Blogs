import React from 'react'
import { Link } from 'react-router-dom'
import { FolderGit2, ArrowRight, Github, CheckCircle2, Workflow, Box, Layers, Lock } from 'lucide-react'
import { projects } from '../../data/projectData'
import { notifyNotice } from '../ui/ToastNotice'

const iconMap = {
  Workflow: Workflow,
  Box: Box,
  Layers: Layers
}

const projectHighlights = {
  'cicd-pipeline-automation': [
    'Tự động hóa toàn bộ vòng đời từ Git commit đến Production với ArgoCD GitOps',
    'Tích hợp Docker multi-stage build và quét lỗ hổng bảo mật Trivy',
    'Cơ chế Canary / Rolling update đảm bảo Zero-downtime khi phát hành bản mới'
  ],
  'kubernetes-infrastructure': [
    'Thiết lập cụm Kubernetes sẵn sàng cho môi trường Production trên AWS/On-Premises',
    'Tích hợp HashiCorp Vault bảo vệ Secrets và Ingress NGINX điều hướng an toàn',
    'Cấu hình Auto-scaling (HPA) tự động co giãn theo tải thực tế của ứng dụng'
  ],
  'multi-cloud-infrastructure': [
    'Module hóa toàn bộ hạ tầng đám mây (AWS & GCP) bằng Terraform IaC',
    'Remote state an toàn với cơ chế khóa trạng thái S3/GCS và DynamoDB',
    'Triển khai cụm giám sát tập trung Prometheus & Grafana theo dõi tài nguyên'
  ]
}

const projectCategoryLabels = {
  'cicd-pipeline-automation': 'Tự Động Hóa CI/CD & GitOps',
  'kubernetes-infrastructure': 'Cụm Kubernetes Production',
  'multi-cloud-infrastructure': 'Hạ Tầng Multi-Cloud IaC'
}

export default function Projects() {
  return (
    <section id="projects" className="section-top-pad pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 via-white to-gray-50/70 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 min-h-screen relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-5 pointer-events-none"></div>
      <div className="absolute top-24 left-10 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-3 sm:mb-4">
            <FolderGit2 className="w-3.5 h-3.5 text-blue-500" />
            Hệ Thống Thực Tế &amp; Case Studies
          </div>
          {/* <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Dự Án DevOps &amp;{' '}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 dark:from-blue-400 dark:via-cyan-300 dark:to-indigo-400 bg-clip-text text-transparent">
              Kiến Trúc Hạ Tầng
            </span>
          </h1> */}
          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Các dự án hands-on mô phỏng môi trường Production, tập trung vào xây dựng, triển khai và vận hành hệ thống .
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project) => {
            const IconComponent = iconMap[project.icon] || Box
            const highlights = projectHighlights[project.id] || []
            const categoryLabel = projectCategoryLabels[project.id] || 'Production Lab'

            return (
              <article
                key={project.id}
                onClick={() => notifyNotice('Dự án chưa mở truy cập 🔒', 'Nội dung dự án đang được cập nhật và hoàn thiện!')}
                className="group relative rounded-2xl bg-white dark:bg-gray-800/90 backdrop-blur-xl p-5 sm:p-7 border border-gray-200/80 dark:border-gray-700/80 hover:border-amber-500/60 dark:hover:border-amber-500/60 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-not-allowed"
              >
                <div>
                  {/* Top Bar: Icon & Lock Badge */}
                  <div className="flex items-center justify-between mb-4 sm:mb-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center text-white shadow-md opacity-80 group-hover:opacity-100 transition-opacity`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-sm">
                      <Lock className="w-3.5 h-3.5 text-amber-500 shrink-0" /> Đang cập nhật
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Key Highlights */}
                  {highlights.length > 0 && (
                    <div className="mb-5 space-y-2 pt-2 border-t border-gray-100 dark:border-gray-700/60">
                      <span className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
                        Điểm nhấn kiến trúc:
                      </span>
                      {highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300 leading-snug">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mb-5 pt-2 border-t border-gray-100 dark:border-gray-700/60">
                    {project.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700/60 text-gray-600 dark:text-gray-300 border border-gray-200/60 dark:border-gray-600/50"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-700/80 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      notifyNotice('Dự án chưa mở truy cập 🔒', 'Nội dung chi tiết dự án đang trong quá trình cập nhật!')
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-amber-500/50 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-200 cursor-not-allowed"
                  >
                    <Lock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Đang hoàn thiện chi tiết</span>
                  </button>

                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      notifyNotice('Dự án chưa mở truy cập 🔒', 'Mã nguồn dự án đang được chuẩn bị!')
                    }}
                    aria-label="View source code on GitHub"
                    className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed transition-colors"
                  >
                    <Lock className="w-4 h-4" />
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
