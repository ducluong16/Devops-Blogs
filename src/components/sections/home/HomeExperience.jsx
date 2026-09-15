import React from 'react'
import { Link } from 'react-router-dom'
import {
  Building2,
  Calendar,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Briefcase,
  Layers,
  ShieldCheck,
  Cpu
} from 'lucide-react'
import BrandLogo from '../../ui/BrandLogo'

const experiences = [
  {
    company: 'Techlab Technology',
    role: 'DevOps Engineer',
    period: '2026 – Hiện tại',
    status: 'Đang công tác',
    type: 'Cloud & Hybrid Platform',
    location: '19 Tố Hữu, Nam Từ Liêm, Hà Nội',
    typeColor: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    description: 'Vận hành hạ tầng đám mây Google Cloud (GCP) & OpenStack, nền tảng Kubernetes, quy trình GitOps với Argo CD, bảo mật bí mật Vault và giám sát ELK Stack.',
    achievements: [
      'Quản trị cụm Kubernetes đa dự án trên nền tảng GCP và OpenStack, đảm bảo high availability.',
      'Triển khai mô hình GitOps tự động hóa với Argo CD kết hợp Terraform IaC.',
      'Tích hợp HashiCorp Vault quản lý secrets động cho các Pods trong K8s.',
      'Tích hợp Keycloak SSO và Google authentication cho hệ thống nội bộ công ty.',
      'Thiết lập hệ thống quan sát với Prometheus & Grafana, tập trung log với ELK Stack.'
    ],
    tech: ['Kubernetes', 'ArgoCD', 'Terraform', 'Vault', 'Keycloak', 'ELK', 'Prometheus', 'GCP', 'OpenStack']
  },
  {
    company: 'ETC Technology Systems JSC',
    role: 'DevOps Engineer',
    period: '2025 – 2026',
    status: 'Cột mốc hoàn thành',
    type: 'On-Premises & Enterprise',
    location: '63 Lê Văn Lương, Cầu Giấy, Hà Nội',
    typeColor: 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    description: 'Vận hành nền tảng Kubernetes On-Premises, hệ thống CI/CD tự động và cơ sở dữ liệu cho các dự án nội bộ và khách hàng lớn.',
    achievements: [
      'Quản lý nhiều cụm Kubernetes quy mô lớn đa môi trường: Dev, Test và UAT.',
      'Xây dựng và tối ưu hóa các pipeline CI/CD tự động hóa đóng gói container và deploy.',
      'Trực tiếp hỗ trợ debug và khắc phục sự cố hệ thống hạ tầng cho khách hàng doanh nghiệp.',
      'Cấu hình và bảo trì các cụm Database kiểm thử phục vụ các dự án trọng điểm.'
    ],
    tech: ['Kubernetes', 'Docker', 'Jenkins', 'GitLab', 'Git', 'Linux', 'PostgreSQL', 'MySQL']
  }
]

export default function HomeExperience() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800/80">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-4">
              <Briefcase className="w-3.5 h-3.5 text-blue-500" />
              Lịch Sử Công Tác &amp; Cột Mốc
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Dấu Ấn Kinh Nghiệm{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Thực Chiến
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Quá trình công tác thực tế của tôi tại môi trường doanh nghiệp từ On-Premises đến Cloud.
            </p>
          </div>

          <Link
            to="/experience"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all duration-200 group self-start md:self-auto shrink-0 shadow-sm"
          >
            <span>Xem hồ sơ tác chiến đầy đủ</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Experience Timeline Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="relative rounded-3xl p-6 sm:p-8 bg-gray-50/70 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/80 hover:border-blue-500/80 dark:hover:border-blue-500/80 hover:bg-white dark:hover:bg-gray-800 shadow-lg shadow-gray-900/5 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header info */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 mt-1">
                      <Building2 className="w-4 h-4 shrink-0" />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1.5">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${exp.typeColor}`}>
                      {exp.type}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{exp.period}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-5">
                  <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span>{exp.location}</span>
                </div>

                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mb-5 leading-relaxed">
                  {exp.description}
                </p>

                {/* Key Achievements */}
                <div className="space-y-2.5 mb-6">
                  {exp.achievements.map((item, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies with Brand Logos */}
              <div className="pt-5 border-t border-gray-200/80 dark:border-gray-700/80">
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300"
                    >
                      <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                        <BrandLogo name={t} size={14} />
                      </div>
                      <span>{t}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
