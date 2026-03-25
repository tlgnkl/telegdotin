# telegin-portfolio

Личный сайт-визитка Николая Телегина — AI Product Manager. Multi-page portfolio с нарративом, кейс-стади и анимациями.

## Tech Stack

- **Runtime**: Vite 6 + React 19 + TypeScript 5.7
- **Роутинг**: react-router-dom 7 (BrowserRouter)
- **Анимации**: Motion (Framer Motion) 11 — scroll-reveal (FadeUp), AnimatePresence (модалки)
- **Шрифты**: Outfit (основной) + Caveat (рукописные акценты в заголовках секций) — Google Fonts
- **Стили**: CSS-переменные + inline styles. Tailwind CSS 4 подключен но используется только для reset
- **Сборка**: Vite, target ES2020, motion вынесен в отдельный chunk

## Структура

```
src/
├── App.tsx          # Главная страница: секции, данные, стили, модалка
├── main.tsx         # Entry + BrowserRouter + Routes
├── global.css       # CSS-переменные, keyframes, noise overlay
├── vite-env.d.ts
└── cases/
    ├── ai.tsx       # Страница кейса AI-ассистента (/cases/ai)
    ├── mobile.tsx   # Страница кейса мобильного продукта (/cases/mobile)
    ├── hrtech.tsx   # Страница кейса HR-скоринга (/cases/hrtech) — с интерактивной симуляцией
    └── elektro.tsx  # Страница кейса CV для электрощитов (/cases/elektro) — с интерактивным pipeline
public/
├── favicon.svg
├── og.png           # OG-карточка 1200x630 (фото + имя + роль)
├── sitemap.xml      # 5 URL-ов
├── robots.txt       # Allow all + sitemap
└── cases/
    ├── ai/          # 6 скриншотов AI-ассистента
    ├── mobile/      # 10 скриншотов мобильного приложения
    └── elektro/     # 3 фото электрощитов
scripts/
└── prerender.mjs    # Post-build пререндер: Puppeteer → статический HTML для 5 роутов
index.html           # Vite entry + Google Fonts + JSON-LD + OG meta
Makefile             # make dev/build/preview/check/clean/help
```

## Команды

```bash
make dev       # Dev-сервер на localhost:5173
make build     # Собрать production + пререндер 5 страниц
make preview   # Превью production-сборки
make check     # Проверить типы (tsc)
make clean     # Очистить dist
```

## Роуты

```
/              — Главная (лендинг)
/cases/ai      — Кейс: AI-ассистент для водителей
/cases/mobile  — Кейс: Мобильный продукт 700k MAU
/cases/hrtech  — Кейс: AI-скоринг кандидатов (интерактивная симуляция)
/cases/elektro — Кейс: AI-распознавание электрощитов (интерактивный pipeline)
```

Все 5 роутов пререндерятся в статический HTML (`scripts/prerender.mjs`) для SEO и OG-карточек.

## Структура лендинга (нарратив)

```
1. HERO           — Крючок-текст (32px), рукописный "AI Product Manager", фото, CTA "Обсудить задачу"
2. ABOUT          — "обо мне": 3+ года, подход, философия PM (24px editorial)
3. PROOF STRIP    — 4 числа в ряд (цветные) с подписями-источниками (AI-ассистент / Штрафы ПДД)
4. CASES          — Главный кейс (hero card) + 3 secondary rows. Клик → страница. Бейджи "интерактивно" на hrtech/elektro
5. CAREER         — 3 точки (2022 Свои проекты → 2023 PM → 2025 AI Lead) + МИСИС
6. CTA            — Зелёный фон, "что ищу" + рукописный "давайте обсудим" + контакты
7. BOTTOM NAV     — Glassmorphism (white), "написать" + TG/GH
```

## Shared инфраструктура кейсов

```
src/cases/
├── data.ts        # Реестр кейсов (id, title, shortTitle, route, color, readingTime, metaTitle, metaDescription)
├── CaseLayout.tsx # Общий layout: tabs, TL;DR, TOC sidebar, prev/next, responsive
├── ai.tsx         # ~5 мин чтения
├── mobile.tsx     # ~4 мин чтения
├── hrtech.tsx     # ~6 мин чтения, интерактивная симуляция
└── elektro.tsx    # ~3 мин чтения, интерактивный pipeline
```

CaseLayout предоставляет: sticky header с табами переключения, TL;DR "за 10 секунд", TOC sidebar (>1200px) / progress bar (<1200px), prev/next навигация, visual framing (gradient glows).

## Кейсы — 4 штуки

| ID | Цвет | Формат | Статус |
|---|---|---|---|
| ai | синий #4F9CF5 | Отдельная страница /cases/ai | Готов, прошёл ревью методолога |
| mobile | оранжевый #FF8C42 | Отдельная страница /cases/mobile | Готов, требует усиления по ревью |
| hrtech | teal #2DD4A8 | Отдельная страница /cases/hrtech | Готов, интерактивная симуляция скоринга |
| elektro | amber #F5A623 | Отдельная страница /cases/elektro | Готов, интерактивный pipeline demo |

## Дизайн-система

**Always read DESIGN.md before making any visual or UI decisions.**
All font choices, colors, spacing, and aesthetic direction are defined there.
Do not deviate without explicit user approval.
In QA mode, flag any code that doesn't match DESIGN.md.

Краткое резюме (полная версия в DESIGN.md):
- Светлая тема, журнальная вёрстка. Референс: https://apalish.in/
- Outfit (основной) + Caveat (рукописные акценты)
- Зелёный акцент #7aef8c + per-case accent colors
- Двухуровневые заголовки секций: серый обычный + зелёный рукописный (Caveat)

## Код стайл

- Одинарные кавычки, без точек с запятой
- Стили через inline `style` и CSS-переменные
- Hover через `onMouseEnter/onMouseLeave`, НЕ через Motion `whileHover` с color/background
- Motion только для: transform, opacity, scale, y — compositor-friendly
- Парящие карточки: `--shadow-float` (default) → `--shadow-hover` (on hover) + translateY(-8px)

## Частые ошибки

- **НЕ Motion `whileHover={{ backgroundColor }}`** — перебивает CSS inline-стилями
- **НЕ `motion.span`** с background/padding — inline элементы не рендерят фон
- **НЕ Tailwind custom colors** (`bg-light-gray`) — не генерируются, юзать CSS vars
- **НЕ отдельный серый фон для proof/numbers секции** — выглядит как вставка
- **НЕ карточки ради карточек** — editorial layout (текст на белом) лучше
- **НЕ "50+ гипотез"** — количество без качества это антипаттерн. 2-3 конкретных примера лучше
- **НЕ "я vs некомпетентные коллеги"** — формулировать нейтрально, без обесценивания
- **НЕ преувеличивать метрики** — если цифра выдумана, лучше убрать или написать "значительно выросла"
- **tsc -b** может ругаться на public/ — в tsconfig.json и tsconfig.app.json добавлен exclude: ["public"]

## Принципы написания кейсов (из ревью методолога)

1. Связь инициатив с бизнес-метриками (outcome, не activity)
2. Чёткая воронка с цифрами до/после
3. Показывать КАК думаешь, а не ЧТО делал
4. Трейдоффы и альтернативы при каждом решении
5. Провалы = зрелость. "Что не сработало" — обязательная секция
6. Честная формулировка "с нуля" → "внутри компании"
7. Согласовать цифры между карточкой и кейсом

## Принципы тона текста (из 3 ревью)

- НЕ самохвальство ("я тот PM, которого не боятся") — показывать через примеры, не через заявления
- НЕ PM-Twitter штампы ("Wow ≠ WTP", "Привычка > действие", "это не баг, а принцип")
- НЕ писать выводы одним шаблоном во всех кейсах
- НЕ фейковые testimonials — непроверяемый testimonial хуже чем ничего
- Разная структура выводов для каждого кейса
- Живой голос: конкретные детали, эмоции, неожиданные повороты
- Чётко разделять PM-вклад vs инженерный ("я инициировал и провёл POC, инженеры реализовали")
- Метрики defensible на интервью ("196/200 совпадение" вместо "97% точность")
- About показывать через конкретный пример (история), не через перечисление buzz-words

## История изменений

* **2026-03** — Initial commit: полный сайт с 4 кейсами, CaseLayout, роутинг (2f3562a)
* **2026-03** — CEO-ревью: честные метрики, живой голос, убраны штампы (c32f10e)
* **2026-03** — Добавлены реальное фото и PDF CV (43666fc)
* **2026-03** — 2-е ревью: убран кринж About, фейковый testimonial, "Победная серия" (d57bd54)
* **2026-03** — Fix: Firefox rendering bug (key на Routes), favicon, GitHub link (761243a)
* **2026-03** — Fix: hero spacing, footer gap (bad07e6)
* **2026-03** — Mobile responsive: главная (3 breakpoints: 900/640/400px) (22de79f)
* **2026-03** — Mobile responsive: кейсы (demos, tables, grids overflow) (f6988c2)
* **2026-03** — Design review + DESIGN.md: a11y, states, dead code cleanup (b587811)
* **2026-03** — Polish + Ship: сжатие картинок 40→16MB, обновление CTA и таймлайна (Lofty 2026), OG-карточка, JSON-LD, пререндер 5 страниц, Vercel Analytics, enhanced 404. Первый деплой на GitHub (4e2c544)

## Заметки по проекту

- ✅ **Фото** — реальное фото добавлено (`public/photo.jpg`)
- ✅ **PDF CV** — HH-формат работает (`public/nikolai-telegin-cv.pdf`). TODO: кастомный PDF (не HH)
- ✅ **"Победная серия"** → "Кейсы / продукты"
- ✅ **"now at"** → "сейчас в Lofty"
- ✅ **OG-карточка** — `public/og.png` (1200x630, фото + имя + роль)
- ✅ **Пререндер** — 5 страниц рендерятся в статический HTML (`scripts/prerender.mjs`)
- ✅ **SEO** — JSON-LD Person, sitemap.xml, per-page `<title>` + `<meta description>` через data.ts
- ✅ **Vercel Analytics** — `@vercel/analytics` в main.tsx
- ✅ **Сжатие картинок** — 40MB → 16MB, удалены 10 неиспользуемых файлов
- ✅ **CTA обновлён** — "Делаю продукты с AI — от идеи до первой продажи"
- ✅ **Enhanced 404** — ссылки на кейсы с цветными маркерами
- ✅ **Таймлайн** — 2026, Lofty, AI Product Engineer
- **TODO: Testimonial** — нужна РЕАЛЬНАЯ цитата от коллеги/руководителя с полным именем и LinkedIn
- **TODO: Кастомный PDF CV** — не HH-формат
- GitHub: https://github.com/tlgnkl/telegdotin
- Деплой: `make build` → `dist/` → Vercel (подключить через vercel.com/new)
