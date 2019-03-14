const Koa = require('koa2')
const json = require('koa-json')
const logger = require('koa-logger')
const koaRouter = require('koa-router')
const koaBodyparser = require('koa-bodyparser')

const app = new Koa()
const router = koaRouter()
app.use(koaBodyparser())
app.use(json())
app.use(logger())

app.use(async (ctx, next) => {
  let start = new Date()
  await next()
  let ms = new Date() - start
  console.log('%s %s - %s', this.method, this.url, ms) // 显示执行的时间
  ctx.response.type = 'html'
  ctx.response.body = '<p>This is about page!</p>'
})

app.on('error', (err, ctx) => {
  console.log('server error', err)
})

app.use(router.routes()) // 将路由规则挂到Koa上

app.listen(3000, () => {
  console.log('Koa is listening in 3000')
})

module.exports = app
