/* Case registry — shared between App.tsx and CaseLayout */

export type CaseNav = {
  id: string
  title: string
  shortTitle: string
  route: string
  accentColor: string
  accentBg: string
  emoji: string
  hasPage: boolean
  readingTime: number // minutes
  metaTitle: string
  metaDescription: string
}

export const caseNav: CaseNav[] = [
  { id: 'ai', title: 'AI-ассистент для водителей', shortTitle: 'AI-ассистент', route: '/cases/ai', accentColor: '#4F9CF5', accentBg: '#eef5ff', emoji: '🎤', hasPage: true, readingTime: 5, metaTitle: 'Николай Телегин — AI-ассистент для водителей', metaDescription: 'Кейс: голосовой AI-ассистент для US-рынка. Латентность 11с → 1.5с, точность 92%, расходы −40%.' },
  { id: 'mobile', title: 'Мобильный продукт, 700k MAU', shortTitle: 'Штрафы ПДД', route: '/cases/mobile', accentColor: '#FF8C42', accentBg: '#fff3ea', emoji: '📱', hasPage: true, readingTime: 4, metaTitle: 'Николай Телегин — Мобильный продукт 700k MAU', metaDescription: 'Кейс: мобильное приложение Штрафы ГИБДД. +18% конверсии в платежах, Stories-формат, лояльность.' },
  { id: 'hrtech', title: 'AI-скоринг кандидатов', shortTitle: 'AI-скоринг', route: '/cases/hrtech', accentColor: '#2DD4A8', accentBg: '#e6faf5', emoji: '✨', hasPage: true, readingTime: 6, metaTitle: 'Николай Телегин — AI-скоринг кандидатов', metaDescription: 'Кейс: AI-система скоринга резюме. Данные вместо интуиции в подборе людей. Интерактивная симуляция.' },
  { id: 'elektro', title: 'AI-распознавание электрощитов', shortTitle: 'CV-энергетика', route: '/cases/elektro', accentColor: '#F5A623', accentBg: '#fff8eb', emoji: '⚡', hasPage: true, readingTime: 3, metaTitle: 'Николай Телегин — AI-распознавание электрощитов', metaDescription: 'Кейс: computer vision для распознавания электрощитов. От прототипа до работающего pipeline.' },
]
