<!--Home.vue-->
<template>
    <div class="home">
        <header class="home-header">
            <router-link tag="i" to="./category"><i class="iconfont icon-logo"></i></router-link>
            <div class="header-search">
                <van-icon name="search" class="search-icon" />
                <router-link tag="span" to="./search?from=home">
                    <span class="search-title">冰箱</span>
                </router-link>
            </div>
            <router-link class="login" tag="span" to="./login" v-if="!state.isLogin">登录</router-link>
            <router-link class="login" tag="span" to="./user" v-else>
                <van-icon name="manager-o" class="icon-user" />
            </router-link>
        </header>
        <swiper :list="state.swiperList"></swiper>


        <div class="grids-content">
            <van-grid :column-num="5" :border="false">
                <van-grid-item v-for="item in state.gridsList " :key="item.id" @click="goTo(item.redirectUrl)"
                    :icon="item.carouselUrl" :text="item.name" />
            </van-grid>
        </div>

        <div class="recommend">
            <img src="	https://image2.suning.cn/uimg/cms/img/164734308289414830.png?format=is" alt="">
        </div>
    </div>
    <nav-bar />
    <!-- <img src="@/assets/1.jpg" alt=""> -->
</template>

<script setup>
import navBar from '@/components/NavBar.vue'
import { reactive, onMounted, nextTick } from 'vue'
import swiper from '@/components/Swiper.vue'
import { useRouter } from 'vue-router'
import { getLocal } from '@/common/js/utils'
import { getHomeCarousels, getHomeGrids } from '@/service/home'
import { showLoadingToast, closeToast, showToast } from 'vant'

const router = useRouter()
const state = reactive({
    isLogin: false, // 是否已登录
    swiperList: [], // 轮播图列表
    gridsList: [], // 宫格图列表
    loading: true,
})

onMounted(async () => {
    const token = getLocal('token')
    if (token) {
        state.isLogin = true
    }
    showLoadingToast({
        message: '加载中...',
        forbidClick: true
    });
    const { data: carouselsData } = await getHomeCarousels()
    const { data: gridsData } = await getHomeGrids()

    // console.log(carouselsData)
    // console.log(gridsData)

    state.swiperList = carouselsData
    state.gridsList = gridsData
    state.loading = false
    closeToast()

})

const goTo = (url) => {
    if (url == '') {
        showToast({
            message: '敬请期待',
            forbidClick: false
        })
    } else {
        router.push({ path: url })
    }
}

</script>

<style lang="less" scoped>
@import '../common/style/mixin';

.home {
    // padding: 0 10px;
    background-color: #f2f2f2;

    .home-header {
        position: fixed;
        left: 0;
        top: 0;
        .wh(100%, 50px);
        .fj();
        line-height: 50px;
        .boxSizing();
        font-size: 15px;
        color: #fff;
        z-index: 10000;
        padding: 0 10px;

        .header-search {
            display: flex;
            width: 76%;
            line-height: 20px;
            margin: 10px 0;
            padding: 5px 0;
            color: #232326;
            background: rgba(255, 255, 255, .7);
            // background-color: red;
            border-radius: 20px;

            .search-icon {
                margin-left: 10px;
                font-size: 20px;
            }

            .search-title {
                padding-left: 10px;
                width: 200px;
                display: block;
            }
        }

        .icon-user {
            font-size: 20px;
            line-height: 50px;
        }

    }

    .grids-content {
        padding-top: 10px;
        // padding-bottom: 10px;
    }

    .recommend {
        width: 100%;

        img {
            max-width: 100%;
        }
    }

}
</style>