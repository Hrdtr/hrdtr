export default defineEventHandler(async (event) => {
  const db = useDBClient()
  const {
    page = 1,
    limit = 10,
  } = getQuery(event)

  const total = await db.select({ count: count() })
    .from(schema.guestbook)
    .then(result => result[0]!.count)

  const data = await db.query.guestbook.findMany({
    orderBy: (guestbook, { desc }) => [desc(guestbook.createdAt)],
    limit: Number(limit),
    offset: (Number(page) - 1) * Number(limit),
    with: {
      user: {
        columns: {
          email: false,
          githubUserId: false,
        },
      },
    },
  })

  return {
    data,
    meta: {
      total,
      limit: Number(limit),
      page: {
        current: Number(page),
        count: Math.ceil(total / Number(limit)),
      },
    },
  }
})
