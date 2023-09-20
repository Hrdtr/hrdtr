import { sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const body: { path: string } = await readBody(event);
  if (!body?.path || body.path.length === 0 || !body.path.startsWith('/')) {
    throw createError({
      statusCode: 400,
    });
  }
  const [result] = await db.client
    .insert(db.schema.pageview)
    .values({
      path: body.path,
      count: 1,
    })
    .onConflictDoUpdate({
      target: db.schema.pageview.path,
      set: {
        count: sql`${db.schema.pageview.count} + 1`,
      },
    })
    .returning();

  return result;
});
