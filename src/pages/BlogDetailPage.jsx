import { useParams, Link, useNavigate } from 'react-router-dom'
import { blogPosts, getBlogPost } from '../data/blogData'
import { Calendar, Clock, Tag, ArrowLeft, User, List, BookOpen } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

const slugify = value => String(value).toLocaleLowerCase('vi').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const headingText = children => Array.isArray(children) ? children.join('') : String(children)
const getHeadings = content => [...content.matchAll(/^(#{2,3})\s+(.+)$/gm)].map(match => ({ level: match[1].length, text: match[2].replace(/[*_`]/g, ''), id: slugify(match[2]) }))

function BlogDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const post = getBlogPost(id)

  if (!post) return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20"><div className="max-w-4xl mx-auto px-4 text-center"><h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Blog Post Not Found</h1><Link to="/blog" className="text-blue-600 hover:underline">← Back to Blog</Link></div></div>

  const headings = getHeadings(post.content)
  const related = blogPosts.filter(item => item.id !== post.id).map(item => ({ ...item, score: (item.category === post.category ? 3 : 0) + item.tags.filter(tag => post.tags.includes(tag)).length })).sort((a,b) => b.score-a.score || new Date(b.date)-new Date(a.date)).slice(0,3)

  const markdownComponents = {
    code({ inline, className, children, ...props }) { const match=/language-(\w+)/.exec(className||''); return !inline&&match?<SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" {...props}>{String(children).replace(/\n$/,'')}</SyntaxHighlighter>:<code className={className} {...props}>{children}</code> },
    h2: ({children}) => { const text=headingText(children); return <h2 id={slugify(text)} className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-24">{children}</h2> },
    h3: ({children}) => { const text=headingText(children); return <h3 id={slugify(text)} className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 scroll-mt-24">{children}</h3> },
    p: ({children}) => <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">{children}</p>,
    ul: ({children}) => <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700 dark:text-gray-300">{children}</ul>,
    ol: ({children}) => <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-700 dark:text-gray-300">{children}</ol>,
  }

  return <div className="blog-detail-page">
    <div className="blog-detail-shell">
      <button onClick={()=>navigate('/blog')} className="detail-back"><ArrowLeft/>Quay lại Blog</button>
      <div className="detail-layout">
        <aside className="detail-toc"><div className="aside-heading"><List/><span>Mục lục</span></div><nav>{headings.map(item=><a key={`${item.id}-${item.level}`} className={item.level===3?'subheading':''} href={`#${item.id}`}>{item.text}</a>)}</nav></aside>

        <article className="detail-article">
          <header><div className={`detail-accent bg-gradient-to-r ${post.gradient}`}><span>{post.category}</span></div><div className="detail-header-body"><h1>{post.title}</h1><div className="detail-meta"><span><User/>{post.author}</span><span><Calendar/>{new Date(post.date).toLocaleDateString('vi-VN')}</span><span><Clock/>{post.readTime}</span></div><div className="detail-tags">{post.tags.map(tag=><span key={tag}><Tag/>{tag}</span>)}</div></div></header>
          <div className="detail-content prose prose-lg dark:prose-invert max-w-none"><ReactMarkdown components={markdownComponents}>{post.content}</ReactMarkdown></div>
        </article>

        <aside className="related-posts"><div className="aside-heading"><BookOpen/><span>Bài viết liên quan</span></div><div>{related.map(item=><Link to={`/blog/${item.id}`} key={item.id} className="related-card"><div className={`related-thumb bg-gradient-to-br ${item.gradient}`}>{item.image?<img src={item.image} alt="" loading="lazy"/>:<BookOpen/>}</div><div className="related-copy"><h3>{item.title}</h3></div></Link>)}</div><Link className="all-posts-link" to="/blog">Xem tất cả bài viết</Link></aside>
      </div>
    </div>
  </div>
}

export default BlogDetailPage
