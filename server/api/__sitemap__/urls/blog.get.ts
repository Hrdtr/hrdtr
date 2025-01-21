export default defineSitemapEventHandler(async (event) => {
  // @ts-expect-error typecheck unexpected error
  const blog = await queryCollection(event, 'blog').all()

  return blog.map(item => asSitemapUrl({
    loc: item.path,
    changefreq: 'monthly',
  }))
})
