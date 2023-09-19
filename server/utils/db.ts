import {
  neon,
  neonConfig,
  NeonQueryFunction,
  Pool,
} from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { WebSocket } from "undici";
import * as schema from "../db/schema";

const runtimeConfig = useRuntimeConfig();

let sql: undefined | NeonQueryFunction<false, false> = undefined;
if (!sql) {
  neonConfig.fetchConnectionCache = true;
  sql = neon(runtimeConfig.databaseUrl);
}

let pool: undefined | Pool = undefined;
if (!pool) {
  neonConfig.webSocketConstructor = WebSocket;
  pool = new Pool({ connectionString: runtimeConfig.databaseUrl });
}

const client = drizzle(sql, { schema });
migrate(client, { migrationsFolder: `./server/db/migrations` });

export const db = {
  sql,
  pool,
  schema,
  client,
};
