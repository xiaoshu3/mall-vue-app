<template>
    <s-header :name="'商城分类'"></s-header>
    <div class="category-box">
        <van-row>
            <van-col span="7" class="sidebarName" :style="{ height: domHeight }">
                <van-sidebar v-model="currentIndex">
                    <van-sidebar-item v-for="item in state.categoryData" :key="item.id" :title="item.name"
                        @click="selectMenu(item.id)" />
                </van-sidebar>
            </van-col>

            <van-col span="17" class="sidebarGoods" :style="{ height: domHeight }">

                <b>{{ state.categoryData[currentIndex].name }}</b>
                <van-grid :column-num="3" :gutter="2" :border="false">
                    <van-grid-item v-for="item in state.categoryData[currentIndex].categorys" :key="item.id"
                        @click="selectCategory(item)">
                        <img :src="item.image" class="category-img">
                        <p v-text="item.name" class="product-title"></p>
                    </van-grid-item>
                </van-grid>

                <b>品牌</b>
                <van-grid :column-num="3" :gutter="2" :border="false">
                    <van-grid-item v-for="item in state.categoryData[currentIndex].brands" :key="item.id"
                        @click="selectBrand(item)">
                        <img :src="item.image" class="category-img">
                        <p v-text="item.name" class="product-title"></p>
                    </van-grid-item>
                </van-grid>

                <!-- </van-grid> -->
            </van-col>
        </van-row>
    </div>


    <nav-bar />
</template>

<script setup>
import navBar from '@/components/NavBar.vue'
import { useRouter } from 'vue-router'
import { getCategory } from "@/service/good"
import { reactive, onMounted, ref, } from 'vue'
import { showLoadingToast, closeToast } from 'vant'
import sHeader from '@/components/SimpleHeader.vue'
import router from '../router'

const domHeight = ref(0)
const currentIndex = ref(0)
let specGroupId = 1

const state = reactive({
    categoryData: [{ 'name': '', 'categorys': [], 'brands': [] }],
    // categoryIndex: 0,
})

onMounted(async () => {
    domHeight.value = (window.innerHeight - 100) + 'px';
    window.addEventListener('resize', function () {
        domHeight.value = (window.innerHeight - 100) + 'px'
    });

    showLoadingToast('加载中...')
    const { data } = await getCategory()
    closeToast()

    if (data !== null) {
        state.categoryData = data
    }

    // console.log(state.categoryData)

    // console.log(typeof (state.categoryData[0].name))
    // console.log((state.categoryData[0].name))

})

const selectMenu = (index) => {
    specGroupId = index
    // console.log(specGroupId)
}

const selectCategory = (item) => {
    // console.log(item)
    router.push({
        path: '/product-list',
        query: {
            from: 'category',
            keyword: item.name,
            categoryId: item.id,
        }

    })
}

const selectBrand = (item) => {
    // console.log(item)
    router.push({
        path: '/product-list',
        query: {
            from: 'category',
            keyword: item.name + ' ' + state.categoryData[specGroupId].name,
            brandId: item.id,
            specGroupId: specGroupId,
        }
    })
}

</script>

<style lang="less" scoped>
@import '../common/style/mixin';

.category-box {
    .sideBarName {
        overflow-y: scroll;
        text-align: center;
    }

    .sidebarGoods {
        // background-color: aqua;
        padding: 20px 10px;
        overflow-y: scroll;



        .category-img {
            .wh(100%, 100%)
        }

        .product-title {
            font-size: 12px;
            font-family: PingFangSC-Regular;
            // overflow: hidden;
            color: #666;
            letter-spacing: 0;
            text-align: center;
        }
    }
}
</style>