import React, { useState, useMemo } from 'react'
import {
  Container,
  GitBranch,
  Cloud,
  ShieldCheck,
  Activity,
  Database,
  Sparkles,
  CheckCircle2,
  Layers
} from 'lucide-react'
import BrandLogo from '../ui/BrandLogo'

const skillCategories = [
  { name: 'Tất cả kỹ năng', icon: Sparkles, color: 'from-blue-600 to-indigo-600' },
  { name: 'Containers & K8s', icon: Container, color: 'from-blue-500 to-cyan-500' },
  { name: 'CI/CD & GitOps', icon: GitBranch, color: 'from-emerald-500 to-teal-500' },
  { name: 'Cloud & Infrastructure', icon: Cloud, color: 'from-cyan-500 to-blue-600' },
  { name: 'Security & Identity', icon: ShieldCheck, color: 'from-amber-500 to-rose-500' },
  { name: 'Monitoring & Observability', icon: Activity, color: 'from-purple-500 to-pink-500' },
  { name: 'Database & Scripting', icon: Database, color: 'from-indigo-500 to-purple-600' }
]

const skillsData = [
  // Containers & K8s
  {
    name: 'Kubernetes',
    shortName: 'Kubernetes',
    category: 'Containers & K8s',
    level: 92,
    stage: 'Production Ready',
    stageType: 'production',
    highlight: 'Vận hành cụm K8s đa môi trường (Dev, Test, UAT, Prod), HPA, Ingress NGINX, RBAC.',
    tags: ['Cluster Ops', 'HPA Auto-scaling', 'Ingress & RBAC'],
    color: 'from-blue-500 to-indigo-600',
    borderColor: 'group-hover:border-blue-500/70',
    shadowColor: 'group-hover:shadow-blue-500/15'
  },
  {
    name: 'Docker',
    shortName: 'Docker',
    category: 'Containers & K8s',
    level: 95,
    stage: 'Production Ready',
    stageType: 'production',
    highlight: 'Multi-stage builds tối ưu dung lượng, Docker Compose, BuildKit caching, container hardening.',
    tags: ['Multi-Stage', 'BuildKit', 'Image Hardening'],
    color: 'from-cyan-500 to-blue-600',
    borderColor: 'group-hover:border-cyan-500/70',
    shadowColor: 'group-hover:shadow-cyan-500/15'
  },
  {
    name: 'Helm',
    shortName: 'Helm',
    category: 'Containers & K8s',
    level: 85,
    stage: 'Hands-on',
    stageType: 'handson',
    highlight: 'Đóng gói Helm Charts, quản lý release phiên bản, biến cấu hình values đa môi trường.',
    tags: ['Package Manager', 'Chart Templates', 'Release Mgmt'],
    color: 'from-sky-500 to-blue-600',
    borderColor: 'group-hover:border-sky-500/70',
    shadowColor: 'group-hover:shadow-sky-500/15'
  },

  // CI/CD & GitOps
  {
    name: 'Argo CD',
    shortName: 'ArgoCD',
    category: 'CI/CD & GitOps',
    level: 90,
    stage: 'Production Ready',
    stageType: 'production',
    highlight: 'Triển khai GitOps declarative, auto-sync, self-healing, rolling update & zero-downtime.',
    tags: ['GitOps', 'Auto-Sync', 'Self-Healing'],
    color: 'from-orange-500 to-rose-500',
    borderColor: 'group-hover:border-orange-500/70',
    shadowColor: 'group-hover:shadow-orange-500/15'
  },
  {
    name: 'Terraform',
    shortName: 'Terraform',
    category: 'CI/CD & GitOps',
    level: 88,
    stage: 'Hands-on',
    stageType: 'handson',
    highlight: 'Module hóa Infrastructure as Code cho GCP & OpenStack, remote state kèm lock.',
    tags: ['IaC', 'Reusable Modules', 'Remote State'],
    color: 'from-purple-500 to-indigo-600',
    borderColor: 'group-hover:border-purple-500/70',
    shadowColor: 'group-hover:shadow-purple-500/15'
  },
  {
    name: 'Jenkins',
    shortName: 'Jenkins',
    category: 'CI/CD & GitOps',
    level: 88,
    stage: 'Hands-on',
    stageType: 'handson',
    highlight: 'Declarative Pipeline, Shared Libraries, K8s dynamic agents, parallel build & test.',
    tags: ['Pipeline-as-Code', 'Shared Libs', 'K8s Agents'],
    color: 'from-red-500 to-orange-500',
    borderColor: 'group-hover:border-red-500/70',
    shadowColor: 'group-hover:shadow-red-500/15'
  },
  {
    name: 'GitLab CI',
    shortName: 'GitLab',
    category: 'CI/CD & GitOps',
    level: 88,
    stage: 'Hands-on',
    stageType: 'handson',
    highlight: 'Pipeline YAML, container registry tích hợp, artifacts, môi trường deploy tự động.',
    tags: ['CI Runner', 'Registry', 'YAML Pipelines'],
    color: 'from-orange-500 to-amber-500',
    borderColor: 'group-hover:border-orange-500/70',
    shadowColor: 'group-hover:shadow-orange-500/15'
  },
  {
    name: 'GitHub Actions',
    shortName: 'Actions',
    category: 'CI/CD & GitOps',
    level: 86,
    stage: 'Hands-on',
    stageType: 'handson',
    highlight: 'Workflows tự động hóa kiểm thử mã nguồn, SAST quét bảo mật, push image to registry.',
    tags: ['CI/CD Workflows', 'Security Scans', 'Secrets Mgmt'],
    color: 'from-slate-600 to-slate-800',
    borderColor: 'group-hover:border-slate-500/70',
    shadowColor: 'group-hover:shadow-slate-500/15'
  },
  {
    name: 'Git',
    shortName: 'Git',
    category: 'CI/CD & GitOps',
    level: 92,
    stage: 'Production Ready',
    stageType: 'production',
    highlight: 'Trunk-based development, branch protection rules, semantic release, pre-commit hooks.',
    tags: ['Trunk-based', 'Pre-commit', 'Branching'],
    color: 'from-red-500 to-rose-600',
    borderColor: 'group-hover:border-red-500/70',
    shadowColor: 'group-hover:shadow-red-500/15'
  },
  {
    name: 'Ansible',
    shortName: 'Ansible',
    category: 'CI/CD & GitOps',
    level: 80,
    stage: 'Practicing',
    stageType: 'practicing',
    highlight: 'Playbooks cấu hình máy chủ hàng loạt, tự động hóa provisioning phần mềm & OS setup.',
    tags: ['Configuration', 'Playbooks', 'Inventory'],
    color: 'from-red-600 to-pink-600',
    borderColor: 'group-hover:border-red-500/70',
    shadowColor: 'group-hover:shadow-red-500/15'
  },

  // Cloud & Infrastructure
  {
    name: 'Linux (Ubuntu / CentOS / Debian)',
    shortName: 'Linux',
    category: 'Cloud & Infrastructure',
    level: 94,
    stage: 'Production Ready',
    stageType: 'production',
    highlight: 'Quản trị hệ thống chuyên sâu, systemd services, SSH hardening, phân tích network & I/O.',
    tags: ['Kernel Tuning', 'Systemd', 'Network Analysis'],
    color: 'from-amber-500 to-yellow-500',
    borderColor: 'group-hover:border-amber-500/70',
    shadowColor: 'group-hover:shadow-amber-500/15'
  },
  {
    name: 'Google Cloud Platform (GCP)',
    shortName: 'GCP',
    category: 'Cloud & Infrastructure',
    level: 86,
    stage: 'Hands-on',
    stageType: 'handson',
    highlight: 'Quản trị hạ tầng GCP, GKE clusters, VPC Networks, Cloud Storage, Compute Engine & IAM.',
    tags: ['GKE Platform', 'VPC Network', 'IAM Roles'],
    color: 'from-blue-500 to-cyan-500',
    borderColor: 'group-hover:border-blue-500/70',
    shadowColor: 'group-hover:shadow-blue-500/15'
  },
  {
    name: 'OpenStack',
    shortName: 'OpenStack',
    category: 'Cloud & Infrastructure',
    level: 84,
    stage: 'Hands-on',
    stageType: 'handson',
    highlight: 'Vận hành hạ tầng Private Cloud doanh nghiệp, Nova compute, Neutron networking, Cinder.',
    tags: ['Private Cloud', 'Nova / Neutron', 'On-Premise Cloud'],
    color: 'from-red-500 to-rose-600',
    borderColor: 'group-hover:border-red-500/70',
    shadowColor: 'group-hover:shadow-red-500/15'
  },
  {
    name: 'Amazon Web Services (AWS)',
    shortName: 'AWS',
    category: 'Cloud & Infrastructure',
    level: 82,
    stage: 'Hands-on',
    stageType: 'handson',
    highlight: 'EKS, EC2, VPC subnets, Security Groups, IAM roles, S3 buckets, CloudWatch logs.',
    tags: ['EKS Clusters', 'VPC & S3', 'IAM Policies'],
    color: 'from-orange-500 to-amber-500',
    borderColor: 'group-hover:border-orange-500/70',
    shadowColor: 'group-hover:shadow-orange-500/15'
  },
  {
    name: 'Nginx',
    shortName: 'Nginx',
    category: 'Cloud & Infrastructure',
    level: 88,
    stage: 'Production Ready',
    stageType: 'production',
    highlight: 'Reverse proxy, load balancing, SSL/TLS termination, rate limiting, gzip caching.',
    tags: ['Reverse Proxy', 'SSL/TLS', 'Load Balancer'],
    color: 'from-emerald-500 to-green-600',
    borderColor: 'group-hover:border-emerald-500/70',
    shadowColor: 'group-hover:shadow-emerald-500/15'
  },

  // Security & Identity
  {
    name: 'HashiCorp Vault',
    shortName: 'Vault',
    category: 'Security & Identity',
    level: 88,
    stage: 'Production Ready',
    stageType: 'production',
    highlight: 'Bảo mật bí mật tập trung, dynamic secrets, tích hợp K8s ServiceAccount & Vault Agent.',
    tags: ['Dynamic Secrets', 'K8s Injector', 'PKI & Tokens'],
    color: 'from-slate-700 to-slate-900',
    borderColor: 'group-hover:border-slate-500/70',
    shadowColor: 'group-hover:shadow-slate-500/15'
  },
  {
    name: 'Keycloak',
    shortName: 'Keycloak',
    category: 'Security & Identity',
    level: 86,
    stage: 'Hands-on',
    stageType: 'handson',
    highlight: 'Identity & Access Management (IAM), SSO tập trung, Google authentication, OAuth2/OIDC.',
    tags: ['SSO & IAM', 'OAuth2 / OIDC', 'Realm Security'],
    color: 'from-cyan-500 to-blue-600',
    borderColor: 'group-hover:border-cyan-500/70',
    shadowColor: 'group-hover:shadow-cyan-500/15'
  },

  // Monitoring & Observability
  {
    name: 'Prometheus',
    shortName: 'Prometheus',
    category: 'Monitoring & Observability',
    level: 88,
    stage: 'Production Ready',
    stageType: 'production',
    highlight: 'Thu thập metrics, PromQL queries, Alertmanager rules định tuyến cảnh báo thông minh.',
    tags: ['PromQL', 'Metrics Exporters', 'Alertmanager'],
    color: 'from-orange-500 to-red-600',
    borderColor: 'group-hover:border-orange-500/70',
    shadowColor: 'group-hover:shadow-orange-500/15'
  },
  {
    name: 'Grafana',
    shortName: 'Grafana',
    category: 'Monitoring & Observability',
    level: 88,
    stage: 'Production Ready',
    stageType: 'production',
    highlight: 'Thiết kế dashboard trực quan hóa tài nguyên K8s, pods, node exporter, alerts visualization.',
    tags: ['K8s Dashboards', 'Alert Panels', 'Visualization'],
    color: 'from-amber-500 to-orange-500',
    borderColor: 'group-hover:border-amber-500/70',
    shadowColor: 'group-hover:shadow-amber-500/15'
  },
  {
    name: 'ELK Stack',
    shortName: 'ELK',
    category: 'Monitoring & Observability',
    level: 85,
    stage: 'Hands-on',
    stageType: 'handson',
    highlight: 'Hệ thống log tập trung với Elasticsearch, Logstash filter pipelines, Kibana dashboards.',
    tags: ['Centralized Logging', 'Logstash Pipelines', 'Kibana Discovery'],
    color: 'from-yellow-500 to-emerald-500',
    borderColor: 'group-hover:border-yellow-500/70',
    shadowColor: 'group-hover:shadow-yellow-500/15'
  },

  // Databases & Scripting
  {
    name: 'PostgreSQL',
    shortName: 'PostgreSQL',
    category: 'Database & Scripting',
    level: 80,
    stage: 'Hands-on',
    stageType: 'handson',
    highlight: 'Vận hành Database trên K8s & VM, sao lưu/phục hồi định kỳ, cấu hình kết nối an toàn.',
    tags: ['Relational DB', 'Backup / Restore', 'Connection Pool'],
    color: 'from-blue-600 to-indigo-700',
    borderColor: 'group-hover:border-blue-500/70',
    shadowColor: 'group-hover:shadow-blue-500/15'
  },
  {
    name: 'MySQL',
    shortName: 'MySQL',
    category: 'Database & Scripting',
    level: 80,
    stage: 'Hands-on',
    stageType: 'handson',
    highlight: 'Quản trị môi trường Dev, Test & Staging; replication, dump & tối ưu queries.',
    tags: ['RDBMS', 'Replication', 'Staging Clusters'],
    color: 'from-cyan-600 to-blue-700',
    borderColor: 'group-hover:border-cyan-500/70',
    shadowColor: 'group-hover:shadow-cyan-500/15'
  },
  {
    name: 'Redis',
    shortName: 'Redis',
    category: 'Database & Scripting',
    level: 82,
    stage: 'Hands-on',
    stageType: 'handson',
    highlight: 'Cấu hình in-memory caching, Pub/Sub messaging, persistence RDB/AOF, cluster mode.',
    tags: ['In-Memory Cache', 'Pub/Sub', 'Cluster High-Avail'],
    color: 'from-red-500 to-rose-600',
    borderColor: 'group-hover:border-red-500/70',
    shadowColor: 'group-hover:shadow-red-500/15'
  },
  {
    name: 'Bash / Shell Scripting',
    shortName: 'Bash',
    category: 'Database & Scripting',
    level: 92,
    stage: 'Production Ready',
    stageType: 'production',
    highlight: 'Tự động hóa tác vụ hệ thống, script triển khai, cronjobs bảo trì, phân tích log dòng lệnh.',
    tags: ['System Automation', 'CLI Tooling', 'Cron Maintenance'],
    color: 'from-slate-700 to-slate-900',
    borderColor: 'group-hover:border-slate-500/70',
    shadowColor: 'group-hover:shadow-slate-500/15'
  },
  {
    name: 'Python',
    shortName: 'Python',
    category: 'Database & Scripting',
    level: 82,
    stage: 'Hands-on',
    stageType: 'handson',
    highlight: 'Scripts tự động hóa với Cloud SDKs, API integration, health check automation.',
    tags: ['Cloud SDKs', 'Automation Scripts', 'API Testing'],
    color: 'from-blue-500 to-yellow-500',
    borderColor: 'group-hover:border-blue-500/70',
    shadowColor: 'group-hover:shadow-blue-500/15'
  }
]

const stageBadgeStyles = {
  production: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
    dot: 'bg-emerald-500',
    label: 'Production-Ready'
  },
  handson: {
    bg: 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    dot: 'bg-blue-500',
    label: 'Hands-on'
  },
  practicing: {
    bg: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800',
    dot: 'bg-amber-500',
    label: 'Practicing'
  }
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState('Tất cả kỹ năng')

  const filteredSkills = useMemo(() => {
    if (activeTab === 'Tất cả kỹ năng') return skillsData
    return skillsData.filter((skill) => skill.category === activeTab)
  }, [activeTab])

  const stats = useMemo(() => {
    const total = skillsData.length
    const prodReady = skillsData.filter((s) => s.stageType === 'production').length
    const categoriesCount = skillCategories.length - 1
    return { total, prodReady, categoriesCount }
  }, [])

  return (
    <section id="skills" className="section-top-pad pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 via-white to-gray-50/70 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 min-h-screen relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-5 pointer-events-none"></div>
      <div className="absolute top-24 left-10 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-3 sm:mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            Năng Lực DevOps &amp; Cloud Native
          </div>
          {/* <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Kỹ Năng &amp;{' '}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 dark:from-blue-400 dark:via-cyan-300 dark:to-indigo-400 bg-clip-text text-transparent">
              Bộ Công Cụ Thực Chiến
            </span>
          </h1> */}
          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Bộ công cụ và nền tảng mình tiếp thu được trong suốt thời gian đi làm.
          </p>

          {/* Quick Stats Strip */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-6 mt-6 sm:mt-8 max-w-xl mx-auto">
            <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200/80 dark:border-gray-700/80 shadow-sm text-center">
              <span className="block text-lg sm:text-2xl font-black bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                {stats.total}+
              </span>
              <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium">
                Công cụ &amp; Nền tảng
              </span>
            </div>
            <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200/80 dark:border-gray-700/80 shadow-sm text-center">
              <span className="block text-lg sm:text-2xl font-black bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
                {stats.prodReady}
              </span>
              <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium">
                Production-Ready
              </span>
            </div>
            <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200/80 dark:border-gray-700/80 shadow-sm text-center">
              <span className="block text-lg sm:text-2xl font-black bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
                {stats.categoriesCount}
              </span>
              <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium">
                Nhóm chuyên môn
              </span>
            </div>
          </div>
        </div>

        {/* Category Tabs - Chỉ hiển thị trên Desktop & Tablet, ẩn trên Mobile để tránh lỗi tràn/rối */}
        <div className="hidden sm:block mb-8">
          <div className="flex flex-wrap justify-center gap-2 px-1">
            {skillCategories.map((cat) => {
              const IconComponent = cat.icon
              const isActive = activeTab === cat.name
              const count = cat.name === 'Tất cả kỹ năng'
                ? skillsData.length
                : skillsData.filter((s) => s.category === cat.name).length

              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => setActiveTab(cat.name)}
                  className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{cat.name}</span>
                  <span
                    className={`text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full font-mono font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Results Counter */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-3 px-1">
            <span>
              Hiển thị <strong>{filteredSkills.length}</strong> / {skillsData.length} kỹ năng {activeTab !== 'Tất cả kỹ năng' ? `(Nhóm: ${activeTab})` : ''}
            </span>
            {activeTab !== 'Tất cả kỹ năng' && (
              <button
                type="button"
                onClick={() => setActiveTab('Tất cả kỹ năng')}
                className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                Xem tất cả ({skillsData.length})
              </button>
            )}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-6">
          {filteredSkills.map((skill) => {
            const badge = stageBadgeStyles[skill.stageType] || stageBadgeStyles.handson

            return (
              <div
                key={skill.name}
                className="group relative rounded-2xl p-4 sm:p-5 bg-white dark:bg-gray-800/90 backdrop-blur-xl border border-gray-200/80 dark:border-gray-700/80 hover:border-blue-500/70 dark:hover:border-blue-500/70 shadow-sm hover:shadow-xl shadow-gray-900/5 hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Section */}
                <div>
                  {/* Top Bar: Logo on Left, Stage Badge on Right */}
                  <div className="flex items-center justify-between gap-2.5 mb-3">
                    {/* Brand Logo Container */}
                    <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200/80 dark:border-gray-600/60 p-2 sm:p-2.5 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 group-hover:bg-white dark:group-hover:bg-gray-700 transition-all duration-300">
                      <BrandLogo name={skill.shortName} size={30} />
                    </div>

                    {/* Stage Badge */}
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold border shrink-0 ${badge.bg}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>
                      {badge.label}
                    </span>
                  </div>

                  {/* Skill Category & Name (Full width - No text truncation/hidden words) */}
                  <div className="mb-2.5">
                    <span className="block text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400 mb-0.5">
                      {skill.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                      {skill.name}
                    </h3>
                  </div>

                  {/* Practical Highlight */}
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                    {skill.highlight}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2.5 border-t border-gray-100 dark:border-gray-700/60">
                  {skill.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700/60 text-gray-600 dark:text-gray-300 border border-gray-200/60 dark:border-gray-600/50"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
