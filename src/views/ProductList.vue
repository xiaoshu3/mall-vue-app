<template>
    <div class="product-list-wrap">

        <header class="product-list-content van-hairline--bottom">
            <i class="iconfont icon-left" @click="goBack"></i>
            <div class="header-search">
                <van-icon name="search" class="search-icon" />
                <router-link tag="span" to="./search">
                    <input type="text" class="search-text" readonly="readonly" v-model="state.keyword" />
                </router-link>
            </div>
            <i class="iconfont icon-more2 "></i>
        </header>

        <van-sticky>
            <van-tabs @click-tab="changeTab">
                <van-tab title="综合" name="id"></van-tab>
                <van-tab title="新品" name="created_at"></van-tab>
                <van-tab title="价格" name="price"></van-tab>
            </van-tabs>
        </van-sticky>

        <div class="content">
            <van-pull-refresh v-model="state.refreshing" @refresh="onRefresh">
                <van-list v-model:loading="state.loading" :finished="state.finished"
                    :finished-text="state.productList.length ? '没有更多了' : '搜索想要的商品'" @load="onLoad" @offset="100">

                    <template v-if="state.productList.length">
                        <div class="product-item" v-for="(item, index) in state.productList" :key="index"
                            @click="productDetail(item)">
                            <img :src="item.goods_cover_img" alt="" />
                            <div class="product-info">

                                <div class="title van-multi-ellipsis--l2">{{ item.title }}</div>
                                <div class="subtitle van-multi-ellipsis--l2">{{ item.subTitle }}</div>
                                <div class="price">
                                    <em class="price-num">￥</em>
                                    <strong>{{ item.price }}</strong>
                                </div>
                            </div>

                        </div>
                    </template>
                </van-list>
            </van-pull-refresh>
        </div>
    </div>
</template>

<script setup>
import { getGoodsList } from '@/service/good'
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const state = reactive({
    keyword: route.query.keyword || '',
    sort: 'id',
    order: 'asc',
    frompath: route.query.from || '',
    specGroupId: route.query.specGroupId || '',
    categoryId: route.query.categoryId || '',
    brandId: route.query.brandId || '',


    loading: false,
    finished: false,
    refreshing: false,
    productList: [],
    totalPage: 0,
    page: 1,

})

const init = async () => {

    if (!state.categoryId && !state.brandId && !state.keyword) {
        state.finished = true
        state.loading = false;
        return
    }

    var param = { page: state.page, sort: state.sort, categoryId: state.categoryId, specGroupId: state.specGroupId, brandId: state.brandId, }
    if (state.frompath == 'search') {
        param.keyword = state.keyword
    }
    if (state.order == 'desc') {
        param.order = state.order
    }
    const { pager, data } = await getGoodsList(param)

    // console.log(data)
    // console.log(pager)

    state.productList = state.productList.concat(data)
    state.totalPage = pager.TotalPage
    // console.log( pager.TotalPage)
    state.loading = false
    if (pager.TotalPage == 0 || state.page >= state.totalPage ) state.finished = true

}

const goBack = () => {
    router.go(-1)
}

const changeTab = ({ name }) => {
    // console.log('name', name)
    state.sort = name
    state.order = 'asc'
    if (name == 'created_at') {
        state.order = 'desc'
    }
    onRefresh()
}

const onLoad = () => {
    if (!state.refreshing && state.page < state.totalPage) {
        state.page = state.page + 1
    }
    if (state.refreshing) {
        state.refreshing = false
        state.productList = []
    }

    init()
}

const productDetail = (item) => {
    router.push({ path: `/products/${item.id}` })
}

const onRefresh = () => {
    state.refreshing = true
    state.finished = false
    state.loading = true
    state.page = 1
    // state.order = 'asc'
    onLoad()
}
</script>

<style lang="less" scoped>
@import '../common/style/mixin';

.product-list-wrap {


    .product-list-content {
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

        .header-search {
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
                width: 200px;
            }
        }
    }

    .content {
        .product-item {
            .fj();
            width: 100%;
            height: 120px;
            padding: 10px 0;
            border-bottom: 1px solid #dcdcdc;

            img {
                width: 140px;
                height: 120px;
                padding: 0 10px;
                .boxSizing();
            }

            .product-info {
                width: 60%;
                height: 120px;
                // padding: 5px;
                padding-right: 10px;
                text-align: left;


                .title {
                    font-size: 15px;
                    line-height: 18px;

                }

                .subtitle {
                    margin: 10px 0;
                    color: #999;
                    font-size: 5px;
                }

                .price {
                    margin-top: 15px;
                    color: #F60;
                    font-size: 20px;

                    .price-num {
                        font-size: 5px;
                    }
                }
            }
        }
    }
}
</style>