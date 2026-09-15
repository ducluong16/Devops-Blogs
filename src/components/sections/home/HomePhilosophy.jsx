import React from 'react'
import { Zap, ShieldCheck, Eye, GitCommit, Sparkles } from 'lucide-react'

const principles = [
  {
    icon: Zap,
    title: 'Automate Everything',
    sub: 'Tự động hóa triệt để',
    color: 'from-amber-500 to-orange-500',
    quote: '"Nếu một tác vụ phải lặp lại nhiều hơn một lần, nó xứng đáng được tự động hóa bằng code."',
    desc: 'Loại bỏ thao tác thủ công (toil), chuẩn hóa quy trình qua CI/CD và Terraform để loại trừ rủi ro do lỗi con người.'
  },
  {
    icon: ShieldCheck,
    title: 'Security by Design',
    sub: 'Bảo mật DevSecOps',
    color: 'from-emerald-500 to-teal-500',
    quote: '"Bảo mật không phải là rào cản ở cuối dự án, mà là tiêu chuẩn trong từng dòng mã."',
    desc: 'Áp dụng mô hình Zero-Trust, bảo mật bí mật với HashiCorp Vault, quét lỗ hổng Trivy và phân quyền chặt chẽ với RBAC.'
  },
  {
    icon: Eye,
    title: 'Observable & Reliable',
    sub: 'Khả năng quan sát 24/7',
    color: 'from-blue-500 to-cyan-500',
    quote: '"Hệ thống không được giám sát là hệ thống chưa sẵn sàng cho môi trường Production."',
    desc: 'Kết hợp Prometheus, Grafana và ELK Stack để chủ động phát hiện dị thường, giám sát SLA/SLO trước khi người dùng bị ảnh hưởng.'
  },
  {
    icon: GitCommit,
    title: 'GitOps Single Source of Truth',
    sub: 'Khai báo & Lưu vết trên Git',
    color: 'from-purple-500 to-indigo-500',
    quote: '"Mọi trạng thái hạ tầng đều được mô tả bằng mã nguồn và kiểm soát phiên bản."',
    desc: 'Sử dụng Argo CD để đồng bộ trạng thái thực tế với Git, đảm bảo khả năng tái tạo môi trường và rollback tức thì khi xảy ra sự cố.'
  }
]

export default function HomePhilosophy() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800/80">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            Engineering Principles &amp; Culture
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Triết Lý Vận Hành &amp;{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">
              Văn Hóa Kỹ Thuật
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Kim chỉ nam giúp tôi xây dựng hạ tầng ổn định, tốc độ phát hành nhanh chóng và an toàn tuyệt đối.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="group relative rounded-2xl p-6 bg-gray-50/70 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700/80 hover:border-blue-500/80 dark:hover:border-blue-500/80 hover:bg-white dark:hover:bg-gray-800 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1.5"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-md shadow-blue-500/20 mb-5 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {item.title}
                  </h3>
                  <span className="inline-block text-xs font-semibold text-blue-600 dark:text-blue-400 mb-3">
                    {item.sub}
                  </span>

                  <blockquote className="text-xs italic text-gray-500 dark:text-gray-400 border-l-2 border-blue-500 pl-3 mb-4">
                    {item.quote}
                  </blockquote>
                </div>

                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed pt-3 border-t border-gray-200/70 dark:border-gray-700/70">
                  {item.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
