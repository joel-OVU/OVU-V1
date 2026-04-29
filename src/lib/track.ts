// Browser-side analytics helper.
// Generates an anonymous distinct ID and POSTs events to the server-side
// /api/events endpoint, which forwards them to PostHog via posthog-node.

function getDistinctId(): string {
  const key = 'ph_distinct_id'
  let id = sessionStorage.getItem(key)
  if (!id) {
    id = `anon_${Math.random().toString(36).slice(2)}_${Date.now()}`
    sessionStorage.setItem(key, id)
  }
  return id
}

export function track(event: string, properties?: Record<string, unknown>): void {
  const distinctId = getDistinctId()
  fetch('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, distinctId, properties }),
  }).catch(() => {})
}
