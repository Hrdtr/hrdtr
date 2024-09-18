import { consola } from 'consola'
import { migrate } from 'drizzle-orm/d1/migrator'

export default defineNitroPlugin(async () => {
  if (!import.meta.dev) return

  onHubReady(async () => {
    const db = useDBClient()
    await migrate(db, { migrationsFolder: 'server/database/migrations' })
      .then(() => consola.success('Database migrations succeeded'))
      .catch(err => consola.error('Database migrations failed', err))
  })
})
