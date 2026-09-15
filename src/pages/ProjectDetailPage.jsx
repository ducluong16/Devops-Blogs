import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock } from 'lucide-react'

function ProjectDetailPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-[120px] pb-20 flex items-center justify-center">
      <div className="max-w-xl mx-auto px-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-6 border border-amber-500/30">
          <Clock className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight">
          Dự Án Đang Cập Nhật (Coming Soon)
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-8 leading-relaxed">
          Nội dung chi tiết kiến trúc dự án này đang trong quá trình chuẩn bị và sẽ hoàn thiện sớm. Cảm ơn bạn đã quan tâm!
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-blue-500/25 hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:-translate-y-0.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại Trang Chủ
        </button>
      </div>
    </div>
  )
}

export default ProjectDetailPage
