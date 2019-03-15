import Koa from 'koa2'
import json from 'koa-json'
import logger from 'koa-logger'
import koaRouter from 'koa-router'
import koaBodyparser from 'koa-bodyparser'

const app = new Koa()
const router = koaRouter()

app.use(json())
app.use(logger())
app.use(koaBodyparser())

app.use(async (ctx, next) => {
  let start = new Date()
  await next()
  let ms = new Date() - start
  // console.log('%s %s - %s', this.method, this.url, ms) // 显示执行的时间
  ctx.response.type = 'html'
  ctx.response.body = '<p>This is index page!</p>'
})

app.on('error', (err, ctx) => {
  console.log('server error', err)
})

app.use(router.routes()) // 将路由规则挂到Koa上

app.listen(3000, () => {
  console.log('Koa is listening in 3000')
})

module.exports = app
