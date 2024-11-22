import { drizzle } from 'drizzle-orm/d1'
import { customAlphabet } from 'nanoid'
import * as schema from './schema'

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const length = 16
export const createId = (prefix?: string) => `${prefix ?? ''}${customAlphabet(alphabet, length)()}`

export { schema }
export {
  and,
  count,
  eq,
  notInArray,
  or,
  sql,
} from 'drizzle-orm'

export const useDBClient = () => drizzle(hubDatabase(), { schema })
