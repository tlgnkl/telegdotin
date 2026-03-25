import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CaseLayout, CaseSection } from './CaseLayout'
import { FadeUp, P, B, ease } from './shared'

const teal = '#2DD4A8'
const tealBg = '#e6faf5'

/* ═══ Helpers ═══ */

const S = ({ id, label, children }: { id: string; label: string; children: React.ReactNode }) =>
  <CaseSection id={id} label={label} accentColor={teal}>{children}</CaseSection>

/* ═══════════════════════════════════════════════════ */
/*               SIMULATION DATA                       */
/* ═══════════════════════════════════════════════════ */

const VACANCY_EXCERPT = `Python Middle+ · Авантелеком
IP-телефония, голосовые роботы, CRM-интеграции
Django / FastAPI · MySQL / PostgreSQL · asyncio
Плюс: речевые технологии (TTS/STT), Asterisk`

interface Criterion {
  name: string
  weight: number
  sourceQuote: string
  category: string
}

const CRITERIA: Criterion[] = [
  { name: 'Python & фреймворки', weight: 22, sourceQuote: 'Опыт коммерческой разработки на Python от 2 лет; Django, FastAPI', category: 'hard_skills' },
  { name: 'Базы данных', weight: 15, sourceQuote: 'Опыт работы с MySQL и/или PostgreSQL', category: 'hard_skills' },
  { name: 'Речевые технологии', weight: 15, sourceQuote: 'Разработка голосовых моделей с использованием речевых технологий', category: 'hard_skills' },
  { name: 'IP-телефония и VoIP', weight: 12, sourceQuote: 'Разработка нового ПО для IP-телефонии', category: 'experience' },
  { name: 'Интеграция с CRM', weight: 10, sourceQuote: 'CRM-системы (1C, Bitrix24)', category: 'experience' },
  { name: 'Тестирование', weight: 8, sourceQuote: 'Написание модульных тестов', category: 'hard_skills' },
  { name: 'Асинхронное программирование', weight: 10, sourceQuote: 'Python (асинхронное программирование)', category: 'hard_skills' },
  { name: 'DevOps & инфраструктура', weight: 8, sourceQuote: 'Опыт работы с Git', category: 'hard_skills' },
]

interface Evidence {
  quote: string
  context: string
  verdict: 'supported' | 'partially_supported' | 'unsupported' | 'contradicted'
}

interface CriterionResult {
  name: string
  score: number
  reasoning: string
  evidence: Evidence[]
}

interface Candidate {
  name: string
  score: number
  grade: 'A' | 'B' | 'C' | 'D' | 'F'
  recommendation: string
  summary: string
  risks: string[]
  details: CriterionResult[]
}

const CANDIDATES: Candidate[] = [
  {
    name: 'Лыбков Андрей', score: 95, grade: 'A', recommendation: 'Однозначно да',
    summary: 'Senior Python Developer, 6 лет. VoIP-платформа на Django+FastAPI, голосовые роботы (TTS/STT), Asterisk, 1C+Bitrix24. Практически полное совпадение с вакансией.',
    risks: ['Overqualified — Senior на Middle+ позицию', 'Может ожидать более высокую компенсацию'],
    details: [
      { name: 'Python & фреймворки', score: 96, reasoning: '6 лет опыта. Django + FastAPI для VoIP-платформы. asyncio, aiohttp, Celery + RabbitMQ.', evidence: [{ quote: 'Архитектура и разработка VoIP-платформы на Python + Django + FastAPI', context: 'Телеком-компания, 2021 — наст. время', verdict: 'supported' }] },
      { name: 'Базы данных', score: 92, reasoning: 'MySQL и PostgreSQL, оптимизация запросов.', evidence: [{ quote: 'Работа с MySQL и PostgreSQL, оптимизация запросов', context: 'Телеком-компания, 2021 — наст. время', verdict: 'supported' }] },
      { name: 'Речевые технологии', score: 98, reasoning: 'TTS (Yandex SpeechKit, Silero), STT (Vosk, Whisper). Голосовые роботы в продакшене.', evidence: [{ quote: 'Разработка голосовых роботов: TTS (Yandex SpeechKit, Silero), STT (Vosk, Whisper)', context: 'Телеком-компания, 2021 — наст. время', verdict: 'supported' }] },
      { name: 'IP-телефония и VoIP', score: 97, reasoning: 'VoIP-платформа, Asterisk, обработка вызовов — точное совпадение.', evidence: [{ quote: 'Интеграция с Asterisk для обработки телефонных вызовов', context: 'Телеком-компания, 2021 — наст. время', verdict: 'supported' }] },
      { name: 'Интеграция с CRM', score: 95, reasoning: '1C, Bitrix24, кастомные REST API — полное покрытие.', evidence: [{ quote: 'Интеграция с CRM: 1C, Bitrix24, кастомные REST API', context: 'Телеком-компания, 2021 — наст. время', verdict: 'supported' }] },
      { name: 'Тестирование', score: 80, reasoning: 'pytest, factory_boy, покрытие 78%.', evidence: [{ quote: 'Покрытие тестами 78% (pytest, factory_boy)', context: 'Телеком-компания, 2021 — наст. время', verdict: 'supported' }] },
      { name: 'Асинхронное программирование', score: 95, reasoning: 'asyncio, aiohttp, Celery + RabbitMQ. Микросервисы в продакшене.', evidence: [{ quote: 'Асинхронные микросервисы: asyncio, aiohttp, Celery + RabbitMQ', context: 'Телеком-компания, 2021 — наст. время', verdict: 'supported' }] },
      { name: 'DevOps & инфраструктура', score: 85, reasoning: 'Docker, Docker Compose, GitLab CI/CD, NodeJs.', evidence: [{ quote: 'Docker, Docker Compose, GitLab CI/CD', context: 'Телеком-компания, 2021 — наст. время', verdict: 'supported' }] },
    ],
  },
  {
    name: 'Дмитрий К.', score: 82, grade: 'B', recommendation: 'Рекомендован',
    summary: 'Python-разработчик, 3 года. Уникальная экспертиза в речевых технологиях (Whisper, Silero, XTTS). FastAPI, PostgreSQL, Docker. Меньше опыта с Django и CRM.',
    risks: ['3 года опыта — нижняя граница для Middle+', 'Нет опыта интеграции с CRM (1C, Bitrix24)', 'Нет опыта с IP-телефонией'],
    details: [
      { name: 'Python & фреймворки', score: 75, reasoning: '3 года Python. FastAPI для ML-сервисов, Django — предыдущий опыт. ML-фокус.', evidence: [{ quote: 'FastAPI backend для ML-сервисов, WebSocket для real-time аудио', context: 'AI-стартап, 2023 — наст. время', verdict: 'supported' }] },
      { name: 'Базы данных', score: 72, reasoning: 'PostgreSQL + Redis. MySQL ранее. Без упоминания оптимизации.', evidence: [{ quote: 'PostgreSQL + Redis для кэширования результатов', context: 'AI-стартап, 2023 — наст. время', verdict: 'supported' }] },
      { name: 'Речевые технологии', score: 96, reasoning: 'Whisper, Silero, XTTS. Pipeline обработки речи в продакшене. Уникально ценный опыт.', evidence: [{ quote: 'Работа с моделями Whisper, Silero, XTTS для синтеза и распознавания речи', context: 'AI-стартап, 2023 — наст. время', verdict: 'supported' }] },
      { name: 'IP-телефония и VoIP', score: 30, reasoning: 'Нет прямого VoIP-опыта, но WebSocket для real-time аудио — смежный.', evidence: [{ quote: 'WebSocket для real-time аудио', context: 'AI-стартап, 2023 — наст. время', verdict: 'partially_supported' }] },
      { name: 'Интеграция с CRM', score: 40, reasoning: 'Интеграция с 1С, но нет Bitrix24.', evidence: [{ quote: 'REST API, интеграция с 1С', context: 'Аутсорс-компания, 2022-2023', verdict: 'partially_supported' }] },
      { name: 'Тестирование', score: 70, reasoning: 'pytest упомянут, но нет метрик покрытия.', evidence: [{ quote: 'Написание тестов (pytest)', context: 'Аутсорс-компания, 2022-2023', verdict: 'supported' }] },
      { name: 'Асинхронное программирование', score: 80, reasoning: 'asyncio, WebSocket для real-time.', evidence: [{ quote: 'Python, FastAPI, Django, asyncio', context: 'Технологии', verdict: 'supported' }] },
      { name: 'DevOps & инфраструктура', score: 82, reasoning: 'Docker ML-моделей, Prometheus + Grafana.', evidence: [{ quote: 'Docker-контейнеризация ML-моделей', context: 'AI-стартап, 2023 — наст. время', verdict: 'supported' }, { quote: 'Мониторинг: Prometheus + Grafana', context: 'AI-стартап, 2023 — наст. время', verdict: 'supported' }] },
    ],
  },
  {
    name: 'Alexander Provatorov', score: 78, grade: 'B', recommendation: 'Рекомендован',
    summary: 'Middle+ Python-разработчик, 4 года. FastAPI + Django, микросервисы, CRM-интеграции (Bitrix24, AmoCRM). Нет опыта с речевыми технологиями и VoIP.',
    risks: ['Нет опыта с речевыми технологиями (TTS/STT)', 'Нет опыта с IP-телефонией и VoIP'],
    details: [
      { name: 'Python & фреймворки', score: 88, reasoning: '4 года. FastAPI + Django в продакшене. Микросервисы для 50K+ пользователей.', evidence: [{ quote: 'Разработка микросервисной архитектуры на FastAPI + PostgreSQL', context: 'Финтех-стартап, 2022 — наст. время', verdict: 'supported' }, { quote: 'Backend на Django + Django REST Framework', context: 'Веб-студия, 2020-2022', verdict: 'supported' }] },
      { name: 'Базы данных', score: 85, reasoning: 'PostgreSQL и MySQL. REST API для 50K+ пользователей.', evidence: [{ quote: 'FastAPI + PostgreSQL', context: 'Финтех-стартап, 2022 — наст. время', verdict: 'supported' }] },
      { name: 'Речевые технологии', score: 5, reasoning: 'Нет упоминаний о речевых технологиях.', evidence: [] },
      { name: 'IP-телефония и VoIP', score: 5, reasoning: 'Нет упоминаний об IP-телефонии.', evidence: [] },
      { name: 'Интеграция с CRM', score: 82, reasoning: 'Bitrix24 и AmoCRM. Близко к требованиям.', evidence: [{ quote: 'Интеграции с платёжными системами и CRM (Bitrix24, AmoCRM)', context: 'Финтех-стартап, 2022 — наст. время', verdict: 'supported' }] },
      { name: 'Тестирование', score: 84, reasoning: 'pytest, покрытие 82%. Unit и integration тесты.', evidence: [{ quote: 'Написание unit и integration тестов (pytest, coverage 82%)', context: 'Финтех-стартап, 2022 — наст. время', verdict: 'supported' }] },
      { name: 'Асинхронное программирование', score: 86, reasoning: 'asyncio, aiohttp, Celery. Асинхронная микросервисная архитектура.', evidence: [{ quote: 'Асинхронное программирование: asyncio, aiohttp, Celery', context: 'Финтех-стартап, 2022 — наст. время', verdict: 'supported' }] },
      { name: 'DevOps & инфраструктура', score: 80, reasoning: 'Docker, Docker Compose, GitLab CI. Git flow.', evidence: [{ quote: 'CI/CD: GitLab CI, Docker, Docker Compose', context: 'Финтех-стартап, 2022 — наст. время', verdict: 'supported' }] },
    ],
  },
  {
    name: 'Кульбида Дмитрий', score: 35, grade: 'D', recommendation: 'Не рекомендован',
    summary: 'Junior+ разработчик, 2 года. Базовые Django и PostgreSQL. Нет FastAPI, asyncio, речевых технологий, CRM-интеграций. Не соответствует Middle+.',
    risks: ['2 года опыта — недостаточно для Middle+', 'Нет FastAPI и асинхронного программирования', 'Нет речевых технологий, VoIP, CRM', 'Нет Docker и CI/CD'],
    details: [
      { name: 'Python & фреймворки', score: 42, reasoning: 'Django и DRF есть, FastAPI нет. Flask базово. Для Middle+ мало.', evidence: [{ quote: 'Поддержка и доработка Django-проекта для внутренней CRM', context: 'IT-компания, 2024 — наст. время', verdict: 'partially_supported' }] },
      { name: 'Базы данных', score: 45, reasoning: 'PostgreSQL и MySQL упомянуты, но только базовые миграции.', evidence: [{ quote: 'Работа с PostgreSQL, базовые миграции', context: 'IT-компания, 2024 — наст. время', verdict: 'partially_supported' }] },
      { name: 'Речевые технологии', score: 0, reasoning: 'Нет упоминаний.', evidence: [] },
      { name: 'IP-телефония и VoIP', score: 0, reasoning: 'Нет опыта.', evidence: [] },
      { name: 'Интеграция с CRM', score: 25, reasoning: 'Работа с внутренней CRM, но нет 1C/Bitrix24.', evidence: [{ quote: 'Поддержка и доработка Django-проекта для внутренней CRM', context: 'IT-компания, 2024 — наст. время', verdict: 'partially_supported' }] },
      { name: 'Тестирование', score: 15, reasoning: 'Нет упоминаний о тестировании. Только код-ревью.', evidence: [{ quote: 'Участие в код-ревью', context: 'IT-компания, 2024 — наст. время', verdict: 'partially_supported' }] },
      { name: 'Асинхронное программирование', score: 5, reasoning: 'Нет asyncio, aiohttp, Celery.', evidence: [] },
      { name: 'DevOps & инфраструктура', score: 20, reasoning: 'Базовый Git. Нет Docker, нет CI/CD.', evidence: [{ quote: 'Базовое понимание Git', context: 'Веб-студия, 2023-2024', verdict: 'partially_supported' }] },
    ],
  },
]

/* ═══════════════════════════════════════════════════ */
/*               SCORING SIMULATION                    */
/* ═══════════════════════════════════════════════════ */

type Grade = 'A' | 'B' | 'C' | 'D' | 'F'
const gradeColor = (g: Grade) =>
  g === 'A' ? '#1a8a6e' : g === 'B' ? '#2d6bc4' : g === 'C' ? '#b8611e' : '#b33a3a'
const gradeBg = (g: Grade) =>
  g === 'A' ? '#e6faf5' : g === 'B' ? '#eef5ff' : g === 'C' ? '#fff3ea' : '#fff0ee'
const scoreColor = (s: number) =>
  s >= 85 ? '#1a8a6e' : s >= 70 ? '#2d6bc4' : s >= 55 ? '#b8611e' : s >= 40 ? '#c4602d' : '#b33a3a'
const verdictLabel = (v: string) =>
  v === 'supported' ? 'подтверждено' : v === 'partially_supported' ? 'частично' : v === 'unsupported' ? 'не подтверждено' : 'противоречие'
const verdictColor = (v: string) =>
  v === 'supported' ? '#1a8a6e' : v === 'partially_supported' ? '#b8611e' : '#b33a3a'
const verdictBgColor = (v: string) =>
  v === 'supported' ? '#e6faf5' : v === 'partially_supported' ? '#fff3ea' : '#fff0ee'

function ScoringDemo() {
  const [step, setStep] = useState(0) // 0=vacancy, 1=criteria, 2=results
  const [expanded, setExpanded] = useState<string | null>(null)
  const [expandedCrit, setExpandedCrit] = useState<string | null>(null)

  const reset = () => { setStep(0); setExpanded(null); setExpandedCrit(null) }

  return (
    <div style={{ background: 'var(--surface-alt)', borderRadius: 24, padding: '40px 36px', marginTop: 40 }}>

      {/* Step indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32 }}>
        {['Вакансия', 'Критерии', 'Результаты'].map((label, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {i > 0 && <div style={{ width: 32, height: 1, background: i <= step ? teal : 'var(--border)' }} />}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700,
                background: i <= step ? teal : 'transparent',
                color: i <= step ? '#fff' : 'var(--text-muted)',
                border: i <= step ? 'none' : '1.5px solid var(--text-muted)',
                transition: 'all 0.3s',
              }}>
                {i < step ? '✓' : i + 1}
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: i <= step ? 'var(--text)' : 'var(--text-muted)', transition: 'color 0.3s' }}>{label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Step 0: Vacancy */}
      {step === 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: '24px 28px', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: 2, color: 'var(--text-muted)', marginBottom: 12 }}>Вакансия</div>
            <pre style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-body)', whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0 }}>{VACANCY_EXCERPT}</pre>
          </div>
          <button type="button" onClick={() => setStep(1)} style={{
            marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 28px', background: teal, color: '#fff', border: 'none',
            borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer',
            transition: 'all 0.3s', boxShadow: `0 4px 16px ${teal}44`,
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${teal}55` }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 4px 16px ${teal}44` }}>
            Сгенерировать критерии →
          </button>
        </motion.div>
      )}

      {/* Step 1: Criteria */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }}>
          <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 16 }}>
            Система проанализировала вакансию и выделила <B>8 критериев</B> с весами:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {CRITERIA.map((c, i) => (
              <motion.div key={c.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: i * 0.06, ease }}
                style={{
                  background: '#fff', borderRadius: 12, padding: '14px 20px',
                  border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 16,
                }}>
                <div style={{ width: 44, fontSize: 16, fontWeight: 800, color: teal, textAlign: 'right', flexShrink: 0 }}>{c.weight}%</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>«{c.sourceQuote}»</div>
                </div>
                <div style={{
                  fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 6,
                  background: c.category === 'hard_skills' ? '#eef5ff' : '#fff3ea',
                  color: c.category === 'hard_skills' ? '#2d6bc4' : '#b8611e',
                }}>{c.category === 'hard_skills' ? 'Hard Skills' : 'Experience'}</div>
              </motion.div>
            ))}
          </div>
          <button type="button" onClick={() => setStep(2)} style={{
            marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 28px', background: teal, color: '#fff', border: 'none',
            borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer',
            transition: 'all 0.3s', boxShadow: `0 4px 16px ${teal}44`,
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${teal}55` }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 4px 16px ${teal}44` }}>
            Оценить 4 кандидатов →
          </button>
        </motion.div>
      )}

      {/* Step 2: Results */}
      {step === 2 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }}>
          <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 16 }}>
            Каждый критерий оценён отдельно для каждого кандидата. Результаты отсортированы по скору:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {CANDIDATES.map((c, i) => {
              const isOpen = expanded === c.name
              return (
                <motion.div key={c.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.08, ease }}
                  style={{ background: '#fff', borderRadius: 16, border: '1px solid var(--border)', overflow: 'hidden' }}>

                  {/* Card header */}
                  <div role="button" tabIndex={0} aria-expanded={isOpen}
                    onClick={() => { setExpanded(isOpen ? null : c.name); setExpandedCrit(null) }}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpanded(isOpen ? null : c.name); setExpandedCrit(null) } }}
                    style={{
                      padding: '18px 24px', display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface-alt)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = '' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-muted)', width: 28 }}>#{i + 1}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)' }}>{c.name}</div>
                      <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>{c.recommendation}</div>
                    </div>
                    <div style={{
                      fontSize: 13, fontWeight: 700, padding: '4px 12px', borderRadius: 8,
                      background: gradeBg(c.grade), color: gradeColor(c.grade),
                    }}>{c.grade}</div>
                    <div style={{ fontSize: 28, fontWeight: 800, color: scoreColor(c.score), minWidth: 48, textAlign: 'right' }}>{c.score}</div>
                    <div aria-hidden="true" style={{
                      fontSize: 18, color: 'var(--text-muted)', transition: 'transform 0.3s',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}>▾</div>
                  </div>

                  {/* Expanded detail */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease, when: 'afterChildren' }}
                        style={{ overflow: 'hidden' }}>
                        <div style={{ padding: '0 24px 24px', borderTop: '1px solid var(--border)' }}>

                          {/* Summary */}
                          <p style={{ fontSize: 14, color: 'var(--text-body)', lineHeight: 1.65, marginTop: 16, marginBottom: 20 }}>{c.summary}</p>

                          {/* Criteria bars */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            {c.details.map(d => {
                              const isCritOpen = expandedCrit === `${c.name}-${d.name}`
                              return (
                                <div key={d.name}>
                                  <div role="button" tabIndex={0} aria-expanded={isCritOpen}
                                    onClick={e => { e.stopPropagation(); setExpandedCrit(isCritOpen ? null : `${c.name}-${d.name}`) }}
                                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); setExpandedCrit(isCritOpen ? null : `${c.name}-${d.name}`) } }}
                                    style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', padding: '6px 0' }}>
                                    <div style={{ width: 160, fontSize: 13, color: 'var(--text-secondary)', flexShrink: 0 }}>{d.name}</div>
                                    <div style={{ flex: 1, height: 8, background: '#f0f0ee', borderRadius: 4, overflow: 'hidden' }}>
                                      <motion.div
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: d.score / 100 }}
                                        transition={{ duration: 0.8, delay: 0.1, ease }}
                                        style={{ height: '100%', width: '100%', background: scoreColor(d.score), borderRadius: 4, transformOrigin: 'left' }} />
                                    </div>
                                    <div style={{ width: 32, fontSize: 14, fontWeight: 700, color: scoreColor(d.score), textAlign: 'right' }}>{d.score}</div>
                                    <div aria-hidden="true" style={{
                                      fontSize: 14, color: 'var(--text-muted)', transition: 'transform 0.2s', width: 16, textAlign: 'center',
                                      transform: isCritOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                    }}>▾</div>
                                  </div>

                                  {/* Criterion detail */}
                                  <AnimatePresence>
                                    {isCritOpen && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25, ease }}
                                        style={{ overflow: 'hidden' }}>
                                        <div style={{ padding: '8px 0 12px 0' }}>
                                          <div style={{ fontSize: 13, color: 'var(--text-body)', lineHeight: 1.6, marginBottom: 8 }}>{d.reasoning}</div>
                                          {d.evidence.length > 0 && (
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                              {d.evidence.map((ev, ei) => (
                                                <div key={`${ev.quote.slice(0, 20)}-${ei}`} style={{
                                                  fontSize: 12, padding: '8px 12px', borderRadius: 8,
                                                  background: verdictBgColor(ev.verdict), borderLeft: `3px solid ${verdictColor(ev.verdict)}`,
                                                }}>
                                                  <div style={{ color: 'var(--text-body)' }}>«{ev.quote}»</div>
                                                  <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                                                    <span style={{ color: 'var(--text-muted)' }}>{ev.context}</span>
                                                    <span style={{
                                                      fontWeight: 700, fontSize: 11, padding: '1px 8px', borderRadius: 4,
                                                      background: verdictBgColor(ev.verdict), color: verdictColor(ev.verdict),
                                                    }}>{verdictLabel(ev.verdict)}</span>
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                          )}
                                          {d.evidence.length === 0 && (
                                            <div style={{ fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic' }}>Нет подтверждающих цитат в резюме</div>
                                          )}
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              )
                            })}
                          </div>

                          {/* Risks */}
                          {c.risks.length > 0 && (
                            <div style={{ marginTop: 16 }}>
                              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: 1.5, color: 'var(--text-muted)', marginBottom: 8 }}>Риски</div>
                              {c.risks.map((r, ri) => (
                                <div key={ri} style={{ fontSize: 13, color: '#b33a3a', display: 'flex', gap: 8, marginBottom: 4 }}>
                                  <span>⚠</span><span>{r}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>

          <button type="button" onClick={reset} style={{
            marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '10px 24px', background: 'transparent', color: 'var(--text-secondary)',
            border: '1.5px solid var(--border)', borderRadius: 12, fontSize: 14, fontWeight: 600,
            cursor: 'pointer', transition: 'all 0.3s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = teal; e.currentTarget.style.color = teal }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}>
            ← Начать заново
          </button>
        </motion.div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════ */
/*                   PAGE                              */
/* ═══════════════════════════════════════════════════ */

export function HrtechCasePage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const sectionsMeta = [
    { id: 'problem', label: 'Проблема' },
    { id: 'discovery', label: 'Discovery' },
    { id: 'decisions', label: 'Решения' },
    { id: 'how-it-works', label: 'Как работает' },
    { id: 'demo', label: 'Демо' },
    { id: 'validation', label: 'Валидация' },
    { id: 'impact', label: 'Результаты' },
    { id: 'economics', label: 'Экономика' },
    { id: 'role', label: 'Моя роль' },
    { id: 'differently', label: 'Иначе' },
  ]

  const tldr = [
    '4 из 5 рекрутеров назвали субъективность оценки главной болью — одно резюме утром и вечером получает разный скор',
    'Принцип: каждый балл подкреплён цитатой из резюме. Рекрутер видит не число, а аргумент',
    '15 000+ кандидатов, 100+ вакансий. В командах с регулярным использованием shortlist формировался быстрее (4.2 → 2.5 дня), конверсия screen→interview +15%',
    'Рекрутер сначала читает резюме, потом видит скор. Может отменить оценку с указанием причины',
    'Честно: discovery на 5 интервью — мало. False negative rate пока не измерен',
  ]

  return (
    <CaseLayout caseId="hrtech" sections={sectionsMeta} tldr={tldr} accentColor={teal} accentBg={tealBg}>

        {/* ═══ Hero ═══ */}
        <FadeUp>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
            <div style={{ width: 52, height: 52, background: tealBg, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: teal }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: 2, color: teal }}>HR-платформа (NDA) · от идеи до прода</span>
          </div>
          <h1 style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.15, marginBottom: 24 }}>
            Как сделать оценку<br />кандидатов объяснимой
          </h1>
          <p style={{ fontSize: 22, color: 'var(--text-body)', lineHeight: 1.65, maxWidth: 680 }}>
            Рекрутеры жаловались: одно и то же резюме утром получает "подходит", а вечером — "не уверен".
            Я построил систему, где каждый балл привязан к конкретной цитате из резюме —
            рекрутер видит не абстрактное число, а аргумент, с которым можно согласиться или поспорить.
          </p>
        </FadeUp>

        {/* ═══ Metrics ═══ */}
        <FadeUp delay={0.1}>
          <div className="case-metrics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '40px 0', marginTop: 48 }}>
            {[
              { value: '−40%', label: 'time-to-shortlist' },
              { value: '+15%', label: 'конверсия screen→interview' },
              { value: '15 000+', label: 'кандидатов в проде' },
              { value: '87%', label: 'совпадение с рекрутером (±1 балл)' },
            ].map((m, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '0 16px', borderLeft: i > 0 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: teal, letterSpacing: '-0.02em' }}>{m.value}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 6 }}>{m.label}</div>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* ═══ Problem ═══ */}
        <FadeUp>
          <S id="problem" label="Проблема">
            <P>
              Рекрутеры обрабатывают сотни резюме на каждую вакансию. Существующие ATS находят резюме по ключевым словам,
              но <B>не оценивают глубину опыта</B>. "Python" в резюме — это 5 лет в продакшене или 5-дневный курс?
              Ключевое слово одинаковое, а кандидаты разные.
            </P>
            <P>
              Вторая проблема: <B>кандидаты преувеличивают</B>. Резюме говорит "B2 English", анкета — "Intermediate".
              ATS это не ловит. Расхождения всплывают только на собеседовании, когда время уже потрачено.
            </P>
            <P>
              Третья: при большом потоке <B>оценка становится субъективной</B>. К вечеру рекрутер устаёт,
              и одно и то же резюме утром и вечером получает разные оценки.
            </P>
          </S>
        </FadeUp>

        {/* ═══ Discovery ═══ */}
        <FadeUp>
          <S id="discovery" label="Как я пришёл к задаче">
            <P>
              Работая над HR-продуктом, наблюдал процесс изнутри. Поговорил с 5 рекрутерами в компании:
              <B> 4 из 5 назвали субъективность оценки главной болью</B>. Не "нам нужен AI" — а "мы сами не уверены,
              что оцениваем кандидатов одинаково утром и вечером".
            </P>
            <P>
              Посмотрел рынок: HireVue, Pymetrics, десятки AI-скрининг тулов. Общее у всех — <B>чёрный ящик</B>:
              "кандидат подходит на 75%", без объяснения почему. Рекрутеры не доверяют таким скорам и перепроверяют вручную —
              AI экономит ноль времени.
            </P>
            <P>
              Гипотеза: если каждый балл подкреплён <B>цитатой из резюме</B> и аргументацией, рекрутер может согласиться
              или оспорить конкретный пункт, а не абстрактное число. Финальное решение остаётся за рекрутером.
            </P>
          </S>
        </FadeUp>

        {/* ═══ Product decisions ═══ */}
        <FadeUp>
          <S id="decisions" label="Продуктовые решения">
            <P>
              Каждое решение в системе вытекает из того, что я узнал в discovery:
            </P>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28, marginTop: 28 }}>
              {[
                {
                  title: 'Не чёрный ящик, а отчёт с доказательствами',
                  text: 'Рекрутер не будет доверять числу "75 баллов" без объяснения. Каждый скор подкреплён цитатой из резюме кандидата и аргументацией — почему именно столько. Если рекрутер не согласен, он видит, на какие данные опирается система.',
                },
                {
                  title: 'culture_fit запрещён в критериях',
                  text: 'Соблазн добавить "культурное соответствие" велик. Но это невозможно верифицировать по тексту — любая оценка будет галлюцинацией LLM. Один ненадёжный критерий подрывает доверие ко всей системе. Лучше честно сказать: "мы это не оцениваем".',
                },
                {
                  title: 'Hard skills ≥ 85% веса — осознанное ограничение',
                  text: 'Система фокусируется на том, что можно проверить текстом: коммерческий опыт, конкретные технологии, проекты. Soft skills ≤ 10% и только если доказуемы документально — осознанное ограничение, а не недоработка.',
                },
                {
                  title: 'Рекомендация ≠ оценка',
                  text: 'Кандидат может набрать 80 баллов (Grade B), но при этом иметь 3 расхождения между резюме и анкетой. Оценка говорит "квалификация подходит", рекомендация — "проверьте внимательнее". Это два разных сигнала, и рекрутеру нужны оба.',
                },
                {
                  title: 'Калибровка: LLM говорит "75", но аргументы на "50"',
                  text: 'LLM может поставить завышенный балл с посредственным reasoning. Калибровка сравнивает текст рассуждения с эталонами (от FAIL до IDEAL) через эмбеддинги и корректирует скор. Это второй источник истины, который ловит ошибки первого.',
                },
                {
                  title: 'Только верифицируемые навыки, не демография',
                  text: 'AI-скоринг людей — чувствительная тема. Осознанное ограничение: система оценивает только то, что написано в документах — опыт, технологии, проекты. Ни пол, ни возраст, ни фото не попадают в оценку. Это не гарантия отсутствия bias в LLM, но архитектурное решение, которое минимизирует поверхность атаки.',
                },
              ].map((d, i) => (
                <div key={i}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{d.title}</div>
                  <div style={{ fontSize: 17, color: 'var(--text-body)', lineHeight: 1.7 }}>{d.text}</div>
                </div>
              ))}
            </div>
          </S>
        </FadeUp>

        {/* ═══ How it works ═══ */}
        <FadeUp>
          <S id="how-it-works" label="Как это работает">
            <P>
              Три шага — от текста вакансии до готового отчёта для рекрутера:
            </P>
            <div className="case-grid-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 32 }}>
              {[
                {
                  step: '1',
                  title: 'Что важно в вакансии',
                  desc: 'Система читает текст вакансии и сама определяет 6-10 конкретных критериев с весами. Каждый критерий цитирует вакансию — система не может выдумать требование, которого нет в тексте.',
                },
                {
                  step: '2',
                  title: 'Оценка каждого критерия',
                  desc: 'Каждый критерий оценивается отдельно: система находит в резюме подтверждения, проверяет факты, ловит расхождения с анкетой. Результат — скор 0-100 с объяснением.',
                },
                {
                  step: '3',
                  title: 'Отчёт для рекрутера',
                  desc: 'Итоговый грейд A-F, рекомендация (с учётом найденных расхождений), и 0-5 рисков — конкретные вопросы, которые стоит задать на интервью.',
                },
              ].map(s => (
                <div key={s.step} style={{
                  background: 'var(--surface-alt)', borderRadius: 16, padding: '28px 24px',
                  borderTop: `3px solid ${teal}`,
                }}>
                  <div style={{ fontSize: 36, fontWeight: 800, color: teal, opacity: 0.3, lineHeight: 1 }}>{s.step}</div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginTop: 8, marginBottom: 10 }}>{s.title}</div>
                  <div style={{ fontSize: 14, color: 'var(--text-body)', lineHeight: 1.65 }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </S>
        </FadeUp>

        {/* ═══ Interactive simulation ═══ */}
        <FadeUp>
          <S id="demo" label="Попробуйте сами">
            <P>
              Ниже — интерактивная демо-симуляция. Вакансия и кандидаты синтетические (имена, компании, детали — вымышлены). Логика скоринга и формат отчёта — реальные.
              Кликайте, чтобы увидеть, как система генерирует критерии и оценивает каждого.
            </P>
            <ScoringDemo />
          </S>
        </FadeUp>

        {/* ═══ My role ═══ */}
        <FadeUp>
          <S id="role" label="Моя роль">
            <P>
              Разработка для HR-платформы (заказчик под NDA). Начал с discovery внутри команды рекрутеров: можно ли убрать субъективность из скрининга?
            </P>
            <ul style={{ fontSize: 19, lineHeight: 1.85, paddingLeft: 0, listStyle: 'none', color: 'var(--text-body)', maxWidth: 700, marginTop: 20 }}>
              {[
                'Провёл discovery: 5 интервью с рекрутерами, анализ конкурентов (HireVue, Pymetrics), сформулировал гипотезу',
                'Определил продуктовые принципы: каждый балл подкреплён цитатой, запрет culture_fit, hard skills ≥ 85% веса',
                'Спроектировал архитектуру под продуктовые требования и сам реализовал (Python, FastAPI, LangGraph)',
                'Придумал механизм калибровки — ловит расхождение между числовым скором и текстом аргументации',
                'Запустил в прод: 100+ вакансий, 15 000+ кандидатов. Рекрутеры используют для первичного скрининга',
              ].map((a, i) => (
                <li key={i} style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
                  <span style={{ color: teal, fontWeight: 700, flexShrink: 0, fontSize: 22, lineHeight: '35px' }}>→</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </S>
        </FadeUp>

        {/* ═══ Validation ═══ */}
        <FadeUp>
          <S id="validation" label="Валидация">
            <P>
              Рекрутер оценивал кандидатов на реальные вакансии (несколько позиций разного уровня), не видя оценки системы. Потом сравнили — по каждому критерию отдельно, шкала 1-5. Совпадение ±1 балл — <B>87%</B>.
            </P>
            <P>
              По типам критериев: конкретные навыки (Python, SQL, фреймворки) — <B>~93%</B>. Опыт (годы, масштаб проектов) — <B>~85%</B>. Отраслевая экспертиза — <B>~72%</B>. Закономерно: чем субъективнее критерий, тем ниже согласие — и у людей между собой, и у системы с человеком.
            </P>
            <P>
              После пилота раскатили на полный поток: <B>100+ вакансий, 15 000+ кандидатов</B>. Рекрутер тратит ~3 минуты на проверку готового отчёта вместо 15-20 на ручной разбор резюме.
            </P>
            <P>
              Обратная связь: "наконец могу объяснить кандидату, почему отказ — вот конкретные пробелы". Отдельная находка: система ловит несоответствия между резюме и анкетой, которые рекрутер пропускает.
            </P>
          </S>
        </FadeUp>

        {/* ═══ Business Impact ═══ */}
        <FadeUp>
          <S id="impact" label="Результаты в проде">
            <P>
              Система влияет на самый верх воронки — скрининг резюме. Сравнили команды, которые активно пользовались инструментом, с теми, где использование было минимальным:
            </P>
            <ul style={{ fontSize: 18, lineHeight: 1.85, paddingLeft: 0, listStyle: 'none', color: 'var(--text-body)', maxWidth: 700, marginTop: 12 }}>
              {[
                'Время до формирования шортлиста: −40% (медиана 4.2 дня → 2.5 дня)',
                'Конверсия из скрининга в интервью: +15% — рекрутеры точнее сортируют, меньше "шумовых" собеседований',
                'Пропускная способность: 2.3× больше кандидатов в день без потери качества шортлиста',
                'Отмены рекомендаций: 8%. Главная причина — "контекст за рамками резюме" (личное знакомство, рекомендации)',
              ].map((a, i) => (
                <li key={i} style={{ display: 'flex', gap: 14, marginBottom: 8 }}>
                  <span style={{ color: teal, fontWeight: 700, flexShrink: 0 }}>→</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
            <P>
              <B>Чего пока нет:</B> данных о том, как изменилось качество найма (удержание через 3-6 месяцев, результаты испытательного срока). Система ускоряет скрининг — но пока не доказано, что ускорение не ухудшает конечный результат.
            </P>
          </S>
        </FadeUp>

        {/* ═══ Unit economics ═══ */}
        <FadeUp>
          <S id="economics" label="Экономика">
            <P>
              Стоимость оценки одного кандидата: <B>~$0.12</B> (8 параллельных LLM-вызовов на Gemini 3 Flash).
              Рекрутер тратит на ручной разбор резюме 15-20 минут — это ~$3-4 по рыночной ставке.
              Рекрутер всё равно ревьюит скоры — но вместо 15-20 минут на разбор резюме тратит 3 минуты на проверку готового отчёта.
            </P>
            <P>
              При этом система не заменяет рекрутера — она заменяет первый проход "прочитать и оценить".
              Финальное решение, собеседование и оффер остаются за человеком.
            </P>
          </S>
        </FadeUp>

        {/* ═══ What I'd do differently ═══ */}
        <FadeUp>
          <S id="differently" label="Что бы сделал иначе">
            <P>
              <B>False negatives — главный неизмеренный риск.</B> Пока не измерен false negative rate, я не могу утверждать, что система безопасно помогает отсеивать кандидатов. Следующий шаг — аудит отклонённых системой кандидатов на независимой выборке. Career changers и overqualified — известные слепые зоны, нужен отдельный слой логики.
            </P>
            <P>
              <B>Quality-of-hire.</B> Текущие метрики (time-to-shortlist, screen→interview) — operational. Не хватает: retention нанятых через 3-6 месяцев, performance review correlation, offer-accept rate по когортам. Это следующий уровень proof.
            </P>
            <P>
              <B>Discovery.</B> 5 интервью — хватило для гипотезы, мало для уверенности. Стоило 15-20, включая рекрутеров из других компаний.
            </P>
          </S>
        </FadeUp>

        {/* ═══ Stack ═══ */}
        <FadeUp>
          <div style={{ borderTop: '1px solid var(--border)', marginTop: 64, paddingTop: 48 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['Python', 'FastAPI', 'LangGraph', 'Gemini 3.1 Pro / 3 Flash', 'Pydantic', 'Калибровка скоров', 'LangFuse', 'Docker'].map(t => (
                <span key={t} style={{
                  fontSize: 13, fontWeight: 600, padding: '6px 14px', borderRadius: 8,
                  background: tealBg, color: '#1a8a6e',
                }}>{t}</span>
              ))}
            </div>
          </div>
        </FadeUp>

    </CaseLayout>
  )
}
