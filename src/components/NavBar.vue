<template>
    <van-tabbar v-model="tabbarActive" active-color="#f00" inactive-color="#666">
        <van-tabbar-item icon="home-o" to="home">首页</van-tabbar-item>
        <van-tabbar-item icon="apps-o" to="category">分类</van-tabbar-item>
        <van-tabbar-item icon="cart-o" to="cart">购物车</van-tabbar-item>
        <van-tabbar-item icon="user-circle-o" to="user">我的</van-tabbar-item>
    </van-tabbar>
</template>

<script setup>

import { useRouter } from "vue-router";
import { onMounted, ref } from 'vue'

const router = useRouter()
const tabbarActive = ref(0);
// const onchangeFn = (inx) => {
//     // console.log(inx)
//     localStorage.setItem('switchTabVal', inx)
// }
const switchMap = new Map([['home', 0], ['category', 1], ['cart', 2], ['user', 3]])

onMounted(() => {
    // let _v = localStorage.getItem('switchTabVal')
    // tabbarActive.value = Number(_v)

    let _v = switchMap.get(router.currentRoute.value.name)
    // console.log(router.currentRoute.value.name)
    // console.log(switchMap.get(router.currentRoute.value.name))
    tabbarActive.value = Number(_v)
})
</script>

<style lang="less" scoped></style>