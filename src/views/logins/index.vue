<template>
  <div class="login-wrap" @keydown.enter.native="submitLogin">
    <div class="login">
      <div class="header">
        <p class="description">法律机器人应用平台</p>
      </div>
      <div class="login-form">
        <el-tabs v-model="tabName">
          <el-tab-pane name="username">
            <span slot="label">
              <i class="el-icon-user-solid"></i> 邮箱密码登录
            </span>
            <el-form
              ref="usernameLoginForm"
              :model="form"
              :rules="rules"
              class="form"
              v-if="tabName == 'username'"
            >
              <el-form-item prop="username">
                <el-input
                  v-model="form.username"
                  prefix-icon="el-icon-user"
                  size="large"
                  clearable
                  placeholder="请输入登录邮箱"
                  autocomplete="off"
                />
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  type="password"
                  v-model="form.password"
                  prefix-icon="el-icon-lock"
                  size="large"
                  clearable
                  placeholder="请输入密码"
                  autocomplete="off"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <el-button
          class="login-btn"
          type="primary"
          size="large"
          :loading="loading"
          @click="submitLogin"
        >
          <span v-if="!loading">登录</span>
          <span v-else>登录中...</span>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { login, userInfo } from "@/api/permission";
export default {
  data() {
    return {
      tabName: "username",
      loading: false,
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入登录邮箱",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitLogin() {
      if (this.tabName === "username") {
        this.$refs.usernameLoginForm.validate((valid) => {
          if (valid) {
            this.loading = true;
            var params = {
              username: this.form.username,
              password: this.form.password,
              loginType: "userLogin",
              accountType: 0,
            };
            login(params)
              .then((res) => {
                if (res.success === true) {
                  localStorage.setItem("accessToken", res.data.access_token);
                  this.loading = false;
                  this.$router.push("/");
                } else {
                  this.$message.error(res.message);
                }
              })

          }
        });
      }
    },
  },
};
</script>
<style lang="less">
.login-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url("../../assets/images/loginBac.jpg");
  .login {
    width: 368px;
    position: relative;
    .header {
      margin-top: 9vh;
      margin-bottom: 6vh;
      text-align: center;
      .description {
        font-size: 30px;
        font-weight: 600;
        margin-top: 1vh;
      }
    }
  }
  .login-form {
    background-color: #fff;
    padding: 0 20px 20px;
    box-shadow: 0 0 20px #ddd;
    .form {
      padding-top: 1vh;
    }
    .login-btn {
      display: inline-block;
      width: 100%;
      margin-top: 3vh;
    }
  }
  .el-tabs__item {
    line-height: 2;
    font-size: 17px;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    position: relative;
    zoom: 1;
  }
  .el-tabs__nav {
    padding-top: 8px;
  }
  .el-input__inner {
    border-radius: 4px;
  }
  .el-input__icon {
    line-height: 43px;
  }
}
</style>