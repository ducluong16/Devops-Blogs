import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Box, Layers, Workflow, ExternalLink, Github, CheckCircle2, Sparkles, Lock } from 'lucide-react'
import { projects } from '../../../data/projectData'
import { notifyNotice } from '../../ui/ToastNotice'

const iconMap = {
  Workflow: Workflow,
  Box: Box,
  Layers: Layers,
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
  'multi-cloud-iac': [
    'Module hóa toàn bộ hạ tầng đám mây (AWS & GCP) bằng Terraform IaC',
    'Remote state an toàn với cơ chế khóa trạng thái S3/GCS và DynamoDB',
    'Triển khai cụm giám sát tập trung Prometheus & Grafana theo dõi tài nguyên'
  ]
}

export default function HomeProjects() {
  return (
    <section id="featured-projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800/80">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              Dự Án Tiêu Biểu &amp; Kiến Trúc
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Dự án DevOps{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Thực Chiến Tiêu Biểu
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Các dự án mình trực tiếp thiết kế về tự động hóa pipeline, nền tảng Kubernetes và hạ tầng Multi-Cloud.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all duration-200 group self-start md:self-auto shrink-0 shadow-sm"
          >
            <span>Xem tất cả dự án</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project) => {
            const IconComponent = iconMap[project.icon] || Box
            const highlights = projectHighlights[project.id] || []

            return (
              <article
                key={project.id}
                onClick={() => notifyNotice('Dự án chưa mở truy cập 🔒', 'Nội dung dự án đang được cập nhật và hoàn thiện!')}
                className="group relative rounded-2xl bg-gray-50/70 dark:bg-gray-800/60 p-6 sm:p-7 border border-gray-200/80 dark:border-gray-700/80 hover:border-amber-500/60 dark:hover:border-amber-500/60 shadow-lg shadow-gray-900/5 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-not-allowed"
              >
                <div>
                  {/* Top Bar: Icon & Lock Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${project.color} flex items-center justify-center text-white shadow-md opacity-80 group-hover:opacity-100 transition-opacity`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-sm">
                      <Lock className="w-3.5 h-3.5 text-amber-500 shrink-0" /> Đang cập nhật
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2.5 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-5 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  {highlights.length > 0 && (
                    <div className="mb-6 space-y-2">
                      {highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-gray-200/80 dark:border-gray-700/80 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      notifyNotice('Dự án chưa mở truy cập 🔒', 'Nội dung chi tiết dự án đang trong quá trình cập nhật!')
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-amber-500/50 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-200 cursor-not-allowed"
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
