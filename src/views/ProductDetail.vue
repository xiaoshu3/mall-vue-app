<template>
    <div class="goods-wrap">
        <s-header :name="'商品详情'"></s-header>
        <van-swipe class="my-swipe" indicator-color="#1baeae">
            <van-swipe-item v-for="(item, index) in state.carouselsList || '' " :key="index">
                <img :src=item alt="">
            </van-swipe-item>
        </van-swipe>

        <div class="price-content">
            <div class="red-price">
                <span>
                    <i class="symbol">¥</i>
                    {{ state.goodsDetail.price || '' }}
                    <!-- <i class="symbol">.00</i> -->
                </span>

                <span class="discount">促销价</span>
            </div>

            <div class="title">
                {{ state.goodsDetail.title || '' }}
            </div>
            <div class="subtitile">
                {{ state.goodsDetail.subTitle || '' }}
            </div>
        </div>

        <div class="goods-content">
            <van-tabs v-model:active="tabActive" class="tabs">
                <van-tab title="图文详情">
                    <div class="htmm-detail">
                        <div v-html="state.goodsContentList[0] || ''"></div>
                    </div>
                </van-tab>
                <van-tab title="规格参数">
                    <div class="specification" v-html="state.goodsContentList[1] || ''"></div>
                </van-tab>
                <van-tab title="售后服务">
                    <div class="servide-id" v-html="state.goodsContentList[2] || ''"></div>
                </van-tab>
            </van-tabs>
        </div>

        <!-- <div v-html="state.goodsContentList[0] || ''"></div> -->
    </div>
</template>


<script setup>
import sHeader from '@/components/SimpleHeader.vue'
import { reactive, onMounted, nextTick, ref, } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getGoodsDetail } from '@/service/good'
import { showLoadingToast, closeToast, showToast, colProps } from 'vant'
import { onUpdated } from 'vue'

const tabActive = ref(0)
const domWidth = ref(400)
const route = useRoute()
const router = useRouter()


const state = reactive({
    // 
    goodsDetail: [{ price: "", title: "", subTitle: "", }],
    carouselsList: [{}],
    goodsContentList: [],
})

onMounted(async () => {
    const { id } = route.params
    showLoadingToast("加载中")
    const { data } = await getGoodsDetail(id)
    domWidth.value = (window.innerWidth) + 'px'
    // cart.updateCart()

    state.carouselsList = data.carousels.split(",")
    // state.carouselsList.reverse()
    state.goodsContentList = data.goods_detail_content.split("ABCDEFGH123456")

    state.goodsDetail = data

    // console.log(state.goodsDetail.goods_detail_content)
    // console.log(state.goodsContentList)
    closeToast()
    // console.log(state.carouselsList)     
    // console.log(state.goodsContentList)


    // v[0].onclick = function () {
    //     console.log("clicked")
    //     if (v[0].paused) {
    //         v[0].play();
    //     } else {
    //         v[0].pause();
    //     }
    // }
})

// nextTick(() => {
//     var v = document.getElementsByTagName("video")
// })

const videoCntrols = () => {
    var v = document.getElementsByTagName("video")
    // v.attributes
    // console.log(v)
    // console.log(v.attributes)
}


</script>

<script>
let v = document.getElementsByTagName("video")[0]
let videoBtn = document.getElementsByClassName("player-play-btn")
// console.log(v)
// console.log(videoBtn)
</script>

<style lang="less" scoped>
@import '../common/style/mixin';
// @import '../common/style/productDetail';

.goods-wrap {
    background-color: #f2f2f2;
    // width: 100%;

    .my-swipe {
        img {
            width: 100%;
            height: 100%;
        }
    }

    .price-content {
        background-color: #fff;
        padding: 15px 15px 0;

        .red-price {
            color: red;
            padding: 12px 0 0;
            font-size: 30px;
            font-weight: bold;

            .symbol {
                font-size: 18px;
                vertical-align: middle
            }

            .discount {
                font-size: 12px;
                // font-weight: normal;
                border: 1px solid #f42;
                border-radius: 6px;
                padding: 0 8px;
                line-height: 40px;
                vertical-align: middle // display: flex;
            }
        }

        .title {
            // font-weight: bold;
            font-style: normal;
            font-size: 20px;
            word-wrap: break-word;
            font-weight: 700;
            margin-bottom: 8px;
        }

        .subtitile {
            color: rgb(153, 153, 153);
            font-size: .38rem;
            padding-bottom: 12px;
        }
    }

    .goods-content {
        max-width: 100%;
        .boxSizing();

        .tabs {
            margin: 10px 0px 20px;

            .htmm-detail {
                max-width: 100%;
                .boxSizing();
            }
        }
    }
}
</style>


<style>
.ppcloud-player .mobile-player {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}


.ppcloud-player {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    /* position: absolute; */

    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
}

.ppcloud-video {
    width: 100%;
    height: 100%;
}

.player-loading {
    display: none;
}

.sn-drawer {
    padding: 0 10px;
    position: relative;
    font-size: 14px
}

.ppcloud-player .player-play-btn {
    width: 80px;
    height: 80px;
    background-image: url(data:image/png;base64,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);
}

.ppcloud-player .player-play-btn {
    /* display: none; */
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    z-index: 11;
    background-size: 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    border-radius: 50%;
}

.sn-drawer .sn-drawer-lefttext {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 0.52rem 0;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
}

.sn-drawer-body {
    margin: 0;
    padding: 0;
}

.sn-drawer-body-content {
    color: #909090;
    /* padding: 0.15rem 0; */
}

.sn-drawer-body-content li {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    padding: 0.2rem 0;
}

ol,
ul {
    margin: 0;
    padding: 0;
    list-style: none;
}

li {
    display: flex;
}

.sn-drawer-body-content li div {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
}

.content-detail .tab-desc {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background: #fff;
}
</style>
