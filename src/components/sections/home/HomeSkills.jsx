import React from 'react'
import { Link } from 'react-router-dom'
import {
  Cloud,
  Layers,
  GitBranch,
  Activity,
  ShieldCheck,
  Database,
  ArrowRight,
  Sparkles,
  Check
} from 'lucide-react'
import BrandLogo from '../../ui/BrandLogo'

const skillLogoKeys = {
  'Google Cloud (GCP)': 'GCP',
  'OpenStack': 'OpenStack',
  'AWS (EKS/VPC)': 'AWS',
  'Linux (Ubuntu/CentOS)': 'Linux',
  'Nginx Web Server': 'Nginx',
  'Kubernetes (K8s)': 'Kubernetes',
  'Docker': 'Docker',
  'Helm Charts': 'Helm',
  'Docker Compose': 'Docker',
  'Ingress NGINX': 'Nginx',
  'Argo CD': 'ArgoCD',
  'Jenkins Pipeline': 'Jenkins',
  'GitLab CI': 'GitLab',
  'GitHub Actions': 'Actions',
  'Terraform IaC': 'Terraform',
  'Prometheus': 'Prometheus',
  'Grafana': 'Grafana',
  'ELK Stack': 'ELK',
  'Elasticsearch': 'ELK',
  'Alertmanager': 'Prometheus',
  'HashiCorp Vault': 'Vault',
  'Keycloak SSO': 'Keycloak',
  'Kubernetes RBAC': 'Kubernetes',
  'SSL/TLS': 'Vault',
  'VPN Network': 'Linux',
  'PostgreSQL': 'PostgreSQL',
  'MySQL': 'MySQL',
  'Redis Cache': 'Redis',
  'Bash / Shell Scripting': 'Bash',
  'Python Automation': 'Python'
}

const skillGroups = [
  {
    title: 'Cloud Platforms & OS',
    icon: Cloud,
    color: 'from-blue-500 to-cyan-500',
    skills: ['Google Cloud (GCP)', 'OpenStack', 'AWS (EKS/VPC)', 'Linux (Ubuntu/CentOS)', 'Nginx Web Server'],
    summary: 'Thiết kế, vận hành hạ tầng Cloud & Hybrid an toàn, tối ưu chi phí và độ sẵn sàng cao.'
  },
  {
    title: 'Containers & Kubernetes',
    icon: Layers,
    color: 'from-indigo-500 to-purple-500',
    skills: ['Kubernetes (K8s)', 'Docker', 'Helm Charts', 'Docker Compose', 'Ingress NGINX'],
    summary: 'Quản trị cụm K8s đa môi trường, auto-scaling HPA, phân tách namespace & network policy.'
  },
  {
    title: 'CI/CD & GitOps',
    icon: GitBranch,
    color: 'from-emerald-500 to-teal-500',
    skills: ['Argo CD', 'Jenkins Pipeline', 'GitLab CI', 'GitHub Actions', 'Terraform IaC'],
    summary: 'Tự động hóa 100% quy trình build, test, scan và triển khai GitOps zero-downtime.'
  },
  {
    title: 'Monitoring & Observability',
    icon: Activity,
    color: 'from-purple-500 to-pink-500',
    skills: ['Prometheus', 'Grafana', 'ELK Stack', 'Elasticsearch', 'Alertmanager'],
    summary: 'Giám sát hạ tầng 24/7 với dashboard trực quan, tập trung log và cảnh báo tức thì.'
  },
  {
    title: 'Security & Identity',
    icon: ShieldCheck,
    color: 'from-amber-500 to-rose-500',
    skills: ['HashiCorp Vault', 'Keycloak SSO', 'Kubernetes RBAC', 'SSL/TLS', 'VPN Network'],
    summary: 'Bảo mật DevSecOps: Quản lý dynamic secret qua Vault, SSO tập trung và zero-trust.'
  },
  {
    title: 'Databases & Scripting',
    icon: Database,
    color: 'from-cyan-500 to-blue-600',
    skills: ['PostgreSQL', 'MySQL', 'Redis Cache', 'Bash / Shell Scripting', 'Python Automation'],
    summary: 'Vận hành database clusters đa môi trường, backup/restore định kỳ và scripts tự động hóa.'
  }
]

export default function HomeSkills() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-900/50 border-t border-gray-200/60 dark:border-gray-800/80">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              Năng Lực Cốt Lõi &amp; Tech Stack
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Kỹ Năng &amp; Công Nghệ{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Cốt Lõi
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Bộ kỹ năng và công nghệ tôi trực tiếp vận hành qua các dự án thực tế trên môi trường Cloud &amp; On-Premises.
            </p>
          </div>

          <Link
            to="/skills"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 group self-start md:self-auto shrink-0 shadow-sm"
          >
            <span>Khám phá toàn bộ 24+ kỹ năng</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, idx) => {
            const Icon = group.icon
            return (
              <div
                key={idx}
                className="group relative rounded-2xl p-6 bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 hover:border-blue-500/80 dark:hover:border-blue-500/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${group.color} flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white">
                        {group.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-5 leading-relaxed">
                    {group.summary}
                  </p>

                  <div className="space-y-2 mb-4">
                    {group.skills.map((skill, sIdx) => {
                      const logoKey = skillLogoKeys[skill]
                      return (
                        <div
                          key={sIdx}
                          className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700/80 text-xs font-medium text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700 transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            {logoKey ? (
                              <div className="w-4 h-4 flex items-center justify-center shrink-0">
                                <BrandLogo name={logoKey} size={16} />
                              </div>
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                            )}
                            <span>{skill}</span>
                          </div>
                          <Check className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                        </div>
                      )
                    })}
                  </div>
                </div>

                <Link
                  to="/skills"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 pt-2 border-t border-gray-100 dark:border-gray-700/60 transition-colors"
                >
                  <span>Xem chi tiết nhóm này</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
