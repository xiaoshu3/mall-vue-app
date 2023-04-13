<template>
    <div class="search-wrap">
        <header class="search-header van-hairline--bottom">
            <i class="iconfont icon-left" @click="goBack"></i>
            <div class="search-input">
                <van-icon name="search" class="search-icon" />
                <input type="text" ref="input" placeholder="请搜索商品" class="search-text" v-model="state.keyword" />
            </div>
            <span @click="getSearch">搜索</span>
        </header>

        <div class="search-content">
            <span class="search-titile">热门搜索</span>
            <div class="search-tabs">
                <van-grid :column-num="3" :gutter="14">
                    <van-grid-item v-for="(item, idnex) in searchRecommend " :key="index" :text=item
                        @click="selectItem(item)" />
                </van-grid>
            </div>
        </div>
    </div>
</template>

<script setup>

import { onMounted, ref } from 'vue';
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const input = ref(null)
onMounted(() => {
    input.value.focus()
})

const searchRecommend = ['冰箱', '洗衣机', '电视', '美的', '海尔', '空调', '65寸电视']
const state = reactive({
    keyword: route.query.keyword || '',
})


const goBack = () => {
    router.go(-1)
}

const getSearch = () => {
    if (state.keyword != '') {
        router.push({
            path: '/product-list',
            query: {
                from: 'search',
                keyword: state.keyword,
            }
        })
    }
}

const selectItem = (item) => {
    state.keyword = item
    getSearch()
}
</script>

<style lang="less" scoped>
@import '../common/style/mixin';

.search-wrap {
    .search-header {
        background: #fff;
        // position: fixed;
        left: 0;
        top: 0;
        .fj();
        .wh(100%, 45px);
        line-height: 45px;
        padding: 0 15px;
        box-sizing: border-box;
        font-size: 15px;
        color: #656771;
        z-index: 10000;

        .search-input {
            display: flex;
            width: 80%;
            height: 20px;
            line-height: 20px;
            margin: 5px 0;
            padding: 5px 0;
            background: #EEE;
            border-radius: 4px;

            .search-icon {
                margin-left: 10px;
                font-size: 20px;
            }

            .search-text {
                // color: #656771;
                background: #EEE;
                width: 250px;
            }
        }
    }

    .search-content {
        margin-top: 10px;
        padding: 15px;

        .search-titile {
            color: #999;
            font-size: 15px;
            padding-left: 12px;
        }

        .search-tabs {
            margin-top: 15px;
        }

        .search-tabs ::v-deep(.van-grid-item__content) {
            height: 5px;
            background-color: #f2f2f2;
        }
    }

}
</style>