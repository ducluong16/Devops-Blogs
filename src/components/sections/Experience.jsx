import React from 'react'
import { Building2, MapPin, Calendar, CheckCircle2, Briefcase, Sparkles } from 'lucide-react'

const experiences = [
  {
    role: 'DevOps Engineer',
    company: 'Techlab Technology',
    period: '2026 – Hiện tại',
    status: 'Đang công tác',
    statusType: 'current',
    type: 'Cloud & Hybrid Platform',
    location: '19 Tố Hữu, Nam Từ Liêm, Hà Nội',
    typeColor: 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    description: 'Vận hành hạ tầng đám mây Google Cloud (GCP) & OpenStack, nền tảng Kubernetes, quy trình GitOps với Argo CD, quản lý secrets tập trung với HashiCorp Vault và hệ thống giám sát toàn diện.',
    achievements: [
      'Quản trị và vận hành các cụm Kubernetes đa môi trường (Dev, Test, UAT, Staging, Production), cấu hình HPA và Ingress NGINX.',
      'Triển khai mô hình GitOps tự động hóa 100% với Argo CD và Infrastructure as Code (IaC) với Terraform.',
      'Tích hợp HashiCorp Vault quản lý bí mật động (dynamic secrets) bảo vệ ứng dụng chạy trên K8s.',
      'Cấu hình xác thực tập trung Keycloak SSO và Google authentication cho các dịch vụ nội bộ doanh nghiệp.',
      'Xây dựng hệ thống quan sát với Prometheus, Grafana và tập trung log quy mô lớn qua ELK Stack.',
      'Thiết lập mạng VPN và quản trị an toàn môi trường cơ sở dữ liệu Dev, Test, Staging.'
    ],
    technologies: [
      'Kubernetes',
      'ArgoCD',
      'Terraform',
      'Vault',
      'Keycloak',
      'Prometheus',
      'Grafana',
      'ELK',
      'GCP',
      'OpenStack',
      'Linux',
      'Docker'
    ]
  },
  {
    role: 'DevOps Engineer',
    company: 'ETC Technology Systems JSC',
    period: '2025 – 2026',
    status: 'Cột mốc hoàn thành',
    statusType: 'completed',
    type: 'On-Premises & Enterprise',
    location: '63 Lê Văn Lương, Cầu Giấy, Hà Nội',
    typeColor: 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    description: 'Vận hành nền tảng cụm Kubernetes On-Premises, xây dựng pipeline CI/CD tự động hóa đóng gói container và trực tiếp hỗ trợ vận hành hệ thống khách hàng doanh nghiệp.',
    achievements: [
      'Quản lý nhiều cụm Kubernetes quy mô lớn đa môi trường: Dev, Test và UAT cho các dự án trọng điểm.',
      'Thiết lập và bảo trì pipeline CI/CD với Jenkins và GitLab CI tự động hóa kiểm thử mã nguồn, build và deploy container.',
      'Trực tiếp phối hợp hỗ trợ các nhóm phát triển và khách hàng trong việc debug, xử lý sự cố hạ tầng trên Production.',
      'Tham gia cấu hình, phân bổ tài nguyên và bảo trì các cụm Database kiểm thử phục vụ các dự án doanh nghiệp.'
    ],
    technologies: [
      'Kubernetes',
      'Docker',
      'Jenkins',
      'GitLab',
      'Git',
      'Linux',
      'PostgreSQL',
      'MySQL',
      'Shell Scripting'
    ]
  }
]

export default function Experience() {
  return (
    <section id="experience" className="section-top-pad pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 via-white to-gray-50/70 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 min-h-screen relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-5 pointer-events-none"></div>
      <div className="absolute top-24 left-10 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-3 sm:mb-4">
            <Briefcase className="w-3.5 h-3.5 text-blue-500" />
            Hành Trình Kỹ Thuật &amp; Cột Mốc
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Kinh Nghiệm &amp;{' '}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 dark:from-blue-400 dark:via-cyan-300 dark:to-indigo-400 bg-clip-text text-transparent">
              Hành Trình Thực Chiến
            </span>
          </h1>
          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Kinh nghiệm thực chiến của tôi trong quản trị hạ tầng Cloud &amp; On-Premises, vận hành cụm Kubernetes đa môi trường và tự động hóa GitOps CI/CD.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical timeline line (Visible on desktop/tablet, clean minimal on mobile) */}
          <div className="hidden sm:block absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500/40"></div>

          <div className="space-y-6 sm:space-y-10">
            {experiences.map((exp, index) => {
              const isCurrent = exp.statusType === 'current'

              return (
                <div key={index} className="relative sm:pl-14">
                  {/* Timeline Node Dot (Desktop/Tablet) */}
                  <div className="hidden sm:flex absolute left-6 top-8 -translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-gray-900 border-2 border-blue-500 dark:border-blue-400 items-center justify-center shadow-lg shadow-blue-500/20 z-10">
                    <span className={`w-2.5 h-2.5 rounded-full ${isCurrent ? 'bg-emerald-500 animate-pulse' : 'bg-blue-500'}`}></span>
                  </div>

                  {/* Main Experience Card */}
                  <article className="group relative rounded-2xl p-4 sm:p-7 bg-white dark:bg-gray-800/90 backdrop-blur-xl border border-gray-200/80 dark:border-gray-700/80 hover:border-blue-500/70 dark:hover:border-blue-500/70 shadow-md hover:shadow-2xl shadow-gray-900/5 hover:shadow-blue-500/10 transition-all duration-300">
                    {/* Card Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-4 border-b border-gray-100 dark:border-gray-700/70">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h2 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {exp.role}
                          </h2>
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                            isCurrent
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                              : 'bg-gray-100 dark:bg-gray-700/60 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`}></span>
                            {exp.status}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400">
                          <Building2 className="w-4 h-4 shrink-0" />
                          <span>{exp.company}</span>
                        </div>
                      </div>

                      {/* Period & Environment Badge */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${exp.typeColor}`}>
                          {exp.type}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 font-medium">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{exp.period}</span>
                        </div>
                      </div>
                    </div>

                    {/* Location & Quick Meta */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mt-3 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span>{exp.location}</span>
                    </div>

                    {/* Description Summary */}
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Key Achievements */}
                    <div className="mb-5">
                      <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white mb-2.5 flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                        Dấu ấn thực chiến &amp; Nhiệm vụ cốt lõi:
                      </h3>
                      <ul className="space-y-2">
                        {exp.achievements.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technology Stack */}
                    <div className="pt-3.5 border-t border-gray-100 dark:border-gray-700/70">
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                        Công nghệ &amp; Nền tảng sử dụng:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] sm:text-[11px] font-medium px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-700/60 text-gray-600 dark:text-gray-300 border border-gray-200/60 dark:border-gray-600/50"
                          >
                            #{tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
