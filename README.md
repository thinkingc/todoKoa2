# todokoa2

> A Vue.js + Koa2 project

> app.js > routes.js > controllers.js > models.js

> app.js：挂载路由  
> router.js：创建路由 例：router.get('/todolist/:id', api.getTodolist)
> controllers：负责接收前端的传参，然后交给 models 处理，拿到 models 的数据，最后挂载到响应体中（ctx.body）  
> models：负责直接操作数据库

## Build Setup

```bash
// 前端项目启动
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

// 后端项目启动
# 启动数据库服务器程序（如：phpstudy）
# node app.js || server.js
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
