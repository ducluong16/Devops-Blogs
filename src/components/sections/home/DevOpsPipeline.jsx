import React, { useState } from 'react'
import {
  Code2,
  Cpu,
  ShieldCheck,
  GitPullRequest,
  Cloud,
  Activity,
  ChevronRight,
  Terminal,
  CheckCircle2,
  Sparkles
} from 'lucide-react'

const pipelineStages = [
  {
    id: 'source',
    number: '01',
    name: 'Source & Quality',
    shortTitle: 'Source',
    role: 'Code Quality & Standards',
    icon: Code2,
    gradient: 'from-blue-500 to-cyan-500',
    accentColor: 'text-blue-500 dark:text-blue-400',
    bgLight: 'bg-blue-50/60 dark:bg-blue-950/30',
    borderActive: 'border-blue-500',
    description: 'Quản lý mã nguồn với Git, chuẩn hóa quy trình review và kiểm tra chất lượng tự động trước khi merge.',
    tools: ['Git', 'GitHub', 'GitLab', 'Pre-commit Hooks', 'SonarQube'],
    features: [
      'Trunk-based development & semantic branch naming convention',
      'Automated linting, formatting và unit testing trên Pull Request',
      'Branch protection rules bảo vệ nhánh main/master tuyệt đối',
      'Static Application Security Testing (SAST) phát hiện lỗi sớm'
    ],
    snippet: `# Pre-commit & Branch Protection Check
git checkout -b feature/vault-k8s-auth
git commit -m "feat(security): integrate hashicorp vault with k8s serviceaccount"
# Automated lint & test passing before PR approval ✓`
  },
  {
    id: 'ci',
    number: '02',
    name: 'CI Automation',
    shortTitle: 'CI Build',
    role: 'Automated Build & Test',
    icon: Cpu,
    gradient: 'from-indigo-500 to-purple-500',
    accentColor: 'text-indigo-500 dark:text-indigo-400',
    bgLight: 'bg-indigo-50/60 dark:bg-indigo-950/30',
    borderActive: 'border-indigo-500',
    description: 'Xây dựng pipeline tự động hóa build container, chạy test song song và quét lỗ hổng bảo mật image.',
    tools: ['Jenkins Pipeline', 'GitLab CI', 'GitHub Actions', 'Docker BuildKit', 'Trivy'],
    features: [
      'Multi-stage Docker builds tối ưu kích thước image siêu nhẹ',
      'BuildKit caching tăng tốc độ đóng gói lên tới 3-5x',
      'Automated security scanning (Trivy) chặn CVE nguy hiểm',
      'Tự động push image kèm commit SHA tag lên Registry'
    ],
    snippet: `# Multi-stage Build & Vulnerability Scan
docker buildx build --cache-from=type=registry --target production -t app:\${GIT_SHA} .
trivy image --severity HIGH,CRITICAL --exit-code 1 app:\${GIT_SHA}
# Push approved artifact to Container Registry ✓`
  },
  {
    id: 'security',
    number: '03',
    name: 'Security & Secrets',
    shortTitle: 'Security',
    role: 'Zero-Trust & Identity',
    icon: ShieldCheck,
    gradient: 'from-amber-500 to-rose-500',
    accentColor: 'text-amber-500 dark:text-amber-400',
    bgLight: 'bg-amber-50/60 dark:bg-amber-950/30',
    borderActive: 'border-amber-500',
    description: 'Kiến trúc bảo mật DevSecOps, quản lý bí mật tập trung và xác thực phân quyền an toàn tuyệt đối.',
    tools: ['HashiCorp Vault', 'Keycloak SSO', 'Kubernetes RBAC', 'Cert-Manager', 'OpenSSL'],
    features: [
      'Không lưu mật khẩu/secret dưới dạng plaintext trong Git',
      'Dynamic secrets tự động xoay vòng (auto-rotation) từ Vault',
      'Xác thực tập trung Keycloak SSO cho toàn bộ hệ thống nội bộ',
      'Phân quyền chi tiết (RBAC) theo nguyên tắc Least Privilege'
    ],
    snippet: `# Vault Agent Injector & Keycloak Integration
vault kv get -mount=secret production/database/credentials
# Injected via Vault CSI Driver directly to Pod memory
# TLS certs automatically renewed via cert-manager ✓`
  },
  {
    id: 'gitops',
    number: '04',
    name: 'GitOps Delivery',
    shortTitle: 'GitOps',
    role: 'Declarative Deployment',
    icon: GitPullRequest,
    gradient: 'from-emerald-500 to-teal-500',
    accentColor: 'text-emerald-500 dark:text-emerald-400',
    bgLight: 'bg-emerald-50/60 dark:bg-emerald-950/30',
    borderActive: 'border-emerald-500',
    description: 'Áp dụng mô hình GitOps với Argo CD: Mọi trạng thái cụm K8s đều được khai báo và phiên bản hóa trên Git.',
    tools: ['Argo CD', 'Helm Charts', 'Kustomize', 'Kubernetes Manifests'],
    features: [
      'Git repository là nguồn chân lý duy nhất (Single Source of Truth)',
      'Tự động đồng bộ (Auto-sync) và tự phục hồi (Self-healing) cấu hình',
      'Zero-downtime deployment (Rolling update, Blue-Green / Canary)',
      'Khôi phục sự cố tức thì (1-click rollback) khi có vấn đề'
    ],
    snippet: `# Argo CD Declarative Sync
argocd app sync root-application --prune --strategy hook
# Sync Status: Healthy & Synced
# Zero downtime rollout to Kubernetes cluster ✓`
  },
  {
    id: 'infra',
    number: '05',
    name: 'Infrastructure as Code',
    shortTitle: 'IaC & Cloud',
    role: 'Reproducible Platform',
    icon: Cloud,
    gradient: 'from-cyan-500 to-blue-600',
    accentColor: 'text-cyan-500 dark:text-cyan-400',
    bgLight: 'bg-cyan-50/60 dark:bg-cyan-950/30',
    borderActive: 'border-cyan-500',
    description: 'Định nghĩa và cấp phát hạ tầng tự động, tái sử dụng dễ dàng qua mã nguồn Terraform.',
    tools: ['Terraform', 'Google Cloud (GCP)', 'OpenStack', 'AWS EKS', 'Linux OS'],
    features: [
      'Module hóa Terraform dễ mở rộng cho nhiều môi trường',
      'Remote state lưu trữ an toàn kèm cơ chế lock tránh xung đột',
      'Tối ưu hóa tài nguyên phần cứng, cân bằng tải và bảo mật mạng VPC',
      'Quản lý hạ tầng Hybrid Cloud & On-Premises đồng bộ'
    ],
    snippet: `# Terraform Infrastructure Provisioning
terraform plan -out=tfplan.binary
terraform apply tfplan.binary
# Provisioned: VPC, K8s Nodes, Storage, Ingress & Firewalls ✓`
  },
  {
    id: 'observe',
    number: '06',
    name: 'Observability & Logs',
    shortTitle: 'Observability',
    role: 'Monitoring & Alerting',
    icon: Activity,
    gradient: 'from-purple-500 to-pink-500',
    accentColor: 'text-purple-500 dark:text-purple-400',
    bgLight: 'bg-purple-50/60 dark:bg-purple-950/30',
    borderActive: 'border-purple-500',
    description: 'Giám sát chủ động 24/7 toàn bộ cụm máy chủ, dịch vụ và cảnh báo sự cố trước khi người dùng phát hiện.',
    tools: ['Prometheus', 'Grafana', 'ELK Stack', 'Elasticsearch', 'Alertmanager'],
    features: [
      'Dashboard Grafana trực quan hóa chỉ số CPU, RAM, Network, Pod health',
      'Tập trung toàn bộ log ứng dụng qua Elasticsearch & Kibana',
      'Định tuyến cảnh báo thông minh qua Telegram/Slack khi phát sinh lỗi',
      'Theo dõi SLA/SLO và truy vết nguồn gốc bottleneck hệ thống'
    ],
    snippet: `# Prometheus Metric Query & Alert Rule
sum(rate(container_cpu_usage_seconds_total{namespace="production"}[5m])) by (pod)
# Centralized logging stream to ELK cluster
# Alert routed to DevOps on-call team within 15s ✓`
  }
]

export default function DevOpsPipeline() {
  const [activeStage, setActiveStage] = useState(pipelineStages[0])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-gray-50/50 via-white to-gray-50/50 dark:from-gray-900/50 dark:via-gray-900 dark:to-gray-900/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            DevOps &amp; GitOps Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Quy trình vận hành{' '}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 dark:from-blue-400 dark:via-cyan-300 dark:to-indigo-400 bg-clip-text text-transparent">
              Từ Code đến Production
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Khám phá quy trình tự động hóa khép kín chuẩn DevOps tôi xây dựng và vận hành hàng ngày: An toàn, nhanh chóng và có thể quan sát toàn diện.
          </p>
        </div>

        {/* Pipeline Navigation / Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 mb-8">
          {pipelineStages.map((stage) => {
            const Icon = stage.icon
            const isActive = activeStage.id === stage.id
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setActiveStage(stage)}
                className={`relative flex flex-col items-center sm:items-start p-3 sm:p-4 rounded-xl text-left transition-all duration-300 border ${
                  isActive
                    ? `${stage.borderActive} bg-white dark:bg-gray-800 shadow-xl shadow-blue-500/10 scale-[1.02]`
                    : 'border-gray-200/80 dark:border-gray-700/80 bg-white/60 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 hover:border-gray-300'
                }`}
              >
                {isActive && (
                  <span className={`absolute -top-1.5 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-gradient-to-r ${stage.gradient}`}></span>
                )}
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="text-[11px] font-mono font-bold text-gray-400 dark:text-gray-500">
                    {stage.number}
                  </span>
                  <div className={`p-1.5 rounded-lg ${isActive ? stage.bgLight : 'bg-gray-100 dark:bg-gray-700/50'}`}>
                    <Icon className={`w-4 h-4 ${isActive ? stage.accentColor : 'text-gray-500'}`} />
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white truncate w-full">
                  {stage.shortTitle}
                </p>
                <p className="hidden sm:block text-[11px] text-gray-500 dark:text-gray-400 truncate w-full mt-0.5">
                  {stage.role}
                </p>
              </button>
            )
          })}
        </div>

        {/* Active Stage Showcase Card */}
        <div className="relative rounded-3xl p-[1px] bg-gradient-to-r from-blue-500/30 via-indigo-500/20 to-purple-500/30 shadow-2xl">
          <div className="rounded-[calc(1.5rem-1px)] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl p-6 sm:p-8 lg:p-10">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Stage Info & Best Practices */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${activeStage.gradient}`}>
                    Stage {activeStage.number}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    {activeStage.name}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  {activeStage.description}
                </p>

                {/* Tool Pills */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                    Công nghệ &amp; Công cụ chủ đạo
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeStage.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200/80 dark:border-gray-700/80"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                    Tiêu chuẩn triển khai thực tế
                  </h4>
                  <ul className="space-y-2.5">
                    {activeStage.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${activeStage.accentColor}`} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column: Code / Terminal Snippet */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="rounded-2xl overflow-hidden border border-slate-700/90 shadow-2xl bg-[#090d16]">
                  {/* Terminal Header */}
                  <div className="flex items-center justify-between px-4 py-3 bg-slate-800/80 border-b border-slate-700">
                    <div className="flex gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                      <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                      pipeline://stage-{activeStage.id}.sh
                    </div>
                    <span className="w-8"></span>
                  </div>

                  {/* Terminal Body */}
                  <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed overflow-x-auto">
                    <pre className="whitespace-pre-wrap">{activeStage.snippet}</pre>
                  </div>

                  {/* Status Bar */}
                  <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      Pipeline Execution: Passed
                    </span>
                    <span>100% Automated</span>
                  </div>
                </div>

                <div className="mt-4 p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-800/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-blue-700 dark:text-blue-300 font-medium">
                      Trải nghiệm toàn bộ 6 bước trên quy trình thực tế
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-blue-500 shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
