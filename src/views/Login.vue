<template>
    <div class="login">
        <s-header :name="state.type == 'login' ? '登录' : '注册'" :back="'/home'" />
        <img class="logo" src="@/assets/login.jpg" alt="">
        <div v-if="state.type == 'login'" class="login-body">
            <van-form @submit="onSubmit">
                <van-cell-group inset>
                    <van-field clearable v-model="state.username" name="username" label="用户名" placeholder="手机或用户名"
                        :rules="[{ required: true, message: '请填写手机或用户名' }]" />
                    <van-field clearable v-model="state.password" type="password" name="password" label="密码"
                        placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />

                    <van-field center clearable label="验证码" placeholder="输入验证码" v-model="state.verify">
                        <template #button>
                            <vue-img-verify ref="verifyRef" />
                        </template>
                    </van-field>
                </van-cell-group>
                <div style="margin: 16px;">
                    <div class="link-register" @click="toggle('register')">立即注册</div>
                    <van-button round block type="primary" native-type="submit">
                        登录
                    </van-button>
                </div>
            </van-form>
        </div>
        <div v-else class="register-body">
            <van-form @submit="onSubmit">
                <van-cell-group inset>
                    <van-field clearable v-model="state.username" name="phone" label="手机号" placeholder="手机号"
                        :rules="[{ required: true, message: '请填写手机号' }]" />
                    <van-field clearable v-model="state.password" type="password" name="password" label="密码"
                        placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />
                    <van-field clearable v-model="state.password1" type="password" name="password1" label="确认密码"
                        placeholder="再次输入密码" :rules="[{ required: true, message: '请再次输入密码' }]" />
                    <van-field center clearable label="验证码" placeholder="输入验证码" v-model="state.verify">
                        <template #button>
                            <vue-img-verify ref="verifyRef" />
                        </template>
                    </van-field>
                </van-cell-group>
                <div style="margin: 16px;">
                    <div class="link-login" @click="toggle('login')">已有账号去登录</div>
                    <van-button round block type="primary" native-type="submit">
                        注册
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script setup>
import sHeader from '@/components/SimpleHeader.vue'
import vueImgVerify from '@/components/VueImageVerify.vue'
import { reactive, ref } from 'vue';
import { showSuccessToast, showFailToast, closeToast } from 'vant'
import { loginUsingPassword, signupUsingPhone } from '@/service/user'
import { setLocal, getLocal } from '@/common/js/utils'
import { onMounted } from 'vue';

const verifyRef = ref(null)
const state = reactive({
    username: '',
    password: '',
    password1: '',
    type: 'login',
    imgCode: '',
    verify: ''
})

const toggle = (v) => {
    state.type = v
    state.verify = ''
}
const onSubmit = async (values) => {
    state.imgCode = verifyRef.value.state.imgCode || ''
    if (state.verify.toLowerCase() != state.imgCode.toLowerCase()) {
        showFailToast('验证码有误')
        return
    }

    if (state.type == 'login') {
        // const { data } = await loginUsingPassword({
        //     login_id: values.username,
        //     password: values.password
        // })

        await loginUsingPassword({
            login_id: values.username,
            password: values.password
        })

        showSuccessToast('登录成功')
        window.location.href = '/'
    } else {
        if (state.password != state.password1) {
            showFailToast('两次输入的密码不一致')
        } else {

            await signupUsingPhone({
                phone: values.phone,
                password: values.password,
                password_confirm: values.password1
            })
            showSuccessToast('注册成功')
            state.type = 'login'
            state.verify = ''
        }
    }
    // closeToast()
    return
}

</script>


<style lang="less" scoped>
.login {
    .logo {
        width: 160px;
        height: 150px;
        display: block;
        margin: 40px auto 20px;
    }

    .login-body {
        .link-register {
            font-size: 14px;
            margin-bottom: 15px;
            color: #1989fa;
            display: inline-block;
            padding-left: 16px;
        }
    }

    .register-body {
        .link-login {
            font-size: 14px;
            margin-bottom: 15px;
            color: #1989fa;
            display: inline-block;
            padding-left: 16px;
        }
    }
}
</style>