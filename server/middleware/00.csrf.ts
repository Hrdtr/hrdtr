import { defineEventHandler, getHeader, createError } from 'h3'

export default defineEventHandler(async (event) => {
  if (import.meta.prerender) return

  // CSRF protection. Only required in non-GET requests (POST, PUT, DELETE, PATCH, etc)
  if (event.method !== 'GET' && !event.path.startsWith('/api/_hub')) {
    const originHeader = getHeader(event, 'Origin') ?? null
    const hostHeader = getHeader(event, 'Host') ?? null
    if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) {
      throw createError({
        statusCode: 403,
        message: 'Invalid origin',
      })
    }
  }
})

function verifyRequestOrigin(origin: string, allowedDomains: string[]) {
  if (!origin || allowedDomains.length === 0) {
    return false
  }
  const originHost = safeParseURL(origin)?.host ?? null
  if (!originHost) {
    return false
  }
  for (const domain of allowedDomains) {
    let host
    if (domain.startsWith('http://') || domain.startsWith('https://')) {
      host = safeParseURL(domain)?.host ?? null
    }
    else {
      host = safeParseURL('https://' + domain)?.host ?? null
    }
    if (originHost === host) {
      return true
    }
  }
  return false
}

function safeParseURL(url: string) {
  try {
    return new URL(url)
  }
  catch {
    return null
  }
}
