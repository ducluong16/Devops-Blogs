import React from 'react'
import { Server, ShieldCheck, GitBranch, Layers } from 'lucide-react'

const stats = [
  {
    number: '2+',
    unit: 'Năm',
    label: 'Kinh nghiệm thực chiến',
    desc: 'Vận hành hạ tầng Cloud (GCP/OpenStack) & On-Premises',
    icon: Server,
    gradient: 'from-blue-500 to-cyan-400',
    borderGlow: 'hover:border-blue-500/50',
    shadowGlow: 'hover:shadow-blue-500/10',
  },
  {
    number: '10+',
    unit: 'Cụm',
    label: 'Kubernetes Clusters',
    desc: 'Quản lý môi trường Dev, Test, UAT, Staging & Production',
    icon: Layers,
    gradient: 'from-purple-500 to-indigo-400',
    borderGlow: 'hover:border-purple-500/50',
    shadowGlow: 'hover:shadow-purple-500/10',
  },
  {
    number: '100%',
    unit: 'GitOps',
    label: 'Tự động hóa CI/CD',
    desc: 'Triển khai chuẩn declarative với Argo CD & Terraform IaC',
    icon: GitBranch,
    gradient: 'from-emerald-500 to-teal-400',
    borderGlow: 'hover:border-emerald-500/50',
    shadowGlow: 'hover:shadow-emerald-500/10',
  },
  {
    number: '99.9%',
    unit: 'Uptime',
    label: 'Bảo mật & Giám sát',
    desc: 'Quản trị Vault, Keycloak SSO, ELK Stack & Prometheus/Grafana',
    icon: ShieldCheck,
    gradient: 'from-amber-500 to-orange-400',
    borderGlow: 'hover:border-amber-500/50',
    shadowGlow: 'hover:shadow-amber-500/10',
  },
]

export default function HomeStats() {
  return (
    <section id="stats-overview" className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {stats.map((stat, idx) => {
          const IconComponent = stat.icon
          return (
            <div
              key={idx}
              className={`group relative rounded-2xl p-3.5 sm:p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-200/80 dark:border-gray-700/80 shadow-xl shadow-gray-900/5 transition-all duration-300 transform hover:-translate-y-1.5 ${stat.borderGlow} ${stat.shadowGlow}`}
            >
              <div className="flex items-center justify-between mb-2.5 sm:mb-4">
                <div className={`w-8 h-8 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-mono font-medium px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-gray-100 dark:bg-gray-700/70 text-gray-600 dark:text-gray-300">
                  {stat.unit}
                </span>
              </div>

              <div className="flex items-baseline gap-1 mb-0.5 sm:mb-1">
                <span className={`text-2xl sm:text-4xl font-extrabold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent tracking-tight`}>
                  {stat.number}
                </span>
              </div>

              <h3 className="text-xs sm:text-base font-bold text-gray-900 dark:text-white mb-0.5 sm:mb-1">
                {stat.label}
              </h3>
              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
                {stat.desc}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
