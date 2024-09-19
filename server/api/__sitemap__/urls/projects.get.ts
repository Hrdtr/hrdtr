import { asSitemapUrl, defineSitemapEventHandler } from '#imports'
import { serverQueryContent } from '#content/server'

export default defineSitemapEventHandler(async (event) => {
  const projects = await serverQueryContent(event, '/projects').find()

  return projects.map(item => asSitemapUrl({
    loc: item._path,
    changefreq: 'monthly',
  }))
})
