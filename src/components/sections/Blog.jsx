import React, { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  Calendar,
  Clock,
  ArrowRight,
  Search,
  X,
  SlidersHorizontal,
  Tag,
  BookOpen,
  Sparkles,
  Layers,
  User
} from 'lucide-react'
import { blogPosts } from '../../data/blogData'

const normalize = (value) =>
  String(value)
    .toLocaleLowerCase('vi')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

const categories = ['Tất cả', 'Kubernetes', 'CI/CD', 'IaC']

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('Tất cả')
  const [activeTag, setActiveTag] = useState(() => searchParams.get('tag') || '')
  const [sort, setSort] = useState('newest')

  const tags = useMemo(() => [...new Set(blogPosts.flatMap((post) => post.tags))], [])

  const filteredPosts = useMemo(() => {
    const keyword = normalize(query.trim())
    return blogPosts
      .filter((post) => {
        if (activeCategory !== 'Tất cả' && post.category !== activeCategory) return false
        if (activeTag && !post.tags.includes(activeTag)) return false
        if (keyword) {
          const content = normalize([post.title, post.excerpt, post.category, ...post.tags].join(' '))
          if (!content.includes(keyword)) return false
        }
        return true
      })
      .sort((a, b) => {
        if (sort === 'oldest') return new Date(a.date) - new Date(b.date)
        if (sort === 'reading') return parseInt(a.readTime) - parseInt(b.readTime)
        return new Date(b.date) - new Date(a.date)
      })
  }, [query, activeCategory, activeTag, sort])

  const hasFilters = query || activeCategory !== 'Tất cả' || activeTag || sort !== 'newest'

  const resetFilters = () => {
    setQuery('')
    setActiveCategory('Tất cả')
    setActiveTag('')
    setSort('newest')
  }

  useEffect(() => {
    const tagParam = searchParams.get('tag')
    if (tagParam) {
      setActiveTag(tagParam)
    }
  }, [searchParams])

  return (
    <section id="blog" className="section-top-pad pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 via-white to-gray-50/70 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 min-h-screen relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-5 pointer-events-none"></div>
      <div className="absolute top-24 right-10 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-4">
            <BookOpen className="w-3.5 h-3.5 text-blue-500" />
            Ghi Chép Kỹ Thuật &amp; Kiến Thức DevOps
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Blog &amp;{' '}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 dark:from-blue-400 dark:via-cyan-300 dark:to-indigo-400 bg-clip-text text-transparent">
              Chia Sẻ Kỹ Thuật
            </span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            Nơi tôi chia sẻ các bài viết chuyên sâu về Kubernetes, CI/CD tự động hóa, GitOps với Argo CD và Terraform IaC từ kinh nghiệm thực chiến.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat) => {
              const isActive = activeCategory === cat
              const count = cat === 'Tất cả'
                ? blogPosts.length
                : blogPosts.filter((p) => p.category === cat).length

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Filter / Search Bar */}
        <div className="max-w-4xl mx-auto mb-8 p-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
            {/* Search Input */}
            <div className="sm:col-span-6 relative flex items-center">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm bài viết, công nghệ..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Xóa từ khóa"
                  className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 absolute right-2.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Tag Filter Dropdown */}
            <div className="sm:col-span-3 relative flex items-center">
              <Tag className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
              <select
                value={activeTag}
                onChange={(e) => setActiveTag(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-xs sm:text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="">Tất cả thẻ (Tags)</option>
                {tags.map((t) => (
                  <option key={t} value={t}>
                    #{t}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="sm:col-span-3 relative flex items-center">
              <SlidersHorizontal className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-xs sm:text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="newest">Mới nhất</option>
                <option value="oldest">Cũ nhất</option>
                <option value="reading">Đọc nhanh nhất</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Info Bar */}
        <div className="flex flex-wrap items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-6 px-1 gap-2">
          <span>
            Hiển thị <strong>{filteredPosts.length}</strong> / {blogPosts.length} bài viết
          </span>

          <div className="flex items-center gap-3">
            {activeTag && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 font-medium">
                #{activeTag}
                <button
                  type="button"
                  onClick={() => setActiveTag('')}
                  aria-label="Bỏ chọn tag"
                  className="hover:text-blue-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {hasFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                Đặt lại bộ lọc
              </button>
            )}
          </div>
        </div>

        {/* Articles Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="group relative rounded-3xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 hover:border-blue-500/80 dark:hover:border-blue-500/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden transform hover:-translate-y-1.5"
              >
                {/* Top Banner */}
                <Link
                  to={`/blog/${post.id}`}
                  className={`h-36 sm:h-40 bg-gradient-to-br ${post.gradient} relative flex items-end p-5 overflow-hidden block`}
                >
                  <div className="absolute inset-0 opacity-20 bg-grid-pattern"></div>
                  <div className="relative z-10 flex items-center justify-between w-full">
                    <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-black/30 backdrop-blur-md border border-white/20 shadow-sm">
                      {post.category}
                    </span>
                    <span className="text-white/90 text-xs font-mono font-medium">
                      {post.readTime}
                    </span>
                  </div>
                </Link>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Meta info */}
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-blue-500" />
                        {new Date(post.date).toLocaleDateString('vi-VN')}
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                      <Link to={`/blog/${post.id}`}>{post.title}</Link>
                    </h2>

                    {/* Excerpt */}
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-5 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {post.tags.slice(0, 3).map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => setActiveTag(tag)}
                          className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700/60 text-gray-600 dark:text-gray-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/40 dark:hover:text-blue-300 transition-colors"
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>

                    {/* Card Footer */}
                    <div className="pt-4 border-t border-gray-100 dark:border-gray-700/70 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold">
                          PL
                        </div>
                        <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                          {post.author}
                        </span>
                      </div>

                      <Link
                        to={`/blog/${post.id}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 group-hover:translate-x-1 transition-all"
                      >
                        <span>Đọc tiếp</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 px-4 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 max-w-md mx-auto shadow-sm">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Không tìm thấy bài viết phù hợp
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-5 leading-relaxed">
              Không có bài viết nào khớp với từ khóa hoặc bộ lọc đã chọn. Hãy thử tìm với từ khóa khác.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Blog
