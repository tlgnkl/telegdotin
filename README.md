# teleg.in — личное портфолио

Персональный сайт-визитка Николая Телегина, AI Product Manager.

🔗 **[teleg.in](https://teleg.in)**

## Что внутри

- Главная страница с proof strip, кейсами, карьерным таймлайном
- 4 детальных кейс-стади с отдельными страницами:
  - 🎤 AI-ассистент для водителей (голос, навигация, US-рынок)
  - 📱 Мобильный продукт 700k MAU (штрафы ГИБДД)
  - ✨ AI-скоринг кандидатов (интерактивная демо-симуляция)
  - ⚡ CV для энергетики (распознавание электрощитов)
- Shared CaseLayout: табы, TL;DR, TOC sidebar, prev/next навигация
- Адаптивный дизайн (mobile-first)

## Стек

- **React 19** + TypeScript + Vite 6
- **Motion** (Framer Motion) — scroll-reveal, AnimatePresence
- **react-router-dom** — маршрутизация между кейсами
- **Outfit** + **Caveat** — Google Fonts
- Tailwind CSS 4 (reset only) + CSS variables + inline styles

## Запуск

```bash
npm install
make dev        # Dev-сервер http://localhost:5173
make build      # Production → dist/
make preview    # Превью сборки
```

## Лицензия

Код открыт для ознакомления. Контент (тексты, изображения) — собственность автора.
