import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Clock, ArrowRight, BookOpen, Sparkles } from 'lucide-react'
import { blogPosts } from '../../../data/blogData'

export default function HomeArticles() {
  const latestPosts = blogPosts.slice(0, 3)

  return (
    <section id="recent-articles" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-900/50 border-t border-gray-200/60 dark:border-gray-800/80">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-3 sm:mb-4">
              <BookOpen className="w-3.5 h-3.5 text-blue-500" />
              DevOps Engineering Notes
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Bài Viết &amp;{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:via-cyan-300 dark:to-indigo-400 bg-clip-text text-transparent">
                Chia Sẻ Kiến Thức
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Tổng hợp những kinh nghiệm thực tiễn về Kubernetes, GitOps và quản trị hạ tầng dưới dạng code.
            </p>
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 group self-start md:self-auto shrink-0 shadow-sm"
          >
            <span>Xem tất cả bài viết</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {latestPosts.map((post) => (
            <article
              key={post.id}
              className="group relative rounded-2xl bg-white dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/80 hover:border-blue-500/80 dark:hover:border-blue-500/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden transform hover:-translate-y-1.5"
            >
              {/* Header Gradient Banner */}
              <div className={`h-24 bg-gradient-to-br ${post.gradient} relative flex items-center justify-between px-6`}>
                <span className="px-3 py-1 rounded-full text-xs font-bold text-white/90 bg-black/20 backdrop-blur-md">
                  {post.category}
                </span>
                <span className="text-white/80 font-mono text-xs font-semibold">
                  DevOps Guide
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(post.date).toLocaleDateString('vi-VN')}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-5 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {post.tags.slice(0, 3).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700/60 text-gray-600 dark:text-gray-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Read More Link */}
                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 group-hover:translate-x-1 transition-all"
                  >
                    <span>Đọc bài viết đầy đủ</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
