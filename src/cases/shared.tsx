import { motion } from 'motion/react'

export const ease = [0.25, 0.1, 0.25, 1] as const

export function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.9, ease, delay }}>{children}</motion.div>
}

export const P = ({ children }: { children: React.ReactNode }) => <p style={{ fontSize: 20, color: 'var(--text-body)', lineHeight: 1.7, maxWidth: 680, marginTop: 16 }}>{children}</p>
export const B = ({ children }: { children: React.ReactNode }) => <strong style={{ color: 'var(--text)', fontWeight: 700 }}>{children}</strong>
