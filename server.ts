import 'dotenv/config'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPostHogClient, shutdownPostHog } from './src/lib/posthog.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const port = process.env.PORT ?? 3000

app.use(express.json())
app.use(express.static(path.join(__dirname, 'dist')))

// Receive analytics events from the browser and forward them to PostHog.
app.post('/api/events', (req, res) => {
  try {
    const { event, distinctId, properties } = req.body as {
      event?: string
      distinctId?: string
      properties?: Record<string, unknown>
    }
    if (!event || !distinctId) {
      res.status(400).json({ error: 'event and distinctId are required' })
      return
    }
    const posthog = getPostHogClient()
    posthog.capture({ distinctId, event, properties: properties ?? {} })
    posthog.capture({
      distinctId: 'server',
      event: 'event captured',
      properties: { forwarded_event: event },
    })
    res.status(200).json({ ok: true })
  } catch (err) {
    const posthog = getPostHogClient()
    posthog.captureException(err, 'server')
    res.status(500).json({ error: 'internal server error' })
  }
})

// Fallback for SPA routing
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

async function gracefulShutdown() {
  await shutdownPostHog()
  server.close(() => process.exit(0))
}

process.on('SIGINT', gracefulShutdown)
process.on('SIGTERM', gracefulShutdown)
