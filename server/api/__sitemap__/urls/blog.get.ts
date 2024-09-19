import { asSitemapUrl, defineSitemapEventHandler } from '#imports'
import { serverQueryContent } from '#content/server'

export default defineSitemapEventHandler(async (event) => {
  const blog = await serverQueryContent(event, '/blog').find()

  return blog.map(item => asSitemapUrl({
    loc: item._path,
    changefreq: 'monthly',
  }))
})
