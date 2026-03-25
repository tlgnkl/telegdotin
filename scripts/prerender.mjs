/**
 * Post-build prerender script.
 * Launches the built SPA with a local server, visits each route with Puppeteer,
 * and saves the fully rendered HTML so crawlers/bots see real content.
 *
 * Usage: node scripts/prerender.mjs
 * Runs after `vite build` — requires dist/ to exist.
 */
import { createServer } from 'node:http'
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = resolve(__dirname, '..', 'dist')
const PORT = 4567

const ROUTES = [
  '/',
  '/cases/ai',
  '/cases/mobile',
  '/cases/hrtech',
  '/cases/elektro',
]

// Simple static file server with SPA fallback
function startServer() {
  const index = readFileSync(resolve(DIST, 'index.html'), 'utf-8')
  const mimeTypes = {
    '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
    '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml', '.woff2': 'font/woff2',
  }

  const server = createServer((req, res) => {
    const url = req.url.split('?')[0]
    const filePath = resolve(DIST, url === '/' ? 'index.html' : url.slice(1))

    let isFile = false
    try { isFile = statSync(filePath).isFile() } catch {}

    if (isFile) {
      const ext = '.' + filePath.split('.').pop()
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' })
      res.end(readFileSync(filePath))
    } else {
      // SPA fallback
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(index)
    }
  })

  return new Promise(r => server.listen(PORT, () => r(server)))
}

async function prerender() {
  console.log('Starting prerender...')
  const server = await startServer()

  // Dynamic import puppeteer (installed globally via npx)
  const puppeteer = await import('puppeteer')
  const browser = await puppeteer.launch({ headless: true })

  for (const route of ROUTES) {
    const page = await browser.newPage()
    const url = `http://localhost:${PORT}${route}`
    console.log(`  Rendering ${route}...`)

    await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 })
    // Wait for React to render + animations to settle
    await page.waitForSelector('#root > *', { timeout: 10000 })
    await new Promise(r => setTimeout(r, 1500))

    const html = await page.content()
    const outDir = route === '/' ? DIST : resolve(DIST, route.slice(1))
    const outFile = resolve(outDir, 'index.html')

    mkdirSync(outDir, { recursive: true })
    writeFileSync(outFile, html, 'utf-8')
    console.log(`  ✓ ${route} → ${outFile.replace(DIST, 'dist')}`)

    await page.close()
  }

  await browser.close()
  server.close()
  console.log(`Done! Pre-rendered ${ROUTES.length} routes.`)
}

prerender().catch(err => { console.error(err); process.exit(1) })
