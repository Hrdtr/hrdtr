type TagEnum = 
  | 'base64'
  | 'encoder'
  | 'decoder'
  | 'image'
  | 'html'
  | 'json'
  | 'formatter'
  | 'minifier'
  | 'random'
  | 'generator'
  | 'qr-code'
  | 'url'
  | 'uuid'

type UtilityMeta = {
  id: number,
  name: string,
  path: string,
  tags: TagEnum[]
}
const items: UtilityMeta[] = [
  {
    id: 1,
    name: 'Base64 Text Encoder',
    path: '/utils/base64-text-encoder/',
    tags: ['base64', 'encoder']
  },
  {
    id: 2,
    name: 'Base64 Text Decoder',
    path: '/utils/base64-text-decoder/',
    tags: ['base64', 'decoder']
  },
  {
    id: 3,
    name: 'Base64 image Encoder',
    path: '/utils/base64-image-encoder/',
    tags: ['image', 'base64', 'encoder']
  },
  {
    id: 4,
    name: 'Base64 image Decoder',
    path: '/utils/base64-image-decoder/',
    tags: ['image', 'base64', 'decoder']
  },
  {
    id: 5,
    name: 'HTML Entity Encoder',
    path: '/utils/html-entity-encoder/',
    tags: ['html', 'encoder']
  },
  {
    id: 6,
    name: 'HTML Entity Decoder',
    path: '/utils/html-entity-decoder/',
    tags: ['html', 'decoder']
  },
  {
    id: 7,
    name: 'JSON Formatter',
    path: '/utils/json-formatter/',
    tags: ['json', 'formatter']
  },
  {
    id: 8,
    name: 'JSON Minifier',
    path: '/utils/json-minifier/',
    tags: ['json', 'minifier']
  },
  {
    id: 9,
    name: 'Lorem Ipsum Generator',
    path: '/utils/lorem-ipsum-generator/',
    tags: ['random', 'generator']
  },
  {
    id: 10,
    name: 'Password Generator',
    path: '/utils/password-generator/',
    tags: ['generator']
  },
  {
    id: 11,
    name: 'QR Code Generator',
    path: '/utils/qr-code-generator/',
    tags: ['qr-code', 'image', 'generator']
  },
  {
    id: 12,
    name: 'URL Encoder',
    path: '/utils/url-encoder/',
    tags: ['url', 'encoder']
  },
  {
    id: 13,
    name: 'URL Decoder',
    path: '/utils/url-decoder/',
    tags: ['url', 'decoder']
  },
  {
    id: 14,
    name: 'UUID Generator',
    path: '/utils/uuid-generator/',
    tags: ['uuid', 'generator']
  },
  {
    id: 15,
    name: 'WiFi QR Code Generator',
    path: '/utils/wifi-qr-code-generator/',
    tags: ['qr-code', 'image', 'generator']
  }
]

function useUtilitiesMeta(): UtilityMeta[]
function useUtilitiesMeta<U>(cb: (metas: UtilityMeta[]) => U): U
function useUtilitiesMeta<U>(cb?: (metas: UtilityMeta[]) => U) {
  if (!cb) return items
  return cb(items)
}

export { useUtilitiesMeta }
