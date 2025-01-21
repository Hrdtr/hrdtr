import { sha1 } from '@oslojs/crypto/sha1'
import { encodeHexLowerCase } from '@oslojs/encoding'

export async function hashPassword(password: string, { salt: providedSalt }: { salt?: Uint8Array } = {}): Promise<string> {
  const encoder = new TextEncoder()
  const salt = providedSalt || crypto.getRandomValues(new Uint8Array(16))
  const keyMaterial = await crypto.subtle.importKey('raw', encoder.encode(password), { name: 'PBKDF2' }, false, ['deriveBits', 'deriveKey'])
  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt'],
  )
  const exportedKey = await crypto.subtle.exportKey('raw', key)
  const hashBuffer = new Uint8Array(exportedKey)
  const hashArray = Array.from(hashBuffer)
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('')

  return `${saltHex}:${hashHex}`
}

export async function verifyPasswordHash(hashedPassword: string, password: string): Promise<boolean> {
  const [saltHex, originalHash] = hashedPassword.split(':')
  const matchResult = saltHex!.match(/.{1,2}/g)
  if (!matchResult) {
    throw new Error('Invalid salt format')
  }
  const salt = new Uint8Array(matchResult.map(byte => parseInt(byte, 16)))
  const attemptHashWithSalt = await hashPassword(password, { salt })
  const [, attemptHash] = attemptHashWithSalt.split(':')
  return attemptHash === originalHash
}

export async function verifyPasswordStrength(password: string): Promise<boolean> {
  if (password.length < 8 || password.length > 255) {
    return false
  }
  const hash = encodeHexLowerCase(sha1(new TextEncoder().encode(password)))
  const hashPrefix = hash.slice(0, 5)
  const response = await fetch(`https://api.pwnedpasswords.com/range/${hashPrefix}`)
  const data = await response.text()
  const items = data.split('\n')
  for (const item of items) {
    const hashSuffix = item.slice(0, 35).toLowerCase()
    if (hash === hashPrefix + hashSuffix) {
      return false
    }
  }
  return true
}
