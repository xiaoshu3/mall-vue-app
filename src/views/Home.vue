<!--Home.vue-->
<template>
    <div>
        <van-button type="primary">Home</van-button>
        <div class="father">
            <span class="son">son</span>
        </div>
        <el-button type="primary">Primary</el-button>

        <div><i class="iconfont icon-logo"></i></div>
    </div>
    <nav-bar />
</template>

<script setup>
import navBar from '@/components/NavBar.vue'
</script>

<style lang="less" scoped>
.father {
    .son {
        color: red;
    }
}
</style>