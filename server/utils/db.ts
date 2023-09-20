import {
  neon,
  neonConfig,
  NeonQueryFunction,
  Pool,
} from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { migrate } from 'drizzle-orm/neon-http/migrator';
import * as schema from '../db/schema';

const runtimeConfig = useRuntimeConfig();

let sql: undefined | NeonQueryFunction<false, false> = undefined;
if (!sql) {
  neonConfig.fetchConnectionCache = true;
  sql = neon(runtimeConfig.databaseUrl);
}

let pool: undefined | Pool = undefined;
if (!pool) {
  pool = new Pool({ connectionString: runtimeConfig.databaseUrl });
  if (process.dev) {
    import('undici').then(({ WebSocket }) => {
      neonConfig.webSocketConstructor = WebSocket;
    });
  }
}

const client = drizzle(sql, { schema });
migrate(client, { migrationsFolder: `./server/db/migrations` });

export const db = {
  sql,
  pool,
  schema,
  client,
};
