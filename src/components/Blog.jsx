import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Clock, ArrowRight, Search, X, SlidersHorizontal, Tag } from 'lucide-react'
import { blogPosts } from '../data/blogData'

const normalize = value => value.toLocaleLowerCase('vi').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
const shortCategory = value => ({ Kubernetes: 'K8S', 'CI/CD': 'CICD', IaC: 'IAC' }[value] || value.slice(0, 4).toUpperCase())

const Blog = () => {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState('')
  const [sort, setSort] = useState('newest')
  const tags = useMemo(() => [...new Set(blogPosts.flatMap(post => post.tags))], [])
  const filteredPosts = useMemo(() => {
    const keyword = normalize(query.trim())
    return blogPosts.filter(post => !activeTag || post.tags.includes(activeTag))
      .filter(post => !keyword || normalize([post.title, post.excerpt, post.category, ...post.tags].join(' ')).includes(keyword))
      .sort((a, b) => sort === 'oldest' ? new Date(a.date) - new Date(b.date) : sort === 'reading' ? parseInt(a.readTime) - parseInt(b.readTime) : new Date(b.date) - new Date(a.date))
  }, [query, activeTag, sort])
  const hasFilters = query || activeTag || sort !== 'newest'
  const reset = () => { setQuery(''); setActiveTag(''); setSort('newest') }

  return <section id="blog" className="blog-section">
    <div className="blog-shell">
      <header className="blog-heading"><h2>Blog &amp; Articles</h2><p>Chia sẻ kiến thức và kinh nghiệm về DevOps, Cloud Infrastructure và Automation.</p></header>

      <div className="blog-layout">
        <main className="blog-results">
          <div className="blog-topbar">
            <label className="topbar-search"><Search/><input value={query} onChange={event=>setQuery(event.target.value)} placeholder="Tìm bài viết..."/>{query&&<button onClick={()=>setQuery('')} aria-label="Xóa từ khóa"><X/></button>}</label>
            <label className="topbar-select tag-select"><Tag/><select value={activeTag} onChange={event=>setActiveTag(event.target.value)}><option value="">Tất cả tags</option>{tags.map(tag=><option key={tag} value={tag}>{tag}</option>)}</select></label>
            <label className="topbar-select sort-select"><SlidersHorizontal/><select value={sort} onChange={event=>setSort(event.target.value)}><option value="newest">Mới nhất</option><option value="oldest">Cũ nhất</option><option value="reading">Đọc nhanh</option></select></label>
          </div>
          <div className="results-meta"><p>Hiển thị <strong>{filteredPosts.length}</strong> / {blogPosts.length} bài viết</p><div>{activeTag&&<span>#{activeTag}<button onClick={()=>setActiveTag('')} aria-label="Bỏ lọc tag"><X/></button></span>}{hasFilters&&<button className="clear-filters" onClick={reset}>Đặt lại bộ lọc</button>}</div></div>

          {filteredPosts.length ? <div className="article-grid">{filteredPosts.map(post=><article className="article-card" key={post.id}>
            <Link to={`/blog/${post.id}`} className={`article-cover ${post.image?'has-image':''}`}>{post.image?<><img src={post.image} alt={`Ảnh minh họa: ${post.title}`} loading="lazy"/><div className="cover-image-shade"></div></>:<><div className={`cover-gradient bg-gradient-to-br ${post.gradient}`}></div><div className="cover-grid"></div><span className="cover-mark">{shortCategory(post.category)}</span></>}<span className="cover-type">Article</span><small>{post.category}</small></Link>
            <div className="article-body"><div className="article-category">{post.category}</div><h3><Link to={`/blog/${post.id}`}>{post.title}</Link></h3><p>{post.excerpt}</p><div className="article-tags">{post.tags.map(tag=><button key={tag} onClick={()=>{setActiveTag(tag);document.querySelector('#blog')?.scrollIntoView({behavior:'smooth'})}}>{tag}</button>)}</div><div className="article-footer"><div><span><Calendar/>{new Date(post.date).toLocaleDateString('vi-VN')}</span><span><Clock/>{post.readTime}</span></div><Link to={`/blog/${post.id}`} aria-label={`Đọc ${post.title}`}><ArrowRight/></Link></div></div>
          </article>)}</div> : <div className="blog-empty"><Search/><h3>Không tìm thấy bài viết</h3><p>Hãy thử một từ khóa hoặc bộ lọc khác.</p><button onClick={reset}>Xóa bộ lọc</button></div>}
        </main>
      </div>
    </div>
  </section>
}

export default Blog
