import Koa from 'koa2'
import json from 'koa-json'
import logger from 'koa-logger'
import koaRouter from 'koa-router'
import koaBodyparser from 'koa-bodyparser'
import auth from './server/routes/auth'
import api from './server/routes/api'
import jwt from 'koa-jwt'
import koaStatic from 'koa-static'
import path from 'path'
import historyApiFallback from 'koa2-history-api-fallback'

const app = new Koa()
const router = koaRouter()

let port = process.env.PORT || 3000

app.use(json())
app.use(logger())
app.use(koaBodyparser())

app.use(async (ctx, next) => {
  let start = new Date()
  await next()
  let ms = new Date() - start
  console.log('%s %s - %s', ctx.method, ctx.url, ms)
})

// 如果JWT验证失败，返回验证失败信息
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = {
        success: false,
        token: null,
        info: 'Protected resource, use Authorization header to get access'
      }
    } else {
      throw err
    }
  }
})

app.on('error', (err, ctx) => {
  console.log('server error', err)
})

router.use('/auth', auth.routes()) // 挂载到koa-router上，同时会让所有的auth请求路径前面加上'/auth'
router.use('/api', jwt({ secret: 'vue-koa-demo' }), api.routes()) // 所有api开头的都走jwt验证

app.use(router.routes()) // 将路由规则挂到Koa上
app.use(historyApiFallback()) // 解决history模式刷新找不到路径问题
app.use(koaStatic(path.resolve('dist'))) // 静态资源路径

app.listen(port, () => {
  console.log(`Koa2 is listening in ${port}`)
})

module.exports = app
