import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import { Analytics } from '@vercel/analytics/react'
import App from './App'
import './global.css'

const AiCasePage = lazy(() => import('./cases/ai').then(m => ({ default: m.AiCasePage })))
const MobileCasePage = lazy(() => import('./cases/mobile').then(m => ({ default: m.MobileCasePage })))
const HrtechCasePage = lazy(() => import('./cases/hrtech').then(m => ({ default: m.HrtechCasePage })))
const ElektroCasePage = lazy(() => import('./cases/elektro').then(m => ({ default: m.ElektroCasePage })))

const PageLoader = () => <div style={{ minHeight: '100vh' }} />

const caseLinks = [
  { title: 'AI-ассистент', route: '/cases/ai', color: '#4F9CF5' },
  { title: 'Штрафы ПДД', route: '/cases/mobile', color: '#FF8C42' },
  { title: 'AI-скоринг', route: '/cases/hrtech', color: '#2DD4A8' },
  { title: 'CV-энергетика', route: '/cases/elektro', color: '#F5A623' },
]

function NotFound() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: 48,
      fontFamily: 'var(--font)',
    }}>
      <div style={{ fontFamily: 'var(--font-hand)', fontSize: 72, color: 'var(--green)', marginBottom: 16 }}>404</div>
      <p style={{ fontSize: 20, color: 'var(--text-body)', marginBottom: 32 }}>Такой страницы нет</p>
      <Link to="/" style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '12px 28px', background: 'var(--green)', color: '#1a1a1a',
        borderRadius: 14, fontSize: 15, fontWeight: 700, textDecoration: 'none',
      }}>← На главную</Link>
      <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', textAlign: 'center' }}>или посмотрите кейсы</p>
        {caseLinks.map(c => (
          <Link key={c.route} to={c.route} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 16, color: 'var(--text-body)', textDecoration: 'none' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: c.color, flexShrink: 0 }} />
            {c.title}
          </Link>
        ))}
      </div>
    </div>
  )
}

/* Force remount on route change — fixes Firefox Motion animation cache bug */
function AnimatedRoutes() {
  const location = useLocation()
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<App />} />
      <Route path="/cases/ai" element={<Suspense fallback={<PageLoader />}><AiCasePage /></Suspense>} />
      <Route path="/cases/mobile" element={<Suspense fallback={<PageLoader />}><MobileCasePage /></Suspense>} />
      <Route path="/cases/hrtech" element={<Suspense fallback={<PageLoader />}><HrtechCasePage /></Suspense>} />
      <Route path="/cases/elektro" element={<Suspense fallback={<PageLoader />}><ElektroCasePage /></Suspense>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </MotionConfig>
    <Analytics />
  </StrictMode>
)
