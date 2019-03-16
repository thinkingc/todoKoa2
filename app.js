import Koa from 'koa2'
import json from 'koa-json'
import logger from 'koa-logger'
import koaRouter from 'koa-router'
import koaBodyparser from 'koa-bodyparser'
import auth from './server/routes/auth'

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
  // ctx.response.type = 'html'
  // ctx.response.body = '<p>This is 首页 page!</p>'
})

app.on('error', (err, ctx) => {
  console.log('server error', err)
})

router.use('/auth', auth.routes()) // 挂载到koa-router上，同时会让所有的auth请求路径前面加上'/auth'
app.use(router.routes()) // 将路由规则挂到Koa上

app.listen(3000, () => {
  console.log('Koa2 is listening in 3000')
})

module.exports = app
