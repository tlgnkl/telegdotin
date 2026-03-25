import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CaseLayout, CaseSection } from './CaseLayout'
import { FadeUp, P, B, ease } from './shared'

const amber = '#F5A623'
const amberBg = '#fff8eb'

/* ═══ Helpers ═══ */

const S = ({ id, label, children }: { id: string; label: string; children: React.ReactNode }) =>
  <CaseSection id={id} label={label} accentColor={amber}>{children}</CaseSection>

/* ═══════════════════════════════════════════════════ */
/*           DEMO DATA                                   */
/* ═══════════════════════════════════════════════════ */

interface DemoRow {
  circuit_id: string
  device_type: string
  manufacturer: string
  model: string
  rating_a: number
  cable_mark: string
  section_mm2: number | null
  cores: number
  confidence: number
  needsReview: boolean
}

const DEMO_ROWS: DemoRow[] = [
  { circuit_id: 'QF2.12', device_type: 'Автомат', manufacturer: 'Schneider', model: 'CVS100F', rating_a: 50, cable_mark: 'ВВГнг-LS', section_mm2: 16, cores: 4, confidence: 0.92, needsReview: false },
  { circuit_id: 'QF2.26', device_type: 'Автомат', manufacturer: 'Schneider', model: 'CVS100N', rating_a: 100, cable_mark: 'ВВГнг-LS', section_mm2: 35, cores: 4, confidence: 0.88, needsReview: false },
  { circuit_id: 'QF2.27', device_type: 'Автомат', manufacturer: 'Schneider', model: 'CVS160N', rating_a: 125, cable_mark: 'ВВГнг-LS', section_mm2: null, cores: 4, confidence: 0.62, needsReview: true },
  { circuit_id: 'QF2.28', device_type: 'Автомат', manufacturer: 'Schneider', model: 'CVS100F', rating_a: 63, cable_mark: 'ВВГнг-LS', section_mm2: 16, cores: 4, confidence: 0.85, needsReview: false },
]

/* ═══ Pipeline steps ═══ */

const PIPELINE_STEPS = [
  {
    id: 'photo',
    label: 'Инженер фотографирует секцию щита',
    desc: 'На объекте: одно фото на секцию. За выезд — 50–100 фотографий.',
  },
  {
    id: 'ai',
    label: 'AI-система анализирует фото',
    desc: 'Конвейер агентов: supervisor маршрутизирует, агенты извлекают устройства и кабели, judge валидирует.',
  },
  {
    id: 'review',
    label: 'Инженер проверяет результат',
    desc: 'Предзаполненная таблица с подсветкой неуверенных полей. Инженер корректирует только помеченное — не вводит с нуля.',
  },
  {
    id: 'done',
    label: 'Протокол готов',
    desc: 'Данные экспортируются в платформу заказчика. Вместо 80 часов — ~25.',
  },
]

/* ═══════════════════════════════════════════════════ */
/*           INTERACTIVE DEMO                            */
/* ═══════════════════════════════════════════════════ */

function UserFlowDemo() {
  const [step, setStep] = useState(0)

  return (
    <div style={{ marginTop: 32 }}>
      {/* Step indicator */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 32 }}>
        {PIPELINE_STEPS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setStep(i)}
            aria-label={`Шаг ${i + 1}: ${s.label}`}
            style={{
              flex: 1, height: 6, borderRadius: 3, border: 'none', cursor: 'pointer',
              background: i <= step ? amber : '#eee', transition: 'background 0.3s',
            }}
          />
        ))}
      </div>

      {/* Step label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: amber, textTransform: 'uppercase' as const, letterSpacing: 1.5 }}>
          Шаг {step + 1} из {PIPELINE_STEPS.length}
        </span>
      </div>
      <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>{PIPELINE_STEPS[step].label}</h3>
      <p style={{ fontSize: 17, color: 'var(--text-secondary)', marginBottom: 24, maxWidth: 600 }}>{PIPELINE_STEPS[step].desc}</p>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease }}
        >
          {/* Step 1: Photo */}
          {step === 0 && (
            <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border)' }}>
              <img src="/cases/elektro/breakers-closeup.jpg" alt="Секция электрощита" loading="lazy" style={{ width: '100%', display: 'block' }} />
            </div>
          )}

          {/* Step 2: AI processing — simplified view */}
          {step === 1 && (
            <div style={{ background: amberBg, borderRadius: 16, padding: '32px 36px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { icon: '🔍', label: 'Supervisor', status: 'Определил: 4 автомата Schneider, кабели с цветной изоляцией', time: '2с' },
                  { icon: '⚡', label: 'Devices Agent', status: 'Извлёк: тип, номинал, модель, circuit_id для каждого автомата', time: '8с' },
                  { icon: '🔌', label: 'Cables Agent', status: 'Извлёк: марку, сечение, жилы, наконечники', time: '7с' },
                  { icon: '✓', label: 'Judge', status: 'Проверил согласованность → 3 из 4 приняты, 1 на ручную проверку (сечение не читается)', time: '3с' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <span style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, fontSize: 15 }}>{item.label}</span>
                        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.time}</span>
                      </div>
                      <div style={{ fontSize: 14, color: 'var(--text-body)', marginTop: 4, lineHeight: 1.6 }}>{item.status}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 20, padding: '12px 16px', background: '#fff', borderRadius: 10, fontSize: 14, color: 'var(--text-secondary)' }}>
                Общее время: ~20 секунд · Стоимость: $0.09
              </div>
            </div>
          )}

          {/* Step 3: Engineer review — THE KEY USER-FACING VIEW */}
          {step === 2 && (
            <div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border)' }}>
                      {['', 'Цепь', 'Тип', 'Номинал', 'Кабель', 'Сечение', 'Жилы'].map(h => (
                        <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' as const, letterSpacing: 1 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {DEMO_ROWS.map(row => (
                      <tr key={row.circuit_id} style={{
                        borderBottom: '1px solid var(--border)',
                        background: row.needsReview ? '#fff8eb' : 'transparent',
                      }}>
                        <td style={{ padding: '10px 12px', width: 32 }}>
                          {row.needsReview
                            ? <span style={{ color: amber, fontSize: 16 }} title="Требует проверки">⚠</span>
                            : <span style={{ color: '#45c55e', fontSize: 16 }}>✓</span>
                          }
                        </td>
                        <td style={{ padding: '10px 12px', fontWeight: 700 }}>{row.circuit_id}</td>
                        <td style={{ padding: '10px 12px' }}>{row.device_type} {row.rating_a}A</td>
                        <td style={{ padding: '10px 12px' }}>{row.manufacturer} {row.model}</td>
                        <td style={{ padding: '10px 12px' }}>{row.cable_mark}</td>
                        <td style={{ padding: '10px 12px' }}>
                          {row.section_mm2
                            ? <span>{row.section_mm2}мм²</span>
                            : <span style={{
                                background: '#fff0ee', color: '#b33a3a', padding: '2px 10px',
                                borderRadius: 6, fontSize: 12, fontWeight: 600,
                              }}>уточнить</span>
                          }
                        </td>
                        <td style={{ padding: '10px 12px' }}>{row.cores}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ marginTop: 16, padding: '14px 20px', background: amberBg, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
                <span style={{ color: amber, fontSize: 16 }}>⚠</span>
                <span style={{ color: '#b07515' }}>
                  1 из 4 строк требует ручной проверки — <B>сечение кабеля не читается на фото</B>. Остальные 3 приняты автоматически.
                </span>
              </div>
            </div>
          )}

          {/* Step 4: Done */}
          {step === 3 && (
            <div style={{ background: '#e6faf5', borderRadius: 16, padding: '32px 36px', textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
              <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>4 устройства и 4 кабеля в протоколе</div>
              <div style={{ fontSize: 16, color: 'var(--text-secondary)', marginBottom: 24, lineHeight: 1.6 }}>
                Инженер проверил 1 поле вручную, остальные 27 — заполнены AI.<br />
                Секция обработана за 2 минуты вместо ~15.
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
                {[
                  { value: '93%', label: 'полей заполнено AI' },
                  { value: '1', label: 'ручная правка из 28' },
                  { value: '2 мин', label: 'вместо ~15' },
                ].map((m, i) => (
                  <div key={i}>
                    <div style={{ fontSize: 28, fontWeight: 800, color: '#1a8a6e' }}>{m.value}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
        {step > 0 && (
          <button
            onClick={() => setStep(s => s - 1)}
            style={{
              padding: '10px 24px', borderRadius: 10, border: '1px solid var(--border)',
              background: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 600,
              color: 'var(--text-secondary)', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = amber }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
          >
            Назад
          </button>
        )}
        {step < PIPELINE_STEPS.length - 1 && (
          <button
            onClick={() => setStep(s => s + 1)}
            style={{
              padding: '10px 24px', borderRadius: 10, border: 'none',
              background: amber, color: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 700,
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 6px 20px ${amber}44` }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
          >
            Далее
          </button>
        )}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════ */
/*           ARCHITECTURE DIAGRAM                       */
/* ═══════════════════════════════════════════════════ */

function ArchitectureDiagram() {
  const nodeStyle = (highlight = false): React.CSSProperties => ({
    background: highlight ? amber : '#fff',
    color: highlight ? '#fff' : 'var(--text)',
    border: `1.5px solid ${highlight ? amber : 'var(--border)'}`,
    borderRadius: 12,
    padding: '12px 20px',
    fontSize: 14,
    fontWeight: 700,
    textAlign: 'center',
    whiteSpace: 'nowrap',
  })

  const smallLabel: React.CSSProperties = {
    fontSize: 11,
    color: 'var(--text-muted)',
    fontWeight: 500,
    marginTop: 4,
  }

  return (
    <div style={{ overflowX: 'auto', marginTop: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, minWidth: 700, justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={nodeStyle()}>Фото</div>
          <div style={smallLabel}>JPG, 4032×3024</div>
        </div>
        <span style={{ color: 'var(--text-muted)', fontSize: 20 }}>→</span>
        <div style={{ textAlign: 'center' }}>
          <div style={nodeStyle(true)}>Supervisor</div>
          <div style={smallLabel}>Gemini 3.1 Pro</div>
        </div>
        <span style={{ color: 'var(--text-muted)', fontSize: 20 }}>→</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {['Devices Agent', 'Cables Agent', 'Defects Agent'].map(a => (
            <div key={a} style={{ textAlign: 'center' }}>
              <div style={{ ...nodeStyle(), fontSize: 12, padding: '8px 16px' }}>{a}</div>
            </div>
          ))}
          <div style={{ ...smallLabel, textAlign: 'center' }}>Gemini 3 Flash</div>
        </div>
        <span style={{ color: 'var(--text-muted)', fontSize: 20 }}>→</span>
        <div style={{ textAlign: 'center' }}>
          <div style={nodeStyle(true)}>Judge</div>
          <div style={smallLabel}>Gemini 3.1 Pro</div>
        </div>
        <span style={{ color: 'var(--text-muted)', fontSize: 20 }}>→</span>
        <div style={{ textAlign: 'center' }}>
          <div style={nodeStyle()}>Проверка</div>
          <div style={smallLabel}>Инженер</div>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: 8, fontSize: 12, color: 'var(--text-muted)' }}>
        ↻ retry с подсказкой, если confidence {'<'} 0.70 · неуверенные поля подсвечиваются для ручной проверки
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════ */
/*           MAIN PAGE                                   */
/* ═══════════════════════════════════════════════════ */

export function ElektroCasePage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const sectionsMeta = [
    { id: 'market', label: 'Рынок' },
    { id: 'task', label: 'Задача' },
    { id: 'process', label: 'Процесс' },
    { id: 'decisions', label: 'Решения' },
    { id: 'demo', label: 'Демо' },
    { id: 'arch', label: 'Архитектура' },
    { id: 'economics', label: 'Экономика' },
    { id: 'accuracy', label: 'Точность' },
    { id: 'failures', label: 'Не сработало' },
    { id: 'role', label: 'Моя роль' },
    { id: 'stack', label: 'Стек' },
    { id: 'status', label: 'Статус' },
  ]

  const tldrItems = [
    'Тысячи электролабораторий в России. 30-50% времени инженера — документирование, не экспертиза',
    'Фото щита → предзаполненный протокол по ГОСТ. Инженер проверяет 3 поля из 28, а не вводит все',
    'F1 70% — нормально для задачи с проверкой человеком. На критичных полях (id, номинал) — 84%+',
    'Прототип для реального заказчика (NDA). Расчётно ~25 часов на объект вместо 80 — нужно подтвердить в пилоте с UI',
  ]

  return (
    <CaseLayout caseId="elektro" sections={sectionsMeta} tldr={tldrItems} accentColor={amber} accentBg={amberBg}>

        {/* ═══ HERO ═══ */}
        <FadeUp>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 64, height: 64, borderRadius: 20,
            background: amberBg, color: amber, marginBottom: 24,
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: 2.5, color: amber, marginBottom: 12 }}>
            Электролаборатория (NDA)
          </div>
          <h1 style={{ fontSize: 44, fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', maxWidth: 700 }}>
            Фото электрощита →<br />готовый протокол
          </h1>
          <p style={{ fontSize: 22, color: 'var(--text-body)', lineHeight: 1.6, marginTop: 20, maxWidth: 640 }}>
            Инженер фотографирует 50-100 секций щитов на объекте. 1500 строк данных вводятся вручную — 80 часов.
            Я сделал прототип, который предзаполняет ~70% полей. Инженер проверяет и корректирует — вместо того, чтобы вводить с нуля.
          </p>
        </FadeUp>

        {/* ═══ KEY METRICS ═══ */}
        <FadeUp delay={0.1}>
          <div className="case-metrics-grid" style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
            borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
            marginTop: 48, padding: '40px 0',
          }}>
            {[
              { value: '~3×', label: 'быстрее ввода данных' },
              { value: '70%', label: 'F1-score (цель: 80%)' },
              { value: '$0.09', label: 'за фото (inference)' },
              { value: '~25 ч', label: 'вместо 80 на объект' },
            ].map((m, i) => (
              <div key={i} style={{ textAlign: 'center', borderLeft: i > 0 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: amber, letterSpacing: '-0.02em' }}>{m.value}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 6 }}>{m.label}</div>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* ═══ PHOTOS ═══ */}
        <FadeUp delay={0.15}>
          <div className="case-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 48 }}>
            <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border)' }}>
              <img src="/cases/elektro/room-overview.jpg" alt="Электрощитовая — общий вид" loading="lazy" style={{ width: '100%', display: 'block' }} />
            </div>
            <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border)' }}>
              <img src="/cases/elektro/panel-face.jpg" alt="Электрощит — панель с автоматами" loading="lazy" style={{ width: '100%', display: 'block' }} />
            </div>
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center', marginTop: 12 }}>
            Электрощитовая гипермаркета: 70+ фотографий, 1500+ строк данных на объект
          </p>
        </FadeUp>

        {/* ═══ MARKET ═══ */}
        <FadeUp>
          <S id="market" label="Рынок">
            <P>
              Электроиспытательные лаборатории (ЭТЛ) — тысячи по России. Только в одном территориальном управлении Ростехнадзора — 1200+ записей в реестре. Каждая лаборатория обслуживает десятки объектов в год: от офисов (от 6 000 руб.) до торговых центров (от 25 000 руб.).
            </P>
            <P>
              Главная ценность для заказчика — не измерения, а <B>протокол</B>. Документ по ГОСТ Р 50571 и ПТЭЭП, который примет Ростехнадзор, страховая, управляющая компания. На создание этого документа уходит <B>30-50% рабочего времени</B> инженера — ручной ввод данных с фотографий в Excel.
            </P>
            <P>
              Софтверные конкуренты: «Электролаб Индустрия» делает ПО для протоколов, но без AI — ввод данных остаётся ручным. Зрелых решений с AI-предзаполнением именно под этот workflow я не нашёл.
            </P>
          </S>
        </FadeUp>

        {/* ═══ DISCOVERY ═══ */}
        <FadeUp>
          <S id="task" label="Как я понял задачу">
            <P>
              Начал с того, что <B>изучил реальные данные</B>: получил от заказчика 70 фотографий электрощитовой гипермаркета
              и готовый протокол — Excel на 1500+ строк. Сопоставил фото с протоколом вручную, чтобы понять:
              что именно инженер «видит» на фото и что записывает в таблицу.
            </P>
            <P>
              Стало понятно: <B>проблема не в сложности, а в объёме</B>. Каждое фото содержит 3–8 устройств.
              Для каждого нужно записать 7 полей (тип, номинал, модель, circuit_id, марку кабеля, сечение, жилы).
              Это не аналитика — это data entry. Инженер тратит на это рабочий день,
              хотя мог бы заниматься экспертизой и выявлением дефектов.
            </P>
            <div style={{
              borderLeft: `3px solid ${amber}`, paddingLeft: 20, marginTop: 24,
              fontSize: 17, color: 'var(--text-body)', lineHeight: 1.7, fontStyle: 'italic',
            }}>
              «Нам не нужна идеальная точность — нам нужно, чтобы 80% данных были заполнены правильно,
              а остальное инженер поправит за 5 минут вместо часа.»
              <div style={{ fontStyle: 'normal', fontSize: 14, color: 'var(--text-muted)', marginTop: 8 }}>
                — заказчик
              </div>
            </div>
          </S>
        </FadeUp>

        {/* ═══ WORKFLOW ═══ */}
        <FadeUp>
          <S id="process" label="Рабочий процесс инженера">
            <P>
              Чтобы понять, где система встраивается, я разложил рабочий день инженера:
            </P>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: 24 }}>
              {[
                { time: 'На объекте', icon: '📷', title: 'Фотографирует секции щитов', desc: '50–100 фото за выезд. Открывает дверцу, фотографирует каждую секцию с маркировками и кабелями.', highlight: false },
                { time: 'В офисе (сейчас)', icon: '📋', title: 'Вручную вбивает данные в протокол', desc: '1500+ строк в Excel. Открывает фото, разбирает маркировки, записывает тип/номинал/модель/кабель. 40–80 часов.', highlight: false },
                { time: 'В офисе (с AI)', icon: '⚡', title: 'AI предзаполняет, инженер проверяет', desc: 'Загружает фото → система заполняет ~70% полей → инженер проверяет подсвеченные неуверенные поля → корректирует. ~25 часов.', highlight: true },
                { time: 'Результат', icon: '✓', title: 'Протокол готов, данные в платформе', desc: 'Экспорт в платформу заказчика. Инженер потратил время на экспертизу (дефекты, несоответствия), а не на data entry.', highlight: false },
              ].map((step, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 20, padding: '20px 24px',
                  background: step.highlight ? amberBg : 'transparent',
                  borderRadius: step.highlight ? 12 : 0,
                  borderLeft: step.highlight ? `3px solid ${amber}` : '3px solid var(--border)',
                  marginLeft: 20,
                }}>
                  <div style={{ fontSize: 24, flexShrink: 0, marginTop: 2 }}>{step.icon}</div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: step.highlight ? amber : 'var(--text-muted)', textTransform: 'uppercase' as const, letterSpacing: 1, marginBottom: 4 }}>{step.time}</div>
                    <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>{step.title}</div>
                    <div style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </S>
        </FadeUp>

        {/* ═══ PRODUCT DECISIONS ═══ */}
        <FadeUp>
          <S id="decisions" label="Продуктовые решения">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginTop: 8 }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: 'var(--text)' }}>Приоритизация полей</div>
                <div style={{ fontSize: 17, color: 'var(--text-body)', lineHeight: 1.7, maxWidth: 680 }}>Проанализировал протокол заказчика: circuit_id и rating_a — критичны для отчёта, без них строка бесполезна. device_type и cable_mark — важны, но ошибка менее критична. section_mm2 — nice-to-have: модель читает его хуже всего (F1 0.43), а инженер обычно знает сечение по номиналу. Приоритизировал по ценности для конечного протокола, а не по технической сложности.</div>
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: 'var(--text)' }}>Неуверенные поля</div>
                <div style={{ fontSize: 17, color: 'var(--text-body)', lineHeight: 1.7, maxWidth: 680 }}>Два варианта: вписать best guess или оставить пустым. Выбрал «пустое поле с подсветкой» — инженер видит, что нужно заполнить вручную, и не тратит время на проверку уже правильных значений. Ложноположительный результат (неправильное значение без подсветки) опаснее пустого поля.</div>
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: 'var(--text)' }}>Проверка человеком — основа, а не дополнение</div>
                <div style={{ fontSize: 17, color: 'var(--text-body)', lineHeight: 1.7, maxWidth: 680 }}>При текущем качестве модели инженер всё равно проверяет результат — но не весь протокол целиком. Внимание можно сосредоточить на неуверенных и слабых полях. Система без UI проверки — notebook, не продукт. Ключевое: показать инженеру только то, что требует внимания.</div>
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: 'var(--text)' }}>Формат выдачи</div>
                <div style={{ fontSize: 17, color: 'var(--text-body)', lineHeight: 1.7, maxWidth: 680 }}>Инженеры уже работают в Excel/платформе. Дать им «ещё один инструмент» — значит добавить шаг в процесс, а не убрать. Формат выдачи — таблица, совместимая с существующим протоколом. AI встраивается в процесс, а не создаёт новый.</div>
              </div>
            </div>
          </S>
        </FadeUp>

        {/* ═══ INTERACTIVE DEMO ═══ */}
        <FadeUp>
          <S id="demo" label="Как это выглядит для инженера">
            <P>
              Пошаговая демонстрация на реальной фотографии из электрощитовой гипермаркета.
            </P>
            <UserFlowDemo />
          </S>
        </FadeUp>

        {/* ═══ ARCHITECTURE ═══ */}
        <FadeUp>
          <S id="arch" label="Архитектура под капотом">
            <P>
              <B>Конвейер агентов</B>: не один большой промпт, а несколько специализированных агентов.
              Каждый агент отвечает за свой тип данных и может быть настроен и ретрайнут независимо.
            </P>
            <ArchitectureDiagram />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginTop: 40 }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: 'var(--text)' }}>Несколько агентов vs один промпт</div>
                <div style={{ fontSize: 17, color: 'var(--text-body)', lineHeight: 1.7, maxWidth: 680 }}>Один промпт на 15+ устройств теряет фокус — JSON-parsing ошибки растут экспоненциально. Разделение позволяет ретраить только сломанную часть, не пересчитывая весь результат.</div>
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: 'var(--text)' }}>Выбор модели</div>
                <div style={{ fontSize: 17, color: 'var(--text-body)', lineHeight: 1.7, maxWidth: 680 }}>Нативный multimodal (фото на вход, не base64-хак), стоимость Flash — $0.01/фото. Pro для supervisor и judge, Flash для рабочих агентов. Ретрай агента стоит копейки.</div>
              </div>
            </div>
          </S>
        </FadeUp>

        {/* ═══ ECONOMICS ═══ */}
        <FadeUp>
          <S id="economics" label="Экономика с учётом точности">
            <P>
              Общий F1 70% сам по себе мало что говорит. Для заказчика важнее другое: на критичных полях — circuit_id и rating_a — модель даёт <B>84%+</B>, а слабые поля (сечение кабеля — F1 0.43) мы сознательно перевели в режим "подсветить и отдать инженеру". Главное — не абсолютная точность, а сколько времени экономит инженер:
            </P>
            <div className="case-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 24 }}>
              <div style={{ background: '#f7f7f5', borderRadius: 12, padding: '24px 28px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' as const, letterSpacing: 1, marginBottom: 16 }}>Сейчас (вручную)</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>~80 ч</div>
                <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 8, lineHeight: 1.6 }}>
                  70 фото × ~15 мин/фото<br />
                  100% ручной ввод
                </div>
              </div>
              <div style={{ background: amberBg, borderRadius: 12, padding: '24px 28px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: amber, textTransform: 'uppercase' as const, letterSpacing: 1, marginBottom: 16 }}>С AI + проверка</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: amber, letterSpacing: '-0.02em' }}>~25 ч</div>
                <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 8, lineHeight: 1.6 }}>
                  AI заполняет ~70% полей<br />
                  Инженер проверяет + корректирует 30%
                </div>
              </div>
            </div>
            <div style={{ marginTop: 20, padding: '16px 20px', background: '#f7f7f5', borderRadius: 10, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              <B>Стоимость inference:</B> $0.09/фото × 70 фото = <B>~$6</B> за объект.
              При средней ставке инженера ~600 руб./час и расчётной экономии ~55 часов — это ~33 000 руб. на объект при стоимости AI ~500 руб. При текущих допущениях экономика выглядит положительной, но это нужно подтвердить на пилоте: с реальным UI, реальными правками инженеров и серией объектов.
              Бизнес-модель ещё не определена (SaaS vs проектная интеграция), но unit economics позволяет оба варианта.
            </div>
          </S>
        </FadeUp>

        {/* ═══ RESULTS ═══ */}
        <FadeUp>
          <S id="accuracy" label="Точность по полям">
            <P>
              Тестирование на <B>10 фотографиях с ручной разметкой</B>. Метрика — Micro-F1.
              Приоритет полей для заказчика выделен.
            </P>
            <div style={{ overflowX: 'auto', marginTop: 24 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)' }}>
                    {['Поле', 'F1-score', 'Приоритет'].map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '10px 16px', fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' as const, letterSpacing: 1 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { field: 'breaker_type (A/B/C/D)', f1: 0.932, priority: 'Средний' },
                    { field: 'circuit_id', f1: 0.844, priority: 'Критичный' },
                    { field: 'rating_a (номинал)', f1: 0.840, priority: 'Критичный' },
                    { field: 'device_type', f1: 0.829, priority: 'Высокий' },
                    { field: 'cable circuit_id', f1: 0.842, priority: 'Критичный' },
                    { field: 'has_terminals', f1: 0.616, priority: 'Низкий' },
                    { field: 'section_mm2', f1: 0.432, priority: 'Низкий' },
                    { field: 'cores', f1: 0.408, priority: 'Низкий' },
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '10px 16px', fontWeight: 600 }}>{row.field}</td>
                      <td style={{ padding: '10px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 80, height: 6, borderRadius: 3, background: '#eee', overflow: 'hidden' }}>
                            <div style={{ width: `${row.f1 * 100}%`, height: '100%', borderRadius: 3, background: row.f1 >= 0.8 ? '#45c55e' : row.f1 >= 0.6 ? amber : '#E05252' }} />
                          </div>
                          <span style={{ fontWeight: 700, color: row.f1 >= 0.8 ? '#45c55e' : row.f1 >= 0.6 ? amber : '#E05252' }}>
                            {(row.f1 * 100).toFixed(1)}%
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '10px 16px' }}>
                        <span style={{
                          fontSize: 12, fontWeight: 600, padding: '2px 10px', borderRadius: 6,
                          background: row.priority === 'Критичный' ? '#fff0ee' : row.priority === 'Высокий' ? amberBg : '#f7f7f5',
                          color: row.priority === 'Критичный' ? '#b33a3a' : row.priority === 'Высокий' ? '#b07515' : 'var(--text-muted)',
                        }}>{row.priority}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <P>
              Ключевой вывод: <B>критичные поля (circuit_id, rating_a) — точность 84%+</B>.
              Слабые поля (section_mm2, cores) — низкий приоритет для протокола, инженер обычно знает их и так.
            </P>
          </S>
        </FadeUp>

        {/* ═══ WHAT DIDNT WORK ═══ */}
        <FadeUp>
          <S id="failures" label="Что не сработало">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 8 }}>
              {[
                {
                  title: 'Детекция дефектов — 100% ложных срабатываний',
                  desc: 'Модель «видит» дефекты там, где их нет — нет размеченных данных для калибровки. Решение: исключить из автоматического заполнения. Дефекты — задача для инженера, а не для AI на текущем уровне точности.',
                },
                {
                  title: 'Сечение кабелей (F1: 0.43) — переоценил возможности модели',
                  desc: 'Маркировка на кабелях мелкая, часто затёртая. Продуктовый вывод: для этого поля AI не помощник. Переключился на стратегию «пустое поле + подсказка из каталога», вместо неправильного значения.',
                },
                {
                  title: 'JSON-parsing на больших щитах (>15 устройств)',
                  desc: 'Gemini генерирует невалидный JSON ~10% случаев на длинных выходах. Подключил json-repair, но это костыль. Фундаментальное решение — разбивать большие щиты на секции, что совпадает с тем, как инженеры фотографируют.',
                },
              ].map((item, i) => (
                <div key={i} style={{ borderLeft: `3px solid ${amber}`, paddingLeft: 20 }}>
                  <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{item.title}</div>
                  <div style={{ fontSize: 16, color: 'var(--text-body)', lineHeight: 1.7 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </S>
        </FadeUp>

        {/* ═══ MY ROLE ═══ */}
        <FadeUp>
          <S id="role" label="Моя роль">
            <P>
              Заказная разработка для электролаборатории (заказчик под NDA). Задача пришла от реального бизнеса — не pet-проект, а конкретный клиент с конкретной болью.
            </P>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: 16 }}>
              {[
                'Изучил процесс заказчика: сопоставил фото с протоколом, определил приоритет полей',
                'Определил формат выдачи: предзаполненная таблица с подсветкой неуверенных полей',
                'Спроектировал архитектуру: supervisor раздаёт задачи агентам, judge проверяет результат',
                'Реализовал pipeline: агенты, промпты, оценка качества, постобработка',
                'Разработал систему метрик (3 режима F1) и ground truth разметку',
                'Рассчитал экономику: стоимость inference, время с учётом ручных правок, ROI',
              ].map((item, i) => (
                <li key={i} style={{ marginBottom: 12, display: 'flex', gap: 12, fontSize: 18, lineHeight: 1.7, color: 'var(--text-body)' }}>
                  <span style={{ color: amber, fontWeight: 700, flexShrink: 0 }}>→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </S>
        </FadeUp>

        {/* ═══ TECH STACK ═══ */}
        <FadeUp>
          <S id="stack" label="Стек">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
              {[
                'Python 3.11', 'LangGraph', 'Pydantic v2', 'Gemini 3.1 Pro',
                'Gemini 3 Flash', 'OpenRouter', 'FastAPI', 'Docker',
                'Pillow', 'pytest',
              ].map(t => (
                <span key={t} style={{
                  background: amberBg, color: '#b07515',
                  padding: '6px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600,
                }}>{t}</span>
              ))}
            </div>
          </S>
        </FadeUp>

        {/* ═══ STATUS ═══ */}
        <FadeUp>
          <S id="status" label="Статус и что дальше">
            <P>
              <B>Рабочий прототип</B>: полный pipeline от фото до структурированного JSON.
              Протестировано на реальных данных. Для продакшена нужно: UI проверки для инженера
              и интеграция с платформой заказчика.
            </P>
            <div className="case-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 24 }}>
              <div style={{ background: '#e6faf5', borderRadius: 12, padding: '20px 24px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1a8a6e', textTransform: 'uppercase' as const, letterSpacing: 1, marginBottom: 12 }}>Готово</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14, color: 'var(--text-body)', lineHeight: 1.8 }}>
                  {[
                    'Конвейер агентов',
                    'Оценка качества (3 режима F1)',
                    'Приоритизация полей по ценности',
                    'Экономика и ROI-расчёт',
                    'CLI + Docker + 47 тестов',
                  ].map(item => (
                    <li key={item}>✓ {item}</li>
                  ))}
                </ul>
              </div>
              <div style={{ background: amberBg, borderRadius: 12, padding: '20px 24px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#b07515', textTransform: 'uppercase' as const, letterSpacing: 1, marginBottom: 12 }}>Для продакшена</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14, color: 'var(--text-body)', lineHeight: 1.8 }}>
                  {[
                    'UI проверки (ядро продукта)',
                    'Интеграция с платформой заказчика',
                    'F1 → 0.80 на критичных полях',
                    'Пилот на 5 объектах',
                    'Определение бизнес-модели',
                  ].map(item => (
                    <li key={item}>○ {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </S>
        </FadeUp>

    </CaseLayout>
  )
}
