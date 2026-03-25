import { useEffect } from 'react'
import { CaseLayout, CaseSection } from './CaseLayout'
import { FadeUp, P, B } from './shared'

const blue = '#4F9CF5'
const blueBg = '#eef5ff'

function Phone({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 28, padding: 6, boxShadow: '0 4px 16px rgba(0,0,0,0.06), 0 12px 40px rgba(0,0,0,0.08)', border: '1px solid #eee', maxWidth: 240, margin: '0 auto', transition: 'all 0.35s cubic-bezier(0.25,0.1,0.25,1)' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06), 0 20px 56px rgba(0,0,0,0.1)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06), 0 12px 40px rgba(0,0,0,0.08)' }}>
        <img src={src} alt={alt} loading="lazy" style={{ width: '100%', borderRadius: 22, display: 'block' }} />
      </div>
      {caption && <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 12 }}>{caption}</p>}
    </div>
  )
}

const S = ({ id, label, children }: { id: string; label: string; children: React.ReactNode }) =>
  <CaseSection id={id} label={label} accentColor={blue}>{children}</CaseSection>

const sections = [
  { id: 'market', label: 'Рынок' },
  { id: 'navigator', label: 'Навигатор' },
  { id: 'latency', label: 'Латентность' },
  { id: 'architecture', label: 'Архитектура' },
  { id: 'quality', label: 'Качество' },
  { id: 'pmf', label: 'Поиск PMF' },
  { id: 'failures', label: 'Не сработало' },
  { id: 'role', label: 'Моя роль' },
  { id: 'takeaways', label: 'Выводы' },
]

const tldr = [
  'Рынок: 238 млн водителей в США, 60 мин/день за рулём. In-car voice — $2.8-3.7B, растёт ~14%/год',
  'Снизил латентность 11с → 1.5с: ушли с LiveKit на WebSocket. Встроили свой навигатор (Mapbox)',
  'Сегментация: 10+ аудиторий, 9 Custom Product Pages. CPI $2.6-4, лучшие — New Drivers и Travel',
  'PMF не найден. Конверсия в подписку $19.99/мес минимальна. Voice-first retention исторически ~3-6%',
  'Главный урок: лендинги показывали интерес, но в продукте не было aha moment — пользователь не успевал понять ценность за 3 дня триала',
]

export function AiCasePage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <CaseLayout caseId="ai" sections={sections} tldr={tldr} accentColor={blue} accentBg={blueBg}>

      {/* ═══ Hero ═══ */}
      <FadeUp>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
          <div style={{ width: 52, height: 52, background: blueBg, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: blue }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: 2, color: blue }}>Рэй · ray.app · US-рынок</span>
        </div>
        <h1 style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.15, marginBottom: 24 }}>
          Голосовой AI-ассистент<br />для водителей
        </h1>
        <p style={{ fontSize: 22, color: 'var(--text-body)', lineHeight: 1.65, maxWidth: 680 }}>
          За 14 месяцев запустил AI-направление внутри компании: определил стратегию, построил продукт с командой из 7 человек и довёл до стадии поиска product-market fit.
        </p>
      </FadeUp>

      {/* ═══ Metrics ═══ */}
      <FadeUp delay={0.1}>
        <div className="case-metrics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '40px 0', marginTop: 48, marginBottom: -48 }}>
          {[
            { value: '1.5с', label: 'латентность (было 11с)' },
            { value: '92%', label: 'точность — eval на 500 сценариях, LLM-as-Judge (было ~65%)' },
            { value: '3 дня', label: 'релизный цикл (было 2 нед)' },
            { value: '−40%', label: 'расходы на AI-инфру' },
          ].map((m, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '0 16px', borderLeft: i > 0 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: blue, letterSpacing: '-0.02em' }}>{m.value}</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 6 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </FadeUp>

      {/* ═══ Sections ═══ */}
      <FadeUp><S id="market" label="Рынок и возможность">
        <P><B>238 млн водителей</B> в США (FHWA, 2023). Каждый проводит за рулём в среднем <B>60 минут в день</B> (AAA, 2024) — 7 часов в неделю. CarPlay/Android Auto уже у 40% водителей (Edison, 2025), из них 83% пользуются активно. Это огромное окно внимания, в котором текущие ассистенты работают плохо.</P>
        <P><B>Конкуренты:</B> Siri (CarPlay), Google Assistant (Android Auto), Alexa Auto, Cerence (525 млн авто с их voice tech). Все оптимизированы под короткие "вопрос-ответ" задачи — мультишаговые сценарии (построить маршрут с остановками, добавить событие в календарь и включить музыку) ломаются. Blue — стартап с физическим USB-устройством, подход "управляем приложениями на телефоне без интеграций". Мы — <B>только софт, через телефон</B>.</P>
        <P><B>Бизнес-модель:</B> подписка $19.99/мес или $199.99/год (по цене 10 месяцев). Ценник на уровне ChatGPT Plus / Claude Pro — рынок сошёлся на ~$20 для premium AI. По данным RevenueCat, годовые планы удерживают подписчиков значительно лучше месячных (до 36% через год vs 6.7%). Рынок in-car voice — $2.8-3.7B (2024), CAGR ~14%. Voice-first retention исторически — 3-6% вторая неделя (VoiceLabs). Проверяли на 10+ сегментах.</P>
      </S></FadeUp>

      <FadeUp><S id="navigator" label="Ключевое решение: свой навигатор">
        <P>Первый прототип открывал Apple Maps. Проблема: <B>iOS забирает голос у нашего приложения</B>. Пользователь говорит "построй маршрут" — мы открываем Apple Maps — и всё, мы больше не слышим водителя. Ценность продукта обнуляется.</P>
        <P>Были альтернативы: deeplinks, PiP-режим, фоновый аудио. Ни одна не решала полностью. Решение — встроить свой навигатор на Mapbox. Дорого, но сохраняет core value.</P>
      </S></FadeUp>

      <FadeUp delay={0.1}>
        <div className="case-phones-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 40 }}>
          <Phone src="/cases/ai/route-simple.png" alt="Маршрут" caption="Голосовая команда → маршрут" />
          <Phone src="/cases/ai/route-with-stop.png" alt="С заправкой" caption="«Add gas station on the way»" />
          <Phone src="/cases/ai/navigation-live.png" alt="Навигация" caption="Навигация + голос одновременно" />
        </div>
      </FadeUp>

      <FadeUp><S id="latency" label="Латентность: от 11 секунд до 1.5">
        <P>Начинали на LiveKit. Среднее время до первого ответа: <B>11 секунд</B>. С пиками выше. Для живого диалога за рулём — неприемлемо.</P>
        <P>Команда привыкла к LiveKit, и у перехода были реальные риски. Я подготовил сравнение платформ и провёл proof-of-concept на WebSocket, чтобы снизить неопределённость. После этого инженеры реализовали production-решение. Задержка упала до 1.5 секунды — теперь упираемся в скорость самих LLM, а не в нашу инфраструктуру.</P>
      </S></FadeUp>

      <FadeUp><S id="architecture" label="Архитектура: от одного промта к агентам">
        <P>Продукт начинался с одного промта: <em>"Ты голосовой ассистент, помоги водителю"</em>. STT → промт → TTS. Работало для демо, но в проде JSON-ошибки росли с количеством функций, а каждый промт-фикс ломал что-то другое. Перешли на агентную архитектуру — отдельные агенты на навигацию, музыку, календарь, small talk.</P>
        <P>Минус: сложнее дебажить (цепочка из 3-4 агентов вместо одного промта), зато каждый агент можно фиксить и деплоить независимо. Это дало <B>−40% расходов на инфру</B>: маленькие специализированные агенты дешевле одного большого промта. Контекст и долгосрочная память — через ZEP.</P>
      </S></FadeUp>

      <FadeUp delay={0.1}>
        <div className="case-phones-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 40 }}>
          <Phone src="/cases/ai/home-screen.png" alt="Главный экран" caption="Главный экран — «Tap to talk»" />
          <Phone src="/cases/ai/predict-home.png" alt="Предикт" caption="«Let's head home» — автоматически" />
          <Phone src="/cases/ai/save-place.png" alt="Сохранение" caption="Сохранённые места голосом" />
        </div>
      </FadeUp>

      <FadeUp><S id="quality" label="Качество: от Google Sheets до LangFuse">
        <P>Начинал с того, что сам прогонял сценарии и записывал в Google Sheets. Потом перевёл на <B>LangFuse</B> — датасеты, трейсы, регрессионное тестирование перед каждым релизом. Релизный цикл: <B>2 недели → 3 дня</B>.</P>
        <P>Для оценки качества ответов используем LLM-as-Judge — 5 моделей оценивают каждый ответ по рубрике. Это не ground truth: исследования показывают, что LLM-судьи согласуются с людьми на ~80% в pairwise ranking (MT-Bench) и значительно ниже в абсолютных оценках (Spearman ~0.5, G-Eval). У нас это <B>инструмент раннего обнаружения регрессий</B>, а не замена ручной проверки.</P>
      </S></FadeUp>

      <FadeUp><S id="pmf" label="Поиск PMF: 10+ сегментов">
        <P>Протестировали более 10 сегментов. 9 Custom Product Pages в App Store — по одной под каждый сегмент. CPI от $2.6 до $4 (для контекста: finance apps в North America — ~$7, e-commerce — ~$3, по данным Adjust 2024). Конверсия с дженерал-страницы — 0.3%, с кастомных — <B>до 2.6%</B>.</P>
        <P>Лучшие по CR: <B>New Drivers</B> и <B>Travel</B>. Приоритизировали фичи под их JTBD: для новичков — голосовой онбординг, для путешественников — POI рекомендации и мультистоп.</P>
      </S></FadeUp>

      <FadeUp><S id="failures" label="Что не сработало">
        <P><B>Сегмент "родители с детьми".</B> Аудитория не привыкла платить за AI-продукты, низкая конверсия в подписку.</P>
        <P><B>Гипотеза про мультизадачность.</B> Подтвердилась на уровне неудобства, но интенсивность проблемы оказалась недостаточной — люди признавали проблему, но не были готовы платить за решение.</P>
        <P><B>Voice-first — системная проблема.</B> Это не только наша боль. Средний retention второй недели для голосовых приложений — 3-6% (VoiceLabs). Rabbit R1, Humane AI Pin — аналогичные провалы. Голос работает как entry point в конкретных контекстах (руки заняты, за рулём), но не как единственный интерфейс для всего. Мы это поняли поздно: нужен multi-modal продукт, а не voice-only.</P>
        <P><B>PMF пока не найден.</B> Люди оформляют триал, но не конвертируются в paid. Лендинги давали хороший CPI — но сигнал оказался ложноположительным: "оставил контакт" не равно "будет платить". В продукте aha moment не наступал до того, как встроили свой навигатор. Сейчас ассистент работает непрерывно — влияние на конверсию ещё предстоит замерить.</P>
      </S></FadeUp>

      <FadeUp><S id="role" label="Моя роль">
        <P>В команде закрывал стык между продуктовой стратегией и технической реализацией — от приоритизации бэклога до разбора трейсов в LangFuse.</P>
        <ul style={{ fontSize: 19, lineHeight: 1.85, paddingLeft: 0, listStyle: 'none', color: 'var(--text-body)', maxWidth: 700, marginTop: 20 }}>
          {['Работал с командой из 7 человек — закрывал стык продукта и технологий','Определил архитектуру: STT → агенты → TTS, переход с LiveKit на WebSocket','Внедрил систему оценки качества (Google Sheets → LangFuse)','Провёл сегментацию рынка: 10+ аудиторий, 9 Custom Store Pages','Принимал решения на стыке продукта и технологий'].map((a, i) => (
            <li key={i} style={{ display: 'flex', gap: 16, marginBottom: 12 }}><span style={{ color: blue, fontWeight: 700, flexShrink: 0, fontSize: 22, lineHeight: '35px' }}>→</span><span>{a}</span></li>
          ))}
        </ul>
      </S></FadeUp>

      <FadeUp><S id="takeaways" label="Что я вынес">
        <P>В ноябре 2025 на демо инвестору ассистент отлично отработал: маршрут, заправка голосом, музыка — без единого бага. Инвестор впечатлился. Потом запросил цифры по конверсии. Люди оформляли триал, пробовали 3-7 дней — и отвязывали карту.</P>
        <P>При этом мы не сидели без валидации. Параллельно с разработкой запустили 7 лендингов под разные сегменты. CPI был хороший, люди нажимали "купить" — но это был сбор лидов, а не реальный purchase intent. Когда звали на интервью — никто не приходил. Сигнал с лендингов казался положительным, но в продукте всё ломалось.</P>
        <P>Причину мы понимали: без своего навигатора пользователь говорил "построй маршрут" — открывалась Apple Maps — ассистент замолкал. За 3 дня триала человек не успевал понять, зачем продукт нужен. Не было aha moment. Но встроить свой навигатор — страшное решение: у каждого водителя уже есть привычный навигатор, и заставить его пересесть на наш — это не техническая задача, а продуктовая. Мы по сути говорили бы "наш навигатор лучше" — а это не то, за чем к нам приходили. Когда всё-таки решились и встроили Mapbox — ассистент стал работать непрерывно. Как это повлияет на конверсию в paid — ещё предстоит проверить в проде.</P>
      </S></FadeUp>

    </CaseLayout>
  )
}
