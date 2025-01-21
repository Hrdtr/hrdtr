export default defineSitemapEventHandler(async (event) => {
  // @ts-expect-error typecheck unexpected error
  const projects = await queryCollection(event, 'projects').all()

  return projects.map(item => asSitemapUrl({
    loc: item.path,
    changefreq: 'monthly',
  }))
})
