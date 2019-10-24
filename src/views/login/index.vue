<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">登陆</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="邮箱"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >Login</el-button>
    </el-form>
    <div id="captcha"></div>
  </div>
</template>

<script>
import { validEmail } from "@/utils/validate";
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      let email = value.trim();
      if (!email) {
        callback(new Error("请输入邮箱"));
      } else if (!validEmail(email)) {
        callback(new Error("邮箱格式不正确"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "orgadmin@163.com",
        password: "123456"
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      captchaIns: null
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  mounted() {
    this.initLoginImage();
  },
  methods: {
    ...mapActions("user", ["login"]),
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin(validate) {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.captchaIns.popUp();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    loginSys(validate) {
      this.loading = true;
      let params = { ...this.loginForm, validate: validate };
      this.login(params).then(
        () => {
          this.$router.push({ path: this.redirect || "/" });
          this.loading = false;
        }
      );
    },
    getTimestamp(msec) {
      msec = !msec && msec !== 0 ? msec : 1;
      return parseInt(new Date().valueOf() / msec, 10);
    },
    initLoginImage() {
      let that = this;
      var url =
        "https://cstaticdun.126.net/load.min.js" +
        "?t=" +
        this.getTimestamp(1 * 60 * 1000); // 时长1分钟，建议时长分钟级别
      this.loadScript(url, function() {
        // 进行初始化验证码等后续逻辑
        initNECaptcha(
          {
            // eslint-disable-line
            element: "#captcha",
            captchaId: "570b62688e8d4a47926635c8f62e9a2c",
            mode: "popup",
            width: "320px",
            onClose: function() {
              // 弹出关闭结束后将会触发该函数
            },
            onVerify: function(err, data) {
              /**
               * 第一个参数是err（Error的实例），验证失败才有err对象
               * 第二个参数是data对象，验证成功后的相关信息，data数据结构为key-value，如下：
               * {
               *   validate: 'xxxxx' // 二次验证信息
               * }
               **/
              if (err) return; // 当验证失败时，内部会自动refresh方法，无需手动再调用一次
              // that.ajaxlogin(data.validate)
              that.loginSys(data.validate);
              that.captchaIns.refresh();
            }
          },
          function(instance) {
            // 初始化成功后得到验证实例instance，可以调用实例的方法
            console.log("初始化成功");
            that.captchaIns = instance;
          },
          function(err) {
            console.log("err", err);
            // 初始化失败后触发该函数，err对象描述当前错误信息
          }
        );
      });
    },
    loadScript(src, cb) {
      var head = document.head || document.getElementsByTagName("head")[0];
      var script = document.createElement("script");
      cb = cb || function() {};
      script.type = "text/javascript";
      script.src = src;
      if (!("onload" in script)) {
        script.onreadystatechange = function() {
          if (this.readyState !== "complete" && this.readyState !== "loaded")
            return;
          this.onreadystatechange = null;
          cb(script);
        };
      }
      script.onload = function() {
        this.onload = null;
        cb(script);
      };
      head.appendChild(script);
    }
  }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    border-radius: 6px;
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 80px;
    margin: 0 auto;
    overflow: hidden;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
