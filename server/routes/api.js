import api from '../controllers/todolist.js'
import koaRouter from 'koa-router'
const router = koaRouter()

router.get('/todolist/:id', api.getTodolist) // 获取用户列表，id为用户userid
router.post('/todolist', api.createTodolist) // 新增
router.delete('/todolist/:userId/:id', api.removeTodolist) // 删除
router.put('/todolist/:userId/:id/:status', api.updateTodolist) // 更新状态

export default router
