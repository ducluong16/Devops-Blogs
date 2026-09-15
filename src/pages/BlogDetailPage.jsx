import React, { useEffect, useState, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { blogPosts, getBlogPost } from '../data/blogData'
import {
  Calendar,
  Clock,
  Tag,
  ArrowLeft,
  User,
  ListOrdered,
  BookOpen,
  ArrowRight,
  Share2,
  Check,
  ChevronRight,
  ChevronDown,
  Copy,
  Terminal,
  ExternalLink,
  Sparkles,
  Link as LinkIcon
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { siGithub, siGmail } from 'simple-icons'

const slugify = (value) =>
  String(value)
    .toLocaleLowerCase('vi')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const headingText = (children) =>
  Array.isArray(children) ? children.map(headingText).join('') : String(children || '')

const getHeadings = (content) => {
  if (!content) return []
  const matches = [...content.matchAll(/^(#{2,3})\s+(.+)$/gm)]
  return matches.map((match) => {
    const level = match[1].length
    const text = match[2].replace(/[*_`]/g, '').trim()
    const id = slugify(text)
    return { level, text, id }
  })
}

// Dedicated Code Block with Window Bar & Copy Button
function CodeBlock({ language, code }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const displayLang = (language || 'TEXT').toUpperCase()

  return (
    <div className="relative my-7 rounded-2xl overflow-hidden border border-slate-700/80 bg-[#0d1117] shadow-xl">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800/90 border-b border-slate-700/80">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/90 inline-block"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/90 inline-block"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90 inline-block"></span>
          <span className="ml-2 font-mono text-[11px] font-bold tracking-wider text-slate-300">
            {displayLang}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-700/70 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Đã sao chép!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Sao chép code</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <div className="overflow-x-auto text-xs sm:text-sm">
        <SyntaxHighlighter
          language={language || 'text'}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1.25rem',
            background: 'transparent',
            fontSize: '0.875rem',
            lineHeight: '1.65'
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

function BlogDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const post = getBlogPost(id)

  const [activeHeading, setActiveHeading] = useState('')
  const [readProgress, setReadProgress] = useState(0)
  const [copiedLink, setCopiedLink] = useState(false)
  const [mobileTocOpen, setMobileTocOpen] = useState(false)

  const headings = useMemo(() => getHeadings(post?.content || ''), [post?.content])

  const headingGroups = useMemo(() => {
    return headings.reduce((groups, heading) => {
      if (heading.level === 2) {
        groups.push({ ...heading, children: [] })
      } else if (groups.length) {
        groups[groups.length - 1].children.push(heading)
      }
      return groups
    }, [])
  }, [headings])

  // Scroll spy & reading progress
  useEffect(() => {
    if (!post) return

    const handleScroll = () => {
      // Progress calculation
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100
        setReadProgress(Math.min(100, Math.max(0, progress)))
      }

      // Active heading detection
      const headingElements = headings.map((h) => document.getElementById(h.id)).filter(Boolean)
      if (!headingElements.length) return

      const scrollPos = window.scrollY + 160
      for (let i = headingElements.length - 1; i >= 0; i--) {
        if (headingElements[i].offsetTop <= scrollPos) {
          setActiveHeading(headings[i].id)
          return
        }
      }
      setActiveHeading(headings[0]?.id || '')
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [post, headings])

  // Copy article link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2500)
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 section-top-pad pb-20">
        <div className="max-w-4xl mx-auto px-4 text-center py-20">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Không tìm thấy bài viết
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Bài viết bạn đang tìm kiếm có thể đã được di chuyển hoặc không tồn tại.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại trang Blog</span>
          </Link>
        </div>
      </div>
    )
  }

  // Related posts & Next/Previous navigation
  const currentIndex = blogPosts.findIndex((p) => p.id === post.id)
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null

  const relatedPosts = blogPosts
    .filter((item) => item.id !== post.id)
    .map((item) => ({
      ...item,
      score:
        (item.category === post.category ? 3 : 0) +
        item.tags.filter((tag) => post.tags.includes(tag)).length
    }))
    .sort((a, b) => b.score - a.score || new Date(b.date) - new Date(a.date))
    .slice(0, 3)

  const markdownComponents = {
    // Hide duplicate H1 inside content
    h1: () => null,
    h2: ({ children }) => {
      const text = headingText(children)
      const id = slugify(text)
      return (
        <h2
          id={id}
          className="group flex items-center text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-5 pt-4 scroll-mt-24 border-b border-gray-100 dark:border-gray-800 pb-3"
        >
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mr-2.5 select-none">#</span>
          <span>{children}</span>
          <a
            href={`#${id}`}
            aria-label={`Neo tới ${text}`}
            className="opacity-0 group-hover:opacity-100 ml-3 text-blue-500 hover:text-blue-600 dark:text-blue-400 transition-opacity"
          >
            <LinkIcon className="w-4 h-4 inline" />
          </a>
        </h2>
      )
    },
    h3: ({ children }) => {
      const text = headingText(children)
      const id = slugify(text)
      return (
        <h3
          id={id}
          className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 scroll-mt-24 flex items-center"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 mr-2.5 shrink-0 inline-block"></span>
          <span>{children}</span>
        </h3>
      )
    },
    p: ({ children }) => (
      <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-[1.85] mb-6">
        {children}
      </p>
    ),
    code({ inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '')
      const codeString = String(children).replace(/\n$/, '')
      if (!inline && match) {
        return <CodeBlock language={match[1]} code={codeString} />
      }
      return (
        <code
          className="px-1.5 py-0.5 rounded-md font-mono text-xs sm:text-sm bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-gray-700 font-semibold"
          {...props}
        >
          {children}
        </code>
      )
    },
    blockquote: ({ children }) => (
      <blockquote className="my-6 pl-5 border-l-4 border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 py-3.5 pr-4 rounded-r-2xl italic text-gray-700 dark:text-gray-300 text-base leading-relaxed">
        {children}
      </blockquote>
    ),
    ul: ({ children }) => (
      <ul className="space-y-2.5 mb-6 list-disc list-outside pl-6 text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="space-y-2.5 mb-6 list-decimal list-outside pl-6 text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
        {children}
      </ol>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="text-blue-600 dark:text-blue-400 font-medium underline underline-offset-4 decoration-blue-300 dark:decoration-blue-600 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
      >
        {children}
      </a>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50/60 dark:bg-gray-900/90 section-top-pad pb-24 relative">
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 z-[60] transition-all duration-100"
        style={{ width: `${readProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation / Breadcrumb Row */}
        <div className="flex items-center justify-between py-4 mb-6 text-xs sm:text-sm">
          <button
            onClick={() => navigate('/blog')}
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Quay lại danh sách Blog</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">Trang chủ</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-blue-600 dark:hover:text-blue-400">Blog</Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white font-medium truncate max-w-[200px]">{post.category}</span>
          </div>
        </div>

        {/* Article Header Card */}
        <header className="relative rounded-3xl overflow-hidden mb-10 shadow-xl border border-gray-200/80 dark:border-gray-700/80 bg-white dark:bg-gray-800">
          {/* Top Gradient Banner */}
          <div className={`h-36 sm:h-44 bg-gradient-to-r ${post.gradient} relative overflow-hidden flex items-end p-6 sm:p-8`}>
            <div className="absolute inset-0 opacity-20 bg-grid-pattern"></div>
            <div className="relative z-10">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-black/30 backdrop-blur-md border border-white/20">
                {post.category}
              </span>
            </div>
          </div>

          {/* Header Content */}
          <div className="p-6 sm:p-10">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight mb-6">
              {post.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100 dark:border-gray-700/80">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                    PL
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white block">{post.author}</span>
                    <span className="text-[11px] text-gray-400 block">DevOps Engineer</span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  {new Date(post.date).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-500" />
                  {post.readTime}
                </span>
              </div>

              {/* Share / Copy Link Button */}
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-colors"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">Đã sao chép link!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Chia sẻ bài viết</span>
                  </>
                )}
              </button>
            </div>

            {/* Excerpt Card */}
            {post.excerpt && (
              <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-800/60 text-sm sm:text-base text-blue-900 dark:text-blue-200 leading-relaxed font-medium">
                {post.excerpt}
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-700/60 text-gray-700 dark:text-gray-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/40 dark:hover:text-blue-300 transition-colors"
                >
                  <Tag className="w-3 h-3 text-blue-500" />
                  <span>{tag}</span>
                </Link>
              ))}
            </div>
          </div>
        </header>

        {/* Main Content Layout (Sidebar TOC + Article Body) */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Sticky Table of Contents (Desktop) */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-24">
            <div className="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 shadow-lg">
              <div className="flex items-center justify-between pb-3.5 border-b border-gray-100 dark:border-gray-700/80 mb-4">
                <div className="flex items-center gap-2">
                  <ListOrdered className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-gray-900 dark:text-white">
                    Mục Lục Bài Viết
                  </span>
                </div>
                <span className="text-[11px] font-mono text-gray-400">
                  {Math.round(readProgress)}%
                </span>
              </div>

              <nav className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
                {headingGroups.map((group) => {
                  const isGroupActive = activeHeading === group.id || group.children.some((c) => c.id === activeHeading)
                  return (
                    <div key={group.id} className="space-y-1">
                      <a
                        href={`#${group.id}`}
                        className={`block py-1.5 px-2.5 rounded-lg text-xs font-semibold transition-all leading-snug ${
                          activeHeading === group.id
                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold border-l-2 border-blue-600'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50'
                        }`}
                      >
                        {group.text}
                      </a>

                      {group.children.length > 0 && (
                        <div className="pl-3 space-y-1 border-l border-gray-200/80 dark:border-gray-700 ml-2">
                          {group.children.map((child) => (
                            <a
                              key={child.id}
                              href={`#${child.id}`}
                              className={`block py-1 px-2 rounded-md text-[11px] transition-all leading-snug ${
                                activeHeading === child.id
                                  ? 'text-blue-600 dark:text-blue-400 font-bold bg-blue-50/60 dark:bg-blue-900/20'
                                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                              }`}
                            >
                              {child.text}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* Right/Center Column: Article Body */}
          <main className="lg:col-span-8 xl:col-span-9">
            {/* Mobile Collapsible TOC */}
            <div className="lg:hidden mb-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md p-4">
              <button
                type="button"
                onClick={() => setMobileTocOpen(!mobileTocOpen)}
                className="w-full flex items-center justify-between text-left font-bold text-sm text-gray-900 dark:text-white"
              >
                <div className="flex items-center gap-2">
                  <ListOrdered className="w-4 h-4 text-blue-500" />
                  <span>Mục lục bài viết ({headings.length} phần)</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileTocOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileTocOpen && (
                <nav className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 space-y-2 max-h-60 overflow-y-auto">
                  {headings.map((h) => (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      onClick={() => setMobileTocOpen(false)}
                      className={`block text-xs py-1 ${
                        h.level === 3 ? 'pl-4 text-gray-500' : 'font-semibold text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {h.text}
                    </a>
                  ))}
                </nav>
              )}
            </div>

            {/* Main Markdown Article Content */}
            <article className="rounded-3xl bg-white dark:bg-gray-800 p-6 sm:p-10 lg:p-12 border border-gray-200/80 dark:border-gray-700/80 shadow-xl">
              <ReactMarkdown components={markdownComponents}>
                {post.content}
              </ReactMarkdown>

              {/* Author Bio Box */}
              <div className="mt-14 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="rounded-2xl p-6 bg-gray-50 dark:bg-gray-700/40 border border-gray-200/80 dark:border-gray-700 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-lg shadow-blue-500/20">
                    PL
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2 mb-1.5">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                        {post.author}
                      </h4>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold">
                        DevOps Author
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                      Junior DevOps Engineer tại Hà Nội. Đam mê xây dựng hệ thống tự động hóa CI/CD GitOps, hạ tầng đám mây và nền tảng Kubernetes an toàn, hiệu quả.
                    </p>
                    <div className="flex items-center justify-center sm:justify-start gap-3">
                      <a
                        href="https://github.com/ducluong16"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d={siGithub.path} /></svg>
                        <span>GitHub</span>
                      </a>
                      <a
                        href="mailto:ducluong16@gmail.com"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-red-500"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d={siGmail.path} /></svg>
                        <span>Email</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prev / Next Article Navigation */}
              <div className="grid sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-100 dark:border-gray-700/60">
                {prevPost ? (
                  <Link
                    to={`/blog/${prevPost.id}`}
                    className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-700/30 hover:border-blue-500 transition-all group flex flex-col justify-between"
                  >
                    <span className="text-[11px] font-semibold text-gray-400 flex items-center gap-1 mb-1">
                      <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                      Bài trước
                    </span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">
                      {prevPost.title}
                    </span>
                  </Link>
                ) : (
                  <div></div>
                )}

                {nextPost ? (
                  <Link
                    to={`/blog/${nextPost.id}`}
                    className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-700/30 hover:border-blue-500 transition-all group flex flex-col justify-between text-right"
                  >
                    <span className="text-[11px] font-semibold text-gray-400 flex items-center justify-end gap-1 mb-1">
                      Bài tiếp theo
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2">
                      {nextPost.title}
                    </span>
                  </Link>
                ) : (
                  <div></div>
                )}
              </div>
            </article>

            {/* Related Posts Section */}
            {relatedPosts.length > 0 && (
              <div className="mt-14">
                <div className="flex items-center gap-2 mb-6">
                  <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Bài Viết Liên Quan
                  </h3>
                </div>

                <div className="grid sm:grid-cols-3 gap-5">
                  {relatedPosts.map((item) => (
                    <Link
                      key={item.id}
                      to={`/blog/${item.id}`}
                      className="group p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/80 hover:border-blue-500/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1"
                    >
                      <div>
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 inline-block mb-3">
                          {item.category}
                        </span>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">
                          {item.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-gray-400 pt-3 border-t border-gray-100 dark:border-gray-700/60">
                        <span>{item.readTime}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-blue-500 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default BlogDetailPage
