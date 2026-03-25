import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useScroll, useMotionValueEvent, useInView } from 'motion/react'
import { Link, useNavigate } from 'react-router-dom'

/* ═══════ COLORS ═══════ */
const C = {
  blue:   { bg: '#eef5ff', icon: '#4F9CF5', badge: '#ddeaff', text: '#2d6bc4' },
  orange: { bg: '#fff3ea', icon: '#FF8C42', badge: '#ffe5d2', text: '#b8611e' },
  purple: { bg: '#f1ecff', icon: '#9F7AEA', badge: '#e4daff', text: '#6d49b8' },
  teal:   { bg: '#e6faf5', icon: '#2DD4A8', badge: '#ccf5ea', text: '#1a8a6e' },
  coral:  { bg: '#fff0ee', icon: '#E05252', badge: '#ffddd8', text: '#b33a3a' },
  amber:  { bg: '#fff8eb', icon: '#F5A623', badge: '#ffecc4', text: '#b07515' },
}
const ease = [0.25, 0.1, 0.25, 1] as const
const canHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches
function hoverProps(
  enter: (e: React.MouseEvent<HTMLElement>) => void,
  leave: (e: React.MouseEvent<HTMLElement>) => void
) {
  if (!canHover) return {}
  return { onMouseEnter: enter, onMouseLeave: leave }
}

/* ═══════ ANIM ═══════ */
function FadeUp({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.9, ease, delay }}>{children}</motion.div>
}
function AnimN({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null), inView = useInView(ref, { once: true }), [d, setD] = useState(0)
  useEffect(() => {
    if (!inView) return
    let rafId: number
    const st = performance.now()
    function t(n: number) {
      const p = Math.min((n - st) / 1400, 1)
      setD(Math.round((1 - Math.pow(1 - p, 4)) * value))
      if (p < 1) rafId = requestAnimationFrame(t)
    }
    rafId = requestAnimationFrame(t)
    return () => cancelAnimationFrame(rafId)
  }, [inView, value])
  return <span ref={ref}>{d}</span>
}
/* Handwritten section header */
function SectionHead({ gray, green }: { gray: string; green: string }) {
  return (
    <div className="section-head" style={{ textAlign: 'center', marginBottom: 72 }}>
      <div style={{ fontSize: 22, color: 'var(--text-secondary)', fontWeight: 400 }}>{gray}</div>
      <div style={{ fontFamily: 'var(--font-hand)', fontSize: 52, color: 'var(--green)', fontWeight: 600, lineHeight: 1.1, marginTop: 4 }}>{green}</div>
    </div>
  )
}

/* ═══════ ICONS ═══════ */
const I = {
  mic: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>,
  phone: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><line x1="12" x2="12.01" y1="18" y2="18"/></svg>,
  bulb: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>,
  arrow: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>,
  tg: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>,
  gh: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>,
  dl: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>,
  sparkle: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"/><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z"/></svg>,
  scan: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>,
  zap: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
}

/* ═══════ CASE DATA ═══════ */
type CaseData = {
  id: string
  icon: ReactNode
  color: typeof C.blue
  title: string
  subtitle: string
  shortDesc: string
  metrics: string[]
  problem: string
  context: string
  actions: string[]
  proof?: { num: string; label: string }[]
  results?: { value: string; label: string }[]
}

const cases: CaseData[] = [
  {
    id: 'ai', icon: I.mic, color: C.blue,
    title: 'AI-ассистент для водителей',
    subtitle: 'Рэй · ray.app · US-рынок',
    shortDesc: 'Запустил AI-направление с нуля. Снизил латентность ×7, довёл точность до 92%.',
    metrics: ['Латентность 11с → 1.5с', 'Точность 92%', 'Релиз 4× быстрее', 'Расходы −40%'],
    problem: 'Компания решила запустить AI-направление для US-рынка. Направления не было. Команды не было. Продукта не было.',
    context: 'Компания решила запустить AI-направление для US-рынка — голосовой ассистент, с которым водители могут разговаривать за рулём. Направления не было. Команды не было. Продукта не было.',
    actions: [
      'Выстроил продукт с командой из 7 человек',
      'Снял ключевой блокер: задержка ответа 11с → 1.5с',
      'Внедрил систему контекста и базу знаний → точность 92%',
      'Автоматизировал оценку качества → релизный цикл 2 нед → 3 дня',
      'Оптимизировал AI-инфраструктуру → расходы −40%',
      'Провёл сегментацию US-рынка, скорректировал стратегию по данным',
    ],
    results: [
      { value: '1.5с', label: 'латентность (было 11с)' },
      { value: '92%', label: 'точность ответов' },
      { value: '4×', label: 'быстрее релизы' },
      { value: '−40%', label: 'расходы на AI' },
    ],
  },
  {
    id: 'mobile', icon: I.phone, color: C.orange,
    title: 'Мобильный продукт, 700k MAU',
    subtitle: 'Рэй · Штрафы ГИБДД',
    shortDesc: 'Переработал платёжный флоу, построил аналитику с нуля, запустил персонализированные Stories.',
    metrics: ['Конверсия +18%', 'NPS +17 п.п.', 'Retention 7d +12%'],
    problem: 'Зрелый продукт в высококонкурентной нише — нужен рост метрик без крупных фичей.',
    context: 'Мобильное приложение для проверки и оплаты штрафов ГИБДД, 700k MAU. Зрелый продукт в высококонкурентной нише.',
    actions: [
      'Увеличил конверсию в оплату на 18% — переработал платёжный флоу',
      'Поднял NPS на 17 п.п. через редизайн на основе глубинных интервью',
      'Повысил Retention 7d на 12% — Stories с персонализированными напоминаниями',
      'Выстроил пуш-коммуникации: Opt-in 78%, Open rate 61%',
      'Построил продуктовую аналитику с нуля',
    ],
    proof: [{ num: '+18%', label: 'конверсия' }, { num: '+17', label: 'NPS, п.п.' }, { num: '+12%', label: 'retention 7d' }],
    results: [
      { value: '+18%', label: 'конверсия' },
      { value: '+17 п.п.', label: 'NPS' },
      { value: '+12%', label: 'retention 7d' },
    ],
  },
  {
    id: 'hrtech', icon: I.sparkle, color: C.teal,
    title: 'AI-скоринг кандидатов',
    subtitle: 'HR-платформа (NDA) · от идеи до прода',
    shortDesc: 'Данные вместо интуиции в подборе людей. Построил систему, где каждый балл привязан к цитате из резюме — рекрутер видит аргумент, а не число.',
    metrics: ['Time-to-shortlist −40%', 'Screen→interview +15%', '15k+ кандидатов'],
    problem: '4 из 5 рекрутеров назвали субъективность оценки главной болью — к вечеру одно и то же резюме получает разную оценку.',
    context: 'Одно и то же резюме утром получает "подходит", вечером — "не уверен". Построил систему, где скор привязан к тексту резюме — рекрутер может оспорить каждый пункт.',
    actions: [
      'Провёл discovery: 5 интервью с рекрутерами, анализ конкурентов',
      'Определил продуктовые принципы: evidence-based скоринг, запрет culture_fit',
      'Спроектировал и реализовал систему (Python, FastAPI, LangGraph, Gemini 3.1 Pro)',
      'Каждая оценка подкреплена цитатой из резюме кандидата',
      'В проде на 100+ вакансиях, 15 000+ кандидатов прошли через скоринг',
    ],
    proof: [{ num: '−40%', label: 'time-to-shortlist' }, { num: '+15%', label: 'screen→interview' }, { num: '15k+', label: 'кандидатов' }],
    results: [
      { value: '−40%', label: 'time-to-shortlist' },
      { value: '+15%', label: 'screen→interview' },
      { value: '15k+', label: 'кандидатов в проде' },
    ],
  },
  {
    id: 'elektro', icon: I.zap, color: C.amber,
    title: 'AI-распознавание электрощитов',
    subtitle: 'Электролаборатория (NDA)',
    shortDesc: 'Computer vision в физическом мире. Фото щита → предзаполненный протокол по ГОСТ. Инженер проверяет 3 поля из 28, а не вводит все.',
    metrics: ['~3× быстрее', 'F1 70%', '$6/объект'],
    problem: 'Инженеры фотографируют 50–100 секций щитов на объекте. 1500+ строк данных вносятся вручную — 80 часов на объект.',
    context: 'Электролаборатория проводит диагностику щитов на крупных объектах. AI предзаполняет ~70% данных, инженер проверяет и корректирует остальное. ~25 часов вместо 80.',
    actions: [
      'Изучил процесс заказчика, приоритизировал поля по ценности для протокола',
      'Спроектировал формат: предзаполненная таблица с подсветкой неуверенных полей',
      'Реализовал мультиагентный pipeline (Python, LangGraph, Gemini)',
      'Рассчитал экономику: ~25ч вместо 80, $6/объект на inference',
    ],
    proof: [{ num: '3×', label: 'быстрее' }, { num: '$6', label: 'за объект' }, { num: '70%', label: 'F1-score' }],
    results: [
      { value: '~3×', label: 'быстрее' },
      { value: '$6', label: 'за объект' },
      { value: '70%', label: 'F1-score' },
    ],
  },
]

/* ═══════════════ 1. HERO ═══════════════ */
function Hero() {
  return (
    <section className="hero-section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '140px 48px 80px', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{ position: 'absolute', top: '-10%', right: '0%', width: 800, height: 800, borderRadius: '50%', background: 'radial-gradient(circle, rgba(122,239,140,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 80, flexWrap: 'wrap', position: 'relative' }}>
        <div style={{ flex: 1, minWidth: 340 }}>
          {/* Status bar */}
          <motion.div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2, ease }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, color: 'var(--text-secondary)' }}>
              <span style={{ width: 9, height: 9, background: 'var(--green)', borderRadius: '50%', animation: 'pulse-dot 2.5s ease-in-out infinite' }} />
              сейчас в <a href="https://lofty.today/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text)', fontWeight: 700, textDecoration: 'none', marginLeft: 2 }}>Lofty</a>
            </div>
            <a href="/nikolai-telegin-cv.pdf" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 20px', background: 'var(--green)', color: '#1a1a1a', borderRadius: 30, fontSize: 14, fontWeight: 700, textDecoration: 'none', transition: 'all 0.3s', boxShadow: '0 3px 12px rgba(122,239,140,0.25)' }}
              {...hoverProps(
                e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(122,239,140,0.35)' },
                e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 3px 12px rgba(122,239,140,0.25)' }
              )}>
              pdf CV
            </a>
          </motion.div>

          {/* Main text — large, readable, like editorial */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.35, ease }}>
            <p style={{ fontSize: 32, lineHeight: 1.45, color: 'var(--text-body)', fontWeight: 400 }}>
              Последний год строю <strong style={{ color: 'var(--text)', fontWeight: 700 }}>голосовой AI-ассистент</strong> для водителей на US-рынок — снизил задержку ответа с 11 секунд до 1.5.
              До этого — мобильный продукт на <strong style={{ color: 'var(--text)', fontWeight: 700 }}>700k MAU</strong>, где переработка платёжного флоу дала +18% конверсии.
            </p>
          </motion.div>

          {/* Name + role — below the main text */}
          <motion.div style={{ marginTop: 48, display: 'flex', alignItems: 'flex-end', gap: 20, flexWrap: 'wrap' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7, ease }}>
            <div>
              <div style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 500, marginBottom: 4 }}>Николай Телегин</div>
              <div style={{ fontFamily: 'var(--font-hand)', fontSize: 48, color: 'var(--green)', fontWeight: 600, lineHeight: 1 }}>AI Product Manager</div>
            </div>
          </motion.div>

          <motion.div style={{ display: 'flex', gap: 12, marginTop: 36 }}
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.95, ease }}>
            <a href="https://t.me/tlgnkl" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', background: '#fff', color: 'var(--text)', borderRadius: 14, fontSize: 15, fontWeight: 600, textDecoration: 'none', border: '1px solid var(--border)', transition: 'all 0.3s', boxShadow: 'var(--shadow-float)' }}
              {...hoverProps(
                e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-hover)' },
                e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-float)' }
              )}>
              {I.tg} Обсудить задачу
            </a>
          </motion.div>
        </div>

        {/* Photo */}
        <motion.div style={{ flexShrink: 0 }} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4, ease }}>
          <div style={{ width: 300, height: 370, borderRadius: 28, overflow: 'hidden', background: '#f5f5f3', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-hover)', animation: 'gentle-float 8s ease-in-out infinite', border: '1px solid var(--border)' }}>
            <img src="/photo.jpg" alt="Николай Телегин" width={300} height={370} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════ 1.5 ABOUT ═══════════════ */
function About() {
  return (
    <section className="about-section" style={{ padding: '40px 48px 0', maxWidth: 1100, margin: '0 auto' }}>
      <FadeUp>
        <div style={{ maxWidth: 720 }}>
          <div style={{ fontFamily: 'var(--font-hand)', fontSize: 36, color: 'var(--green)', marginBottom: 24 }}>обо мне</div>
          <p style={{ fontSize: 24, lineHeight: 1.65, color: 'var(--text-body)', fontWeight: 400 }}>
            Полтора года — мобильное приложение на 700k MAU: воронки, retention, команда из восьми. Потом перешёл в AI: голосовой ассистент для водителей, скоринг резюме для HR-платформы, распознавание электрощитов для лаборатории.
          </p>
          <p style={{ fontSize: 22, lineHeight: 1.65, color: 'var(--text-secondary)', marginTop: 20 }}>
            Самое дорогое, чему научился — вовремя остановиться. Программу лояльности закрыли через 3 месяца, потому что данные сказали "нет". AI-ассистент не нашёл PMF, но научил больше, чем если бы нашёл.
          </p>
        </div>
      </FadeUp>
    </section>
  )
}

/* ═══════════════ 2. PROOF STRIP — inline, no background, no cards ═══════════════ */
function ProofStrip() {
  return (
    <section className="proof-strip" style={{ padding: '0 48px', maxWidth: 1100, margin: '0 auto' }}>
      <FadeUp>
        <div className="grid-4" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
          borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
          padding: '52px 0',
        }}>
          {[
            { value: <><span style={{ color: 'var(--text-muted)', fontWeight: 400, textDecoration: 'line-through', textDecorationColor: '#ddd' }}>11с</span> → <AnimN value={1} />.5с</>, label: 'латентность ответа', source: 'AI-ассистент', color: C.blue.icon },
            { value: <>+<AnimN value={18} />%</>, label: 'конверсия в оплату', source: 'Штрафы ПДД', color: C.orange.icon },
            { value: <>−<AnimN value={40} />%</>, label: 'time-to-shortlist', source: 'HR-скоринг', color: C.teal.icon },
            { value: <>~<AnimN value={3} />×</>, label: 'быстрее (расчётно)', source: 'Электрощиты · прототип', color: C.amber.icon },
          ].map((p, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '0 16px', borderLeft: i > 0 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: p.color, letterSpacing: '-0.02em', lineHeight: 1.2 }}>{p.value}</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 8 }}>{p.label}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{p.source}</div>
            </div>
          ))}
        </div>
      </FadeUp>
    </section>
  )
}

/* ═══════════════ 3. CASES ═══════════════ */
function BeforeAfter({ before, after, unit, color }: { before: number; after: number; unit: string; color: string }) {
  const ref = useRef<HTMLDivElement>(null), inView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    let rafId: number
    const st = performance.now()
    function tick(n: number) {
      const p = Math.min((n - st) / 1800, 1)
      setVal(Math.round((1 - Math.pow(1 - p, 4)) * after * 10) / 10)
      if (p < 1) rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [inView, after])
  return (
    <div ref={ref} style={{ display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap' }}>
      <span style={{ fontSize: 44, fontWeight: 800, color: 'var(--text-muted)', textDecoration: 'line-through', textDecorationColor: color, opacity: 0.45, letterSpacing: '-0.02em' }}>{before}{unit}</span>
      <span style={{ fontSize: 28, color, fontWeight: 300 }}>→</span>
      <span style={{ fontSize: 56, fontWeight: 800, color, letterSpacing: '-0.03em' }}>{val.toFixed(1)}{unit}</span>
    </div>
  )
}

function CaseRow({ data, onClick, delay }: { data: CaseData; onClick: () => void; delay: number }) {
  const c = data.color
  return (
    <FadeUp delay={delay}>
      <div className="case-row" onClick={onClick} style={{ background: '#fff', borderRadius: 22, padding: '36px 40px', cursor: 'pointer', position: 'relative' as const, overflow: 'hidden', border: '1px solid var(--border)', boxShadow: 'var(--shadow-float)', transition: 'all 0.35s cubic-bezier(0.25,0.1,0.25,1)' }}
        {...hoverProps(
          e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = 'var(--shadow-hover)' },
          e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-float)' }
        )}>

        {/* Watermark icon — large, faint, instant visual identity */}
        <div style={{ position: 'absolute' as const, right: -8, top: '50%', transform: 'translateY(-50%) scale(5.5)', color: c.icon, opacity: 0.06, pointerEvents: 'none', userSelect: 'none' }}>
          {data.icon}
        </div>

        {/* 1. Title — the anchor */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, position: 'relative' as const }}>
          <div style={{ width: 48, height: 48, background: c.bg, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.icon, flexShrink: 0 }}>{data.icon}</div>
          <div>
            <h3 style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em' }}>{data.title}</h3>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 3 }}>{data.subtitle}</p>
          </div>
        </div>

        {/* 2. The substance — what you did */}
        <p style={{ fontSize: 18, color: 'var(--text-body)', lineHeight: 1.7, maxWidth: 680, marginBottom: 16, position: 'relative' as const }}>{data.shortDesc}</p>

        {/* 3. Proof footnote + link */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, position: 'relative' as const }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>{data.metrics.join(' · ')}</span>
            {(data.id === 'hrtech' || data.id === 'elektro') && (
              <span style={{ fontSize: 12, fontWeight: 600, color: c.icon, background: c.bg, padding: '3px 10px', borderRadius: 8, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                ▶ интерактивно
              </span>
            )}
            {data.id === 'hrtech' && (
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', background: '#f7f7f5', padding: '3px 10px', borderRadius: 8 }}>
                NDA
              </span>
            )}
            {data.id === 'elektro' && (
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', background: '#f7f7f5', padding: '3px 10px', borderRadius: 8 }}>
                заказчик
              </span>
            )}
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: c.icon, display: 'inline-flex', alignItems: 'center', gap: 6 }}>подробнее {I.arrow}</span>
        </div>
      </div>
    </FadeUp>
  )
}

function Cases() {
  const navigate = useNavigate()
  return (
    <section className="cases-section" style={{ padding: '80px 48px 80px', maxWidth: 1196, margin: '0 auto' }}>
      <FadeUp><SectionHead gray="Кейсы" green="продукты" /></FadeUp>

      {/* ═══ Main case — hero card ═══ */}
      <FadeUp delay={0.1}>
        <div className="hero-case" style={{ background: C.blue.bg, borderRadius: 28, padding: '48px 52px', position: 'relative' as const, overflow: 'hidden', marginBottom: 20 }}>
          {/* gradient top bar */}
          <div style={{ position: 'absolute' as const, top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${C.blue.icon}, #7ac0ff, ${C.blue.icon})`, borderRadius: '28px 28px 0 0' }} />

          {/* header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
            <div style={{ width: 52, height: 52, background: '#fff', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.blue.icon }}>{I.mic}</div>
            <div>
              <div style={{ color: C.blue.icon, fontSize: 13, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: 2 }}>Главный кейс</div>
              <h3 style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em', marginTop: 4 }}>{cases[0].title}</h3>
            </div>
          </div>

          {/* two columns: before/after + metrics */}
          <div className="grid-case" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
            <div>
              <BeforeAfter before={11} after={1.5} unit="с" color={C.blue.icon} />
              <div style={{ fontSize: 13, color: 'var(--text-muted)', textTransform: 'uppercase' as const, letterSpacing: 1, marginTop: 8, marginBottom: 28 }}>Латентность ответа</div>
              <p style={{ fontSize: 18, color: 'var(--text-body)', lineHeight: 1.7 }}>{cases[0].context}</p>
            </div>
            <div>
              {cases[0].metrics.slice(1).map((m, i) => {
                const match = m.match(/^(.*?)(\d+)(.*?)$/)
                return (
                  <motion.div key={m} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.6, ease, delay: 0.3 + i * 0.15 }}
                    style={{ padding: '14px 0', borderBottom: i < cases[0].metrics.length - 2 ? '1px solid rgba(79,156,245,0.12)' : 'none' }}>
                    <div style={{ fontSize: 32, fontWeight: 800, color: C.blue.icon, letterSpacing: '-0.02em', lineHeight: 1 }}>
                      {match ? <>{match[1]}<AnimN value={parseInt(match[2])} />{match[3]}</> : m}
                    </div>
                  </motion.div>
                )
              })}
              <Link to="/cases/ai" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', background: C.blue.icon, color: '#fff', borderRadius: 14, fontSize: 16, fontWeight: 700, textDecoration: 'none', transition: 'all 0.3s', marginTop: 28 }}
                {...hoverProps(
                  e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(79,156,245,0.3)' },
                  e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }
                )}>
                Подробнее {I.arrow}
              </Link>
            </div>
          </div>
        </div>
      </FadeUp>

      {/* ═══ Secondary cases — full-width rows with colored bg ═══ */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {cases.slice(1).map((c, i) => (
          <CaseRow key={c.id} data={c} onClick={() => navigate(`/cases/${c.id}`)} delay={0.15 + i * 0.12} />
        ))}
      </div>
    </section>
  )
}


/* ═══════════════ 4. CAREER ═══════════════ */

function CareerPath() {
  const steps = [
    { year: '2022', company: 'Свои проекты', role: 'Founder / Product Lead', desc: 'Чат-боты, GameDev, 50k+ MAU', color: C.purple },
    { year: '2023', company: 'Рэй', role: 'Product Manager', desc: 'Мобильное приложение, 700k MAU', color: C.orange },
    { year: '2025', company: 'Рэй', role: 'AI PM / Technical Lead', desc: 'AI-ассистент, US-рынок', color: C.blue },
    { year: '2026', company: 'Lofty', role: 'AI Product Engineer', desc: 'Идея → продукт → первая продажа за 2 недели', color: C.teal, current: true },
  ]

  return (
    <section className="career-section" style={{ padding: '80px 48px', overflow: 'hidden' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <FadeUp><SectionHead gray="Карьера" green="путь роста" /></FadeUp>

        <div style={{ position: 'relative', maxWidth: 640 }}>
          {/* Gradient timeline line — draws on scroll */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.4, ease }}
            style={{
              position: 'absolute',
              left: 27,
              top: 16, bottom: 16,
              width: 2,
              background: `linear-gradient(to bottom, ${C.orange.icon}, var(--green))`,
              borderRadius: 1,
              transformOrigin: 'top',
            }}
          />

          {steps.map((step, i) => {
            const isLast = i === steps.length - 1
            const scale = 1 + i * 0.18
            const dotSize = step.current ? 16 : 10

            return (
              <FadeUp key={i} delay={0.3 + i * 0.25}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 32,
                  paddingBottom: isLast ? 0 : 56,
                  position: 'relative',
                }}>
                  {/* Dot column */}
                  <div style={{
                    width: 56, flexShrink: 0,
                    display: 'flex', justifyContent: 'center',
                    paddingTop: 6,
                  }}>
                    <div style={{
                      width: dotSize, height: dotSize,
                      borderRadius: '50%',
                      background: step.current ? 'var(--green)' : step.color.icon,
                      border: '3px solid #fff',
                      zIndex: 2,
                      ...(step.current ? {
                        boxShadow: '0 0 0 4px rgba(122,239,140,0.2)',
                        animation: 'pulse-dot 2.5s ease-in-out infinite',
                      } : {}),
                    }} />
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, position: 'relative' }}>
                    {/* Watermark year */}
                    <div aria-hidden="true" className="career-watermark" style={{
                      position: 'absolute',
                      right: -20,
                      top: '50%',
                      transform: 'translateY(-55%)',
                      fontFamily: 'var(--font-hand)',
                      fontSize: 120 + i * 40,
                      fontWeight: 700,
                      color: step.current ? 'var(--green)' : step.color.icon,
                      opacity: step.current ? 0.08 : 0.05,
                      lineHeight: 1,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    }}>
                      {step.year}
                    </div>

                    <div style={{
                      fontSize: Math.round(14 * scale),
                      fontWeight: 600,
                      color: step.color.icon,
                      marginBottom: 4,
                      letterSpacing: 1,
                    }}>{step.year}</div>

                    <div style={{
                      fontSize: Math.round(26 * scale),
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      color: 'var(--text)',
                      lineHeight: 1.2,
                      marginBottom: 4,
                    }}>{step.company}</div>

                    <div style={{
                      fontSize: Math.round(16 * scale),
                      color: step.current ? step.color.icon : 'var(--text-secondary)',
                      fontWeight: step.current ? 600 : 500,
                      marginBottom: 6,
                    }}>{step.role}</div>

                    <div style={{
                      fontSize: 15,
                      color: 'var(--text-muted)',
                      lineHeight: 1.5,
                    }}>{step.desc}</div>

                    {step.current && (
                      <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        marginTop: 12, fontSize: 13, fontWeight: 600,
                        color: 'var(--green-deep)',
                        background: 'rgba(122,239,140,0.12)',
                        padding: '5px 16px', borderRadius: 10,
                      }}>
                        <span style={{
                          width: 7, height: 7, background: 'var(--green)',
                          borderRadius: '50%', animation: 'pulse-dot 2s ease-in-out infinite',
                        }} />
                        сейчас
                      </div>
                    )}
                  </div>
                </div>
              </FadeUp>
            )
          })}
        </div>

        <FadeUp delay={0.8}>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', textAlign: 'center', marginTop: 56 }}>
            МИСИС · Информатика и компьютерных наук, IoT · 2026
          </p>
        </FadeUp>

      </div>
    </section>
  )
}

/* ═══════════════ 5. CTA (what I look for + contact) ═══════════════ */
function Cta({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  return (
    <section ref={sectionRef} className="cta-section" style={{ background: 'var(--green)', padding: '140px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 40% 30%, rgba(255,255,255,0.15) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <FadeUp>
        <p style={{ fontSize: 24, lineHeight: 1.6, color: 'rgba(255,255,255,0.75)', maxWidth: 540, margin: '0 auto 12px', position: 'relative', fontWeight: 400 }}>
          Делаю продукты с <strong style={{ color: '#fff', fontWeight: 700 }}>AI</strong> — от идеи до первой продажи.
          Если есть задача — <strong style={{ color: '#fff', fontWeight: 700 }}>напишите</strong>
        </p>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', position: 'relative', marginBottom: 48, fontWeight: 500 }}>
          Проекты · Консультации · Сотрудничество
        </p>
      </FadeUp>

      <FadeUp delay={0.1}>
        <div style={{ fontFamily: 'var(--font-hand)', fontSize: 56, color: '#fff', fontWeight: 600, position: 'relative', marginBottom: 44 }}>давайте обсудим</div>
      </FadeUp>

      <FadeUp delay={0.2}>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
          <a href="https://t.me/tlgnkl" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 40px', background: '#fff', color: '#1a1a1a', borderRadius: 16, fontSize: 17, fontWeight: 700, textDecoration: 'none', transition: 'all 0.3s', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
            {...hoverProps(
              e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)' },
              e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)' }
            )}>
            {I.tg} Telegram
          </a>
          {[{ href: 'mailto:boyinv@yandex.ru', label: 'Email' }, { href: '/nikolai-telegin-cv.pdf', label: 'PDF резюме', icon: I.dl }].map((b, i) => (
            <a key={i} href={b.href} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 40px', background: 'rgba(255,255,255,0.22)', color: '#fff', borderRadius: 16, fontSize: 17, fontWeight: 600, textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.35)', transition: 'all 0.3s', backdropFilter: 'blur(8px)' }}
              {...hoverProps(
                e => { e.currentTarget.style.background = 'rgba(255,255,255,0.4)'; e.currentTarget.style.transform = 'translateY(-3px)' },
                e => { e.currentTarget.style.background = 'rgba(255,255,255,0.22)'; e.currentTarget.style.transform = '' }
              )}>
              {'icon' in b && b.icon}{b.label}
            </a>
          ))}
        </div>
      </FadeUp>
    </section>
  )
}

/* ═══════════════ BOTTOM NAV ═══════════════ */
function BottomNav({ ctaRef }: { ctaRef: React.RefObject<HTMLElement | null> }) {
  const [hidden, setHidden] = useState(false)
  const { scrollYProgress } = useScroll({ target: ctaRef, offset: ['start end', 'start 60%'] })
  useMotionValueEvent(scrollYProgress, 'change', v => setHidden(v > 0.9))
  return (
    <motion.nav className="bottom-nav" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50, height: 'var(--nav-height)', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', padding: '0 48px' }}
      initial={{ y: 80, opacity: 0 }} animate={{ y: hidden ? 80 : 0, opacity: hidden ? 0 : 1 }} transition={{ duration: 0.5, ease }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 12, pointerEvents: 'all' }}>
        <div style={{ position: 'absolute', inset: '-14px -26px', background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderRadius: 22, zIndex: -1, border: '1px solid var(--border)', boxShadow: 'var(--shadow-hover)' }} />
        <a href="https://t.me/tlgnkl" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 26px', background: 'var(--green)', color: '#1a1a1a', borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: 'none', transition: 'all 0.25s', boxShadow: '0 2px 10px rgba(122,239,140,0.2)' }}
          {...hoverProps(
            e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(122,239,140,0.3)' },
            e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 10px rgba(122,239,140,0.2)' }
          )}>
          написать
        </a>
        {[{ href: 'https://t.me/tlgnkl', icon: I.tg, l: 'TG' }, { href: 'https://github.com/tlgnkl', icon: I.gh, l: 'GH' }].map(l => (
          <a key={l.l} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.l}
            style={{ width: 42, height: 42, borderRadius: 12, background: '#f5f5f3', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: 'var(--text-secondary)', transition: 'all 0.25s', border: '1px solid var(--border)' }}
            {...hoverProps(
              e => { e.currentTarget.style.color = 'var(--green-deep)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-float)' },
              e => { e.currentTarget.style.color = ''; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }
            )}>
            {l.icon}
          </a>
        ))}
      </div>
    </motion.nav>
  )
}

/* ═══════════════ NOISE + RESPONSIVE ═══════════════ */
function Noise() { return <div className="noise-overlay" aria-hidden="true"><svg><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#n)" /></svg></div> }
function Responsive() {
  return <style>{`
    /* ═══ Tablet (≤900px) ═══ */
    @media (max-width: 900px) {
      /* Grids */
      .grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
      .grid-case { grid-template-columns: 1fr !important; }
      .grid-cases, .grid-interests { grid-template-columns: 1fr !important; }
      .grid-case-row { grid-template-columns: 1fr !important; gap: 20px !important; }
      .grid-results { grid-template-columns: repeat(2, 1fr) !important; row-gap: 24px !important; }

      /* Layout */
      .hero-section { padding: 100px 28px 60px !important; }
      .hero-section > div { gap: 40px !important; }
      .career-watermark { display: none !important; }
      .hero-case, .case-row { padding: 28px 24px !important; }

      /* Sections padding */
      section { padding-left: 28px !important; padding-right: 28px !important; }
    }

    /* ═══ Mobile (≤640px) ═══ */
    @media (max-width: 640px) {
      /* Grids */
      .grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
      .grid-results { grid-template-columns: 1fr !important; }

      /* Hero */
      .hero-section { padding: 80px 20px 48px !important; }
      .hero-section > div {
        flex-direction: column !important;
        text-align: center !important;
        gap: 32px !important;
      }
      .hero-section p { font-size: 24px !important; }
      .hero-section h1 { font-size: 56px !important; }

      /* Photo */
      .hero-section > div > div:last-child > div {
        width: 200px !important;
        height: 250px !important;
      }

      /* About */
      .about-section { padding: 32px 20px 0 !important; }
      .about-section p { font-size: 20px !important; }
      .about-section p + p { font-size: 18px !important; }

      /* Proof strip */
      .proof-strip { padding: 0 20px !important; }
      .proof-strip .grid-4 > div { padding: 0 8px !important; }
      .proof-strip .grid-4 > div > div:first-child { font-size: 22px !important; }

      /* Cases */
      .cases-section { padding: 60px 20px 60px !important; }
      .hero-case { padding: 24px 20px !important; }
      .hero-case h3 { font-size: 24px !important; }
      .case-row { padding: 24px 20px !important; }
      .case-row h3 { font-size: 20px !important; }

      /* Career */
      .career-section { padding: 60px 20px !important; }

      /* CTA */
      .cta-section { padding: 80px 20px !important; }
      .cta-section h2, .cta-section div[style*="fontFamily"] { font-size: 36px !important; }
      .cta-section p { font-size: 18px !important; }
      .cta-section a { padding: 14px 24px !important; font-size: 15px !important; }

      /* Bottom nav */
      .bottom-nav { padding: 0 16px !important; }
      .bottom-nav > div { gap: 8px !important; }
      .bottom-nav a[style*="padding: 11px"] { padding: 10px 18px !important; font-size: 13px !important; }

      /* Section headers */
      .section-head > div:first-child { font-size: 18px !important; }
      .section-head > div:last-child { font-size: 36px !important; }
    }

    /* ═══ Small mobile (≤400px) ═══ */
    @media (max-width: 400px) {
      .hero-section p { font-size: 20px !important; }
      .hero-section h1 { font-size: 44px !important; }
      .cta-section div[style*="display: flex"][style*="gap"] { flex-direction: column !important; align-items: center !important; }
    }
  `}</style>
}

/* ═══════════════ APP ═══════════════ */
export default function App() {
  const ctaRef = useRef<HTMLElement>(null)
  return (
    <>
      <Noise /><Responsive />
      <main>
        <Hero />
        <About />
        <ProofStrip />
        <Cases />
        <CareerPath />
        <Cta sectionRef={ctaRef} />
      </main>
      <div style={{ height: 80 }} />
      <BottomNav ctaRef={ctaRef} />
    </>
  )
}
