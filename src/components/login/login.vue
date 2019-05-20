<template>
  <div>
    <!-- <el-row class="content">
      <el-col :xs="24" :sm="{span: 6,offset: 9}">
        <span class="title">
          欢迎登录
        </span>
        <el-row>
          <el-input v-model="account" placeholder="账号" type="text">
          </el-input>
          <el-input v-model="password" placeholder="密码" type="password" @keyup.enter.native="loginToDo">
          </el-input>
          <el-button type="primary" @click="onSubmitSign">登录</el-button>
        </el-row>
      </el-col>
    </el-row> -->
    <el-row class="content">
      <el-col :xs="24" :sm="{span: 14,offset: 5}">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="登录" name="login">
            <el-form :model="signForm" ref="signForm" :rules="signRules" label-width="80px">
              <el-form-item label="账号" prop="name">
                <el-input v-model="signForm.name"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="signForm.password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmitSign('signForm')">登录</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="注册" name="register">
            <el-form :model="regForm" ref="regForm" :rules="regRules" label-width="80px">
              <el-form-item label="账号" prop="name">
                <el-input v-model="regForm.name"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="regForm.password"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPassword">
                <el-input type="password" v-model="regForm.checkPassword"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmitReg('regForm')">注册</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.regForm.checkPassword !== '') {
          this.$refs.regForm.validateField('checkPassword');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.regForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      activeName: 'login',
      signForm: {
        name: '',
        password: '',
      },
      signRules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
      },
      regForm: {
        name: '',
        password: '',
        checkPassword: ''
      },
      regRules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    // 切换tabs
    handleClick () {
    },
    // 登录
    onSubmitSign (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 将信息发送给后端
          const result = this.$http.post('/auth/user', this.signForm)
          result.then((res) => {
            if (res.data.success) { // 如果成功
              sessionStorage.setItem('demo-token', res.data.token) // 用sessionStorage把token存下来
              this.$message({ // 登录成功，显示提示语
                type: 'success',
                message: '登录成功！'
              })
              this.$router.push('/todolist') // 进入todolist页面，登录成功
            } else {  // 如果失败
              this.$message.error(res.data.info) // 登录失败，显示提示语
              sessionStorage.setItem('demo-token', null) // 将token清空
            }
          }, (err) => {
            console.log(err)
            this.$message.error('请求错误！')
            sessionStorage.setItem('demo-token', null) // 将token清空
          })
          // return result
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    // 注册
    onSubmitReg (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 将信息发送给后端
          const result = this.$http.post('/auth/user', this.regForm)
          result.then((res) => {
            if (res.data.success) { // 如果成功
              sessionStorage.setItem('demo-token', res.data.token) // 用sessionStorage把token存下来
              this.$message({ // 注册成功，显示提示语
                type: 'success',
                message: '注册成功！'
              })
              this.$router.push('/todolist') // 进入todolist页面，注册成功
            } else {  // 如果失败
              this.$message.error(res.data.info) // 注册失败，显示提示语
              sessionStorage.setItem('demo-token', null) // 将token清空
            }
          }, (err) => {
            console.log(err)
            this.$message.error('请求错误！')
            sessionStorage.setItem('demo-token', null) // 将token清空
          })
          // return result
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    }

  }
}
</script>

<style lang="stylus" scoped>
.el-row.content
  margin-top 150px
  padding 16px
  >>> .el-tabs .el-tabs__header
    margin-bottom 0
  >>> .el-tabs__content
    margin-top -1px
    padding 20px
    border 1px solid #E4E7ED
.title
  font-size 28px
.el-input
  margin 12px 0
.el-button
  width 100%
  margin-top 12px
</style>