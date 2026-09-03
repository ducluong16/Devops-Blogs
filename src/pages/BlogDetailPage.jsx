import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { blogPosts, getBlogPost } from '../data/blogData'
import { Calendar, Clock, Tag, ArrowLeft, User, List, BookOpen, ArrowUpRight, ChevronDown } from 'lucide-react'
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
  const [activeHeading, setActiveHeading] = useState('')
  const [expandedHeadings, setExpandedHeadings] = useState([])
  const headings = getHeadings(post?.content || '')
  const headingGroups = headings.reduce((groups, heading) => {
    if (heading.level === 2) groups.push({ ...heading, children: [] })
    else if (groups.length) groups[groups.length - 1].children.push(heading)
    return groups
  }, [])

  useEffect(() => {
    setActiveHeading(headings[0]?.id || '')
    let animationFrame
    const updateActiveHeading = () => {
      window.cancelAnimationFrame(animationFrame)
      animationFrame = window.requestAnimationFrame(() => {
        const contentRoot = document.querySelector('.detail-content')
        const elements = contentRoot ? [...contentRoot.querySelectorAll('h2[id], h3[id]')] : []
        if (!elements.length) return

        const readingLine = Math.min(260, window.innerHeight * 0.3)
        const positions = elements.map(element => ({
          element,
          top: element.getBoundingClientRect().top
        }))
        const passedHeadings = positions
          .filter(position => position.top <= readingLine)
          .sort((a, b) => b.top - a.top)
        const currentHeading = passedHeadings[0]?.element || positions.sort((a, b) => a.top - b.top)[0].element

        setActiveHeading(currentHeading.id)
      })
    }

    const initialFrame = window.requestAnimationFrame(updateActiveHeading)
    const positionWatcher = window.setInterval(updateActiveHeading, 120)
    document.addEventListener('scroll', updateActiveHeading, true)
    window.addEventListener('scroll', updateActiveHeading, { passive: true })
    window.addEventListener('resize', updateActiveHeading)
    return () => {
      window.cancelAnimationFrame(initialFrame)
      window.cancelAnimationFrame(animationFrame)
      window.clearInterval(positionWatcher)
      document.removeEventListener('scroll', updateActiveHeading, true)
      window.removeEventListener('scroll', updateActiveHeading)
      window.removeEventListener('resize', updateActiveHeading)
    }
  }, [id])

  if (!post) return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-[88px] pb-20"><div className="max-w-4xl mx-auto px-4 text-center"><h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Blog Post Not Found</h1><Link to="/blog" className="text-blue-600 hover:underline">← Back to Blog</Link></div></div>

  const related = blogPosts.filter(item => item.id !== post.id).map(item => ({ ...item, score: (item.category === post.category ? 3 : 0) + item.tags.filter(tag => post.tags.includes(tag)).length })).sort((a,b) => b.score-a.score || new Date(b.date)-new Date(a.date)).slice(0,3)

  const toggleHeading = id => setExpandedHeadings(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])

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
        <aside className="detail-toc"><div className="aside-heading"><List/><span>Mục lục</span></div><nav>{headingGroups.map(group => { const expanded=expandedHeadings.includes(group.id); const groupActive=activeHeading===group.id||group.children.some(child=>child.id===activeHeading); return <div className="toc-group" key={group.id}><div className={`toc-parent ${groupActive?'active':''}`}><a href={`#${group.id}`} onClick={()=>{setActiveHeading(group.id);if(group.children.length)toggleHeading(group.id)}}>{group.text}</a>{group.children.length>0&&<button type="button" onClick={()=>toggleHeading(group.id)} aria-label={`${expanded?'Thu gọn':'Mở rộng'} ${group.text}`} aria-expanded={expanded}><ChevronDown className={expanded?'expanded':''}/></button>}</div>{expanded&&group.children.length>0&&<div className="toc-children">{group.children.map(child=><a key={child.id} className={activeHeading===child.id?'active':''} href={`#${child.id}`} onClick={()=>setActiveHeading(child.id)}>{child.text}</a>)}</div>}</div>})}</nav></aside>

        <article className="detail-article">
          <header className={`detail-hero bg-gradient-to-br ${post.gradient}`}>
            <div className="detail-hero-content">
              <div className="detail-hero-top"><span className="detail-category">{post.category}</span></div>
              <h1>{post.title}</h1>
              <div className="detail-meta"><span><User/>{post.author}</span><span><Calendar/>{new Date(post.date).toLocaleDateString('vi-VN')}</span><span><Clock/>{post.readTime}</span></div>
              <div className="detail-tags">{post.tags.map(tag=><Link key={tag} to={`/blog?tag=${encodeURIComponent(tag)}`}><Tag/>{tag}</Link>)}</div>
            </div>
          </header>
          <div className="detail-content prose prose-lg dark:prose-invert max-w-none"><ReactMarkdown components={markdownComponents}>{post.content}</ReactMarkdown></div>
        </article>

        <aside className="related-posts"><div className="aside-heading"><BookOpen/><span>Bài viết liên quan</span></div><div>{related.map(item=><Link to={`/blog/${item.id}`} key={item.id} className="related-card"><div className={`related-thumb bg-gradient-to-br ${item.gradient}`}>{item.image?<img src={item.image} alt="" loading="lazy"/>:<BookOpen/>}</div><div className="related-copy"><span>{item.category}</span><h3>{item.title}</h3><small><Clock/>{item.readTime}</small></div><ArrowUpRight className="related-arrow"/></Link>)}</div><Link className="all-posts-link" to="/blog">Xem tất cả bài viết <ArrowUpRight/></Link></aside>
      </div>
    </div>
  </div>
}

export default BlogDetailPage
