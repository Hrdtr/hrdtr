import {
  neon,
  neonConfig,
  NeonQueryFunction,
} from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { migrate } from 'drizzle-orm/neon-http/migrator';
import pg from 'pg';
import * as schema from '../db/schema';
import type { Pool as TPool } from 'pg';

const runtimeConfig = useRuntimeConfig();

let sql: undefined | NeonQueryFunction<false, false> = undefined;
if (!sql) {
  neonConfig.fetchConnectionCache = true;
  sql = neon(runtimeConfig.databaseUrl);
}

let pool: undefined | TPool = undefined;
if (!pool) {
  pool = new pg.Pool({
    connectionString: `${runtimeConfig.databaseUrl}?sslmode=require`
  });
}

const client = drizzle(sql, { schema });
if (process.dev) {
  migrate(client, { migrationsFolder: `./server/db/migrations` });
}

export const db = {
  sql,
  pool,
  schema,
  client,
};
