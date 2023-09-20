import { sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const { page = 1, limit = 10 } = getQuery(event);

  const [{ count }] = await db.client
    .select({ count: sql`COUNT(*)`.mapWith(Number) })
    .from(db.schema.guestbook);

  const data = await db.client.query.guestbook.findMany({
    orderBy: (guestbook, { desc }) => [desc(guestbook.createdAt)],
    limit: Number(limit),
    offset: (Number(page) - 1) * Number(limit),
    with: { user: true }
  });

  return {
    data,
    meta: {
      count,
      limit: Number(limit),
      page: {
        current: Number(page),
        total: Math.ceil((count ?? 0) / Number(limit)),
      },
    },
  };
});
