import { useEffect } from 'react'
import { CaseLayout, CaseSection } from './CaseLayout'
import { FadeUp, P, B } from './shared'

const orange = '#FF8C42'
const orangeBg = '#fff3ea'

function Slide({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.06), 0 12px 40px rgba(0,0,0,0.08)', border: '1px solid #eee', transition: 'all 0.35s cubic-bezier(0.25,0.1,0.25,1)' }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06), 0 20px 56px rgba(0,0,0,0.1)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06), 0 12px 40px rgba(0,0,0,0.08)' }}>
      <img src={src} alt={alt} loading="lazy" style={{ width: '100%', display: 'block' }} />
    </div>
  )
}

const S = ({ id, label, children }: { id: string; label: string; children: React.ReactNode }) =>
  <CaseSection id={id} label={label} accentColor={orange}>{children}</CaseSection>

export function MobileCasePage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const sections = [
    { id: 'context', label: 'Контекст' },
    { id: 'payment', label: 'Платёжный флоу' },
    { id: 'redesign', label: 'Редизайн' },
    { id: 'stories', label: 'Stories' },
    { id: 'loyalty', label: 'Лояльность' },
    { id: 'decisions', label: 'Решения' },
    { id: 'team', label: 'Команда' },
    { id: 'takeaways', label: 'Выводы' },
  ]

  const tldr = [
    'Рынок: 47.5 млн авто, 255+ млн штрафов/год на 176 млрд руб. 93% — камеры. Кто уведомил первым — получает оплату',
    'Конверсия в оплату +18% — нашёл баг в платёжном флоу провайдера + открыл оплату с мобильного баланса',
    'Stories → Retention 7d +12%. Пользователи стали заходить не только когда штраф',
    'Программа лояльности не взлетела → вовремя остановились, перенаправили ресурсы на воронку',
    'Команда 8 человек на весь продукт. Конкуренты: Госуслуги Авто, bip.ru (26 млн), банки',
  ]

  return (
    <CaseLayout caseId="mobile" sections={sections} tldr={tldr} accentColor={orange} accentBg={orangeBg}>

        {/* ═══ Hero ═══ */}
        <FadeUp>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
            <div style={{ width: 52, height: 52, background: orangeBg, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: orange }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><line x1="12" x2="12.01" y1="18" y2="18"/></svg>
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: 2, color: orange }}>Рэй · Штрафы ПДД · 1.5 года</span>
          </div>
          <h1 style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.15, marginBottom: 24 }}>
            Мобильный продукт<br />для водителей, 700k MAU
          </h1>
          <p style={{ fontSize: 22, color: 'var(--text-body)', lineHeight: 1.65, maxWidth: 680 }}>
            Зрелый B2C-продукт (с 2009 года) для проверки и оплаты штрафов ГИБДД.
            Высококонкурентная ниша — Госуслуги Авто + несколько специализированных приложений. Управлял продуктом и командой из 8 человек.
          </p>
        </FadeUp>

        {/* ═══ Metrics strip ═══ */}
        <FadeUp delay={0.1}>
          <div className="case-metrics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '40px 0', marginTop: 48 }}>
            {[
              { value: '+18%', label: 'конверсия в оплату' },
              { value: '+17 п.п.', label: 'NPS после редизайна' },
              { value: '+12%', label: 'retention 7d' },
            ].map((m, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '0 16px', borderLeft: i > 0 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: orange, letterSpacing: '-0.02em' }}>{m.value}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 6 }}>{m.label}</div>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* ═══ Product overview ═══ */}
        <FadeUp delay={0.15}>
          <div className="case-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 48 }}>
            <Slide src="/cases/mobile/main-screen.png" alt="Главный экран — Мои штрафы" />
            <Slide src="/cases/mobile/fine-payment.png" alt="Оплата штрафа" />
          </div>
        </FadeUp>

        {/* ═══ Context ═══ */}
        <FadeUp>
          <S id="context" label="Контекст и задача">
            <P>
              <B>Рынок:</B> 47.5 млн легковых авто в РФ. В 2024 году выписано <B>255+ млн штрафов</B> на 176 млрд руб. (93% — камеры). Средний штраф ~640-960 руб., ~5 штрафов на авто в год. С 2025 скидка за быструю оплату снизилась с 50% до 25% — но окно стало длиннее.
            </P>
            <P>
              Приложение — "аптечка для водителей": проверка и оплата штрафов через ГИС-ГМП, страхование (ОСАГО/КАСКО), справочник ПДД. Основной доход — комиссия за оплату.
            </P>
            <P>
              <B>Конкуренты:</B> Госуслуги Авто (госприложение), bip.ru (26 млн пользователей), RosShtrafy (10+ млн), банковские приложения ("оплата без комиссии" — давит на маржу). Наше преимущество: <B>скорость обнаружения</B> (пуш приходит раньше, чем письмо) и экосистема (штрафы + страховки + ПДД в одном месте). Данные bip.ru: 86% штрафов оплачиваются в первые 20 дней — кто уведомил первым, тот и получает оплату.
            </P>
            <P>
              Задача: <B>поддерживать и растить доходность</B> при минимальных ресурсах.
              Не стартап — зрелый продукт, который нужно оптимизировать, не ломая.
              8 человек закрывали полный цикл: разработка, дизайн, поддержка, аналитика.
            </P>
          </S>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="case-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 40 }}>
            <Slide src="/cases/mobile/about.png" alt="О приложении" />
            <Slide src="/cases/mobile/insurance.png" alt="Страхование" />
          </div>
        </FadeUp>

        {/* ═══ Payment flow — the main business story ═══ */}
        <FadeUp>
          <S id="payment" label="Платёжный флоу: +18% конверсия в оплату">
            <P>
              Конверсия в оплату штрафа — ключевая бизнес-метрика и основа unit-экономики продукта. В нише, где конкурируют Госуслуги, банки и несколько приложений с десятками миллионов пользователей, каждый процентный пункт конверсии — прямой рост выручки.
            </P>
            <P>
              <B>Проблема:</B> между обнаружением штрафа и оплатой было слишком много экранов.
              Пользователь терялся в партнёрских шагах, на которые мы напрямую не влияли.
            </P>
            <P>
              <B>Что сделал:</B> Провёл серию CustDev — выявил конкретные точки отвала.
              Главный инсайт: пользователи не понимали, что промежуточный экран подтверждения — это ещё не оплата,
              и закрывали приложение, думая что уже оплатили.
              Проблема: платёжный провайдер (Монета) навязывает обязательные экраны в воркфлоу — нельзя просто убрать.
              Нашёл способ оптимизировать интеграцию — инженеры реализовали, убрали лишние промежуточные шаги.
            </P>
            <P>
              Отдельная находка с CustDev: обнаружили сегмент пользователей, которые принципиально не пользуются банковскими картами.
              Внедрили для них <B>оплату с мобильного баланса</B> — это открыло доступ к аудитории, которую мы раньше теряли.
            </P>
            <P>
              <B>Результат: конверсия выросла на 18%.</B> При 700k MAU и среднем чеке штрафа это
              прямой рост выручки без привлечения новых пользователей.
            </P>
          </S>
        </FadeUp>

        {/* ═══ Redesign + NPS ═══ */}
        <FadeUp>
          <S id="redesign" label="Редизайн интерфейса: NPS +17 п.п.">
            <P>
              Провели глубинные интервью совместно с продуктовым дизайнером — 10 интервью по часу. Плюс данные из поддержки. Выяснилось: пользователи путали наше приложение с конкурентами — не осознавали, в каком именно они находятся. Интерфейс не создавал идентичности.
            </P>
            <P>
              Провели редизайн через A/B: выкатили новый интерфейс на часть аудитории Android, сравнили конверсию в оплату и NPS. Главный экран, экран штрафа, профиль, сервисы — всё переработано. NPS вырос на 17 процентных пунктов в тестовой группе, конверсия не просела — раскатили на 100%.
            </P>
          </S>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="case-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 40 }}>
            <Slide src="/cases/mobile/services.png" alt="Сервисы (после редизайна)" />
            <Slide src="/cases/mobile/traffic-rules.png" alt="ПДД (после редизайна)" />
          </div>
        </FadeUp>

        {/* ═══ Stories ═══ */}
        <FadeUp>
          <S id="stories" label="Stories: retention 7d +12%">
            <P>
              Внедрили Stories на главном экране — короткие карточки
              с полезным контентом: напоминания о штрафах, изменения в ПДД, страховые акции.
            </P>
            <P>
              <B>Зачем:</B> повысить частоту возвращения в приложение. Без Stories пользователь заходил
              только когда получал штраф. Со Stories — заходит проверить что нового, а заодно видит неоплаченные штрафы.
            </P>
            <P>
              <B>Результат: Retention 7d вырос на 12%.</B> Stories стали одним из основных каналов
              повторного вовлечения, наряду с пуш-уведомлениями.
            </P>
          </S>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="case-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 40 }}>
            <Slide src="/cases/mobile/stories-metrics.png" alt="Метрики Stories" />
            <Slide src="/cases/mobile/stories-result-7500.png" alt="Рост открытий Stories" />
          </div>
        </FadeUp>

        {/* ═══ Loyalty — with ending ═══ */}
        <FadeUp>
          <S id="loyalty" label="Программа лояльности: не взлетела">
            <P>
              <B>Гипотеза:</B> пользователи проверяют штрафы у нас, но оплачивают через Госуслуги или конкурентов.
              Если внедрить бонусную программу — баллы за оплату, скидки на страховки —
              они будут оплачивать именно через нас.
            </P>
            <P>
              <B>Процесс:</B> бенчмаркинг конкурентов → прототипы → UX-тесты через Pathway
              (сравнение двух версий экрана + тест на понимание) → 10 глубинных интервью по часу.
            </P>
            <P>
              <B>Что выяснили:</B> пользователи положительно реагировали на саму идею бонусов.
              Но <B>готовность менять поведение ради баллов оказалась низкой</B> — те, кто оплачивал через Госуслуги,
              делали это по привычке, и бонусы в 2-3% не были достаточным стимулом.
            </P>
            <P>
              <B>Решение:</B> запустили в формате MVP, чтобы проверить на реальных данных, а не только на интервью.
              MVP подтвердил гипотезу интервью — конверсия в использование программы оказалась ниже порога окупаемости.
              Фичу оставили в приложении, но не стали масштабировать.
            </P>
            <P>
              <B>Вывод:</B> не каждая проверенная по процессу гипотеза взлетает.
              Важно уметь остановиться вовремя — ресурсы перенаправили на оптимизацию платёжного флоу, которая дала больший эффект.
            </P>
          </S>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="case-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 40 }}>
            <Slide src="/cases/mobile/loyalty.png" alt="Программа лояльности" />
            <Slide src="/cases/mobile/stories-hypotheses.png" alt="Гипотезы и тестирование" />
          </div>
        </FadeUp>

        {/* ═══ How I thought — one decision fork ═══ */}
        <FadeUp>
          <S id="decisions" label="Пуши vs Stories">
            <P>
              Когда встала задача повысить retention, были два конкурирующих подхода:
            </P>
            <P>
              <B>Вариант А — усилить пуш-уведомления.</B> Быстрее в реализации, не требует UI.
              Но у пушей потолок: opt-in rate высокий (мы провели AB-тест экрана разрешений и выбрали
              нативный системный диалог — он победил кастомный), но open rate снижается со временем.
              Пуши — хорошо для разовых действий, плохо для привычки.
            </P>
            <P>
              <B>Вариант Б — внедрить Stories.</B> Сложнее, нужен контент-пайплайн. Но создаёт
              причину открывать приложение добровольно, а не по уведомлению.
              Если человек открывает приложение сам — это сильнее, чем если ему напомнили.
            </P>
            <P>
              <B>Выбрали оба, но с разными ролями:</B> пуши — для срочного (новый штраф, срок оплаты),
              Stories — для регулярного вовлечения. Это дало +12% retention без каннибализации каналов.
            </P>
          </S>
        </FadeUp>

        {/* ═══ Team + analytics ═══ */}
        <FadeUp>
          <S id="team" label="Команда и процессы">
            <P>
              8 человек: 3 разработчика (iOS, Android, бэкенд), продуктовый дизайнер, QA, аналитик, я как PM, тимлид.
              Пример приоритизации: оплата с мобильного баланса победила редизайн профиля, хотя редизайн просили чаще — потому что баланс открывал новый сегмент платящих, а редизайн улучшал метрику удовлетворённости.
              Двухнедельные спринты, но без догматики: если данные говорили "бросаем" — бросали в середине спринта.
            </P>
            <P>
              <B>Аналитика:</B> когда пришёл, была только AppMetrica с базовыми метриками. Построил дашборды в Яндекс DataLens:
              воронка оплаты (по шагам), когорты по источникам, retention-кривые по сегментам.
              Это позволило перейти от "мы думаем, что..." к "данные показывают, что..." —
              и именно так нашли проблему в платёжном флоу.
            </P>
          </S>
        </FadeUp>

        {/* ═══ Takeaways ═══ */}
        <FadeUp>
          <S id="takeaways" label="Что я вынес">
            <P>
              Три месяца мы строили программу лояльности — бенчмарки, прототипы, десять интервью. А воронку оплаты я детально разобрал только когда руки дошли. Нашёл проблему за вечер: лишний экран подтверждения, люди думали, что уже оплатили. Две недели на фикс — +18% конверсии.
            </P>
            <P>
              Оглядываясь назад: воронку надо было разобрать в первый месяц. Данные были в AppMetrica, но я их не смотрел — был увлечён новыми фичами. Теперь начинаю с того, что приносит деньги, а не с того, что интереснее строить.
            </P>
          </S>
        </FadeUp>

    </CaseLayout>
  )
}
