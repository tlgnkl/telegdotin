import { useEffect, useRef, useState, useCallback, createContext, useContext, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Link, useLocation } from 'react-router-dom'
import { caseNav } from './data'

export type SectionMeta = { id: string; label: string }

interface CaseLayoutProps {
  caseId: string
  sections: SectionMeta[]
  tldr: string[]
  accentColor: string
  accentBg: string
  children: ReactNode
}

export function CaseLayout({ caseId, sections, tldr, accentColor, children }: CaseLayoutProps) {
  const location = useLocation()
  const currentCase = caseNav.find(c => c.id === caseId)
  const currentIdx = caseNav.findIndex(c => c.id === caseId)
  const prevCase = currentIdx > 0 ? caseNav[currentIdx - 1] : null
  const nextCase = currentIdx < caseNav.length - 1 ? caseNav[currentIdx + 1] : null

  // Set page title and meta description from centralized data
  useEffect(() => {
    if (currentCase) {
      document.title = currentCase.metaTitle
      const metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) metaDesc.setAttribute('content', currentCase.metaDescription)
    }
    return () => { document.title = 'Николай Телегин — AI Product Manager' }
  }, [currentCase])

  // TOC active section
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? '')
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map())
  const registerSection = useCallback((id: string, el: HTMLElement | null) => {
    if (el) sectionRefs.current.set(id, el)
    else sectionRefs.current.delete(id)
  }, [])

  // Re-observe when route changes
  useEffect(() => {
    let observer: IntersectionObserver | null = null
    const timer = setTimeout(() => {
      const els = Array.from(sectionRefs.current.values())
      if (els.length === 0) return
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 })
      els.forEach(el => observer!.observe(el))
    }, 500)
    return () => { clearTimeout(timer); observer?.disconnect() }
  }, [location.pathname])

  // Scroll progress
  const { scrollYProgress } = useScroll()
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  // TL;DR expand (mobile)
  const [tldrExpanded, setTldrExpanded] = useState(false)

  const scrollTo = (id: string) => {
    const el = sectionRefs.current.get(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div key={caseId} style={{ background: '#fff', minHeight: '100vh', position: 'relative' }}>

      {/* ═══ Responsive ═══ */}
      <style>{`
        .case-toc { display: block; }
        .case-progress-bar { display: none; }
        .case-tabs-text { display: inline; }
        .case-content { padding: 72px 48px 60px; }
        .case-metrics-grid { grid-template-columns: repeat(4, 1fr); }
        .case-phones-grid { grid-template-columns: repeat(3, 1fr); }
        .case-slides-grid { grid-template-columns: repeat(2, 1fr); }
        .case-prevnext { flex-direction: row; }
        .case-framing { display: block; }
        .case-tldr-extra { display: block; }
        .case-tab { transition: all 0.25s cubic-bezier(0.25,0.1,0.25,1); }
        .case-tab:hover { transform: translateY(-1px); }
        @media (max-width: 1200px) {
          .case-toc { display: none !important; }
          .case-progress-bar { display: block !important; }
          .case-framing { display: none !important; }
        }
        @media (max-width: 900px) {
          .case-content { padding: 48px 28px 48px !important; }
          .case-metrics-grid { grid-template-columns: repeat(2, 1fr) !important; row-gap: 24px !important; }
          .case-slides-grid { grid-template-columns: 1fr !important; }
          .case-tabs-text { display: none !important; }
          .case-tab { padding: 10px 18px !important; min-height: 44px !important; }
        }
        @media (max-width: 900px) {
          /* Demo components overflow fix */
          .case-content table { font-size: 13px !important; }
          .case-content table td, .case-content table th { padding: 8px 10px !important; }
          .case-grid-3col { grid-template-columns: 1fr !important; }
          .case-grid-2col { grid-template-columns: 1fr !important; }
          .case-content h1 { font-size: 32px !important; }
        }
        @media (max-width: 640px) {
          .case-content { padding: 32px 16px 40px !important; }
          .case-content * { max-width: 100% !important; overflow-wrap: break-word; }
          .case-content img { max-width: 100% !important; height: auto !important; }
          .case-content table { display: block; overflow-x: auto; -webkit-overflow-scrolling: touch; }
          .case-phones-grid { grid-template-columns: 1fr !important; }
          .case-prevnext { flex-direction: column !important; }
          .case-tldr-extra { display: none !important; }
          .case-content h1 { font-size: 28px !important; }
          .case-content p { font-size: 17px !important; }
          .case-content ul { font-size: 16px !important; }
          .case-content div[style*="gap: 32"] { gap: 20px !important; }
          .case-content div[style*="gap: 48"] { gap: 24px !important; }
          .case-content div[style*="padding: 24px 28px"] { padding: 16px 16px !important; }
          .case-content div[style*="padding: 20px 24px"] { padding: 16px 14px !important; }
        }
      `}</style>

      {/* ═══ Visual framing ═══ */}
      <div aria-hidden="true" className="case-framing" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle, ${accentColor}08 0%, transparent 60%)` }} />
        <div style={{ position: 'absolute', bottom: '-15%', left: '-8%', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, ${accentColor}06 0%, transparent 60%)` }} />
        <div style={{ position: 'absolute', top: 80, bottom: 80, left: 'calc(50% - 420px - 24px)', width: 2, background: accentColor, opacity: 0.07, borderRadius: 1 }} />
      </div>

      {/* ═══ Sticky header ═══ */}
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderBottom: '1px solid var(--border)' }}>
        <motion.div className="case-progress-bar" style={{ position: 'absolute', top: 0, left: 0, height: 3, background: accentColor, width: progressWidth, borderRadius: '0 2px 2px 0' }} />

        <div style={{ maxWidth: 960, margin: '0 auto', padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Back button — prominent */}
          <Link to="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600, flexShrink: 0,
            padding: '6px 12px', borderRadius: 10, transition: 'all 0.2s',
            background: 'var(--surface-alt)', border: '1px solid var(--border)',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--border)'; e.currentTarget.style.color = 'var(--text)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--surface-alt)'; e.currentTarget.style.color = 'var(--text-secondary)' }}>
            ← <span className="case-tabs-text">Главная</span>
          </Link>

          {/* Tabs — with proper names and animations */}
          <div style={{ display: 'flex', gap: 6, flex: 1, justifyContent: 'center', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {caseNav.filter(c => c.hasPage).map(c => {
              const isActive = c.id === caseId
              return (
                <Link key={c.id} to={c.route} className="case-tab" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  padding: isActive ? '7px 16px' : '6px 14px',
                  borderRadius: 12, fontSize: 13, fontWeight: isActive ? 700 : 500,
                  textDecoration: 'none', whiteSpace: 'nowrap',
                  background: isActive ? accentColor : 'transparent',
                  color: isActive ? '#fff' : 'var(--text-muted)',
                  border: isActive ? `1px solid ${accentColor}` : '1px solid transparent',
                  boxShadow: isActive ? `0 2px 8px ${accentColor}33` : 'none',
                }}>
                  <span style={{ fontSize: 15 }}>{c.emoji}</span>
                  <span className="case-tabs-text">{c.shortTitle}</span>
                </Link>
              )
            })}
          </div>

          {/* Reading time — real per-case */}
          <span className="case-tabs-text" style={{ fontSize: 12, color: 'var(--text-muted)', flexShrink: 0, opacity: 0.7 }}>
            ~{currentCase?.readingTime ?? 3} мин
          </span>
        </div>
      </div>

      {/* ═══ TOC Sidebar ═══ */}
      <nav className="case-toc" style={{
        position: 'fixed', left: 'calc(50% - 420px - 180px)', top: '50%', transform: 'translateY(-50%)',
        zIndex: 40, width: 150,
      }}>
        <div style={{ position: 'relative', paddingLeft: 16 }}>
          {/* Track line */}
          <div style={{ position: 'absolute', left: 5, top: 4, bottom: 4, width: 2, background: 'var(--border)', borderRadius: 1 }} />
          {/* Progress fill */}
          <div style={{
            position: 'absolute', left: 5, top: 4, width: 2, borderRadius: 1,
            background: accentColor, transition: 'height 0.4s cubic-bezier(0.25,0.1,0.25,1)',
            height: `${Math.max(((sections.findIndex(s => s.id === activeSection) + 1) / sections.length) * 100, 5)}%`,
          }} />

          {sections.map((sec) => {
            const isActive = sec.id === activeSection
            return (
              <button key={sec.id} onClick={() => scrollTo(sec.id)} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '7px 0', border: 'none',
                background: 'none', cursor: 'pointer', width: '100%', textAlign: 'left',
              }}>
                <div style={{
                  width: isActive ? 10 : 6, height: isActive ? 10 : 6,
                  borderRadius: '50%', flexShrink: 0,
                  background: isActive ? accentColor : 'var(--border)',
                  boxShadow: isActive ? `0 0 8px ${accentColor}44` : 'none',
                  transition: 'all 0.3s', marginLeft: isActive ? -14 : -11,
                }} />
                <span style={{
                  fontSize: 12, fontWeight: isActive ? 700 : 400,
                  color: isActive ? accentColor : 'var(--text-muted)',
                  transition: 'all 0.3s', lineHeight: 1.3,
                  opacity: isActive ? 1 : 0.7,
                }}>{sec.label}</span>
              </button>
            )
          })}
        </div>
      </nav>

      {/* ═══ Main content ═══ */}
      <div className="case-content" style={{ maxWidth: 840, margin: '0 auto', position: 'relative', zIndex: 2 }}>

        {/* TL;DR */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
          style={{
            background: 'var(--surface-alt)', borderRadius: 18, padding: '28px 32px',
            marginTop: 48, marginBottom: 56, position: 'relative' as const, overflow: 'hidden',
          }}>
          <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: accentColor, borderRadius: '18px 18px 0 0' }} />
          <div style={{ fontFamily: 'var(--font-hand)', fontSize: 28, color: accentColor, marginBottom: 16 }}>за 10 секунд</div>
          {tldr.map((item, i) => {
            const isExtra = i >= 2
            return (
              <div key={i} className={isExtra && !tldrExpanded ? 'case-tldr-extra' : ''} style={{
                display: 'flex', gap: 12, marginBottom: 8, fontSize: 16,
                color: 'var(--text-body)', lineHeight: 1.55,
              }}>
                <span style={{ color: accentColor, fontWeight: 700, flexShrink: 0 }}>→</span>
                <span>{item}</span>
              </div>
            )
          })}
          {tldr.length > 2 && (
            <button onClick={() => setTldrExpanded(!tldrExpanded)} className="case-tldr-toggle" style={{
              display: 'none', marginTop: 8, background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 14, color: accentColor, fontWeight: 600, padding: 0,
            }}>{tldrExpanded ? 'свернуть' : `ещё ${tldr.length - 2}`}</button>
          )}
          <style>{`@media (max-width: 640px) { .case-tldr-toggle { display: inline-block !important; } }`}</style>
        </motion.div>

        {/* Section registration */}
        <CaseSectionsContext.Provider value={registerSection}>
          {children}
        </CaseSectionsContext.Provider>

        {/* ═══ Prev/Next ═══ */}
        <div className="case-prevnext" style={{ display: 'flex', gap: 16, marginTop: 80 }}>
          {prevCase ? (
            <Link to={prevCase.route} style={{
              flex: 1, display: 'flex', flexDirection: 'column', gap: 8,
              padding: '24px 28px', borderRadius: 18, border: '1px solid var(--border)',
              textDecoration: 'none', transition: 'all 0.3s',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>← Предыдущий</span>
              <span style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)' }}>{prevCase.emoji} {prevCase.shortTitle}</span>
            </Link>
          ) : <div style={{ flex: 1 }} />}

          {nextCase && nextCase.hasPage ? (
            <Link to={nextCase.route} style={{
              flex: 1, display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'right',
              padding: '24px 28px', borderRadius: 18, textDecoration: 'none',
              transition: 'all 0.3s',
              background: nextCase.accentBg, border: `1px solid ${nextCase.accentColor}22`,
              boxShadow: `0 2px 12px ${nextCase.accentColor}11`,
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 8px 28px ${nextCase.accentColor}22` }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 2px 12px ${nextCase.accentColor}11` }}>
              <span style={{ fontSize: 12, color: nextCase.accentColor, fontWeight: 600 }}>Следующий →</span>
              <span style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)' }}>{nextCase.emoji} {nextCase.shortTitle}</span>
            </Link>
          ) : (
            <Link to="/" style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '24px 28px', borderRadius: 18, border: '1px solid var(--border)',
              textDecoration: 'none', color: 'var(--text-secondary)', fontWeight: 600, fontSize: 15,
              transition: 'all 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}>
              Все кейсы →
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

/* ═══ Section context ═══ */
const CaseSectionsContext = createContext<(id: string, el: HTMLElement | null) => void>(() => {})

export function CaseSection({ id, label, accentColor, children }: { id: string; label: string; accentColor: string; children: ReactNode }) {
  const register = useContext(CaseSectionsContext)
  return (
    <div id={id} ref={el => register(id, el)} style={{ borderTop: '1px solid var(--border)', marginTop: 64, paddingTop: 48, scrollMarginTop: 70 }}>
      <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: 2.5, color: accentColor, marginBottom: 28 }}>{label}</div>
      {children}
    </div>
  )
}
