<template>
    <div class="cart-wrap">
        <s-header :name="'购物车'" :noback="false"></s-header>
        <div class="cart-body">
            <van-checkbox-group @change="groupChange" v-model="state.result" ref="checkboxGroup">
                <van-swipe-cell :right-width="50" v-for="(item, index) in state.list" :key="index">
                    <div class="good-item">
                        <van-checkbox :name="item.id" />
                        <div class="good-img"  @click="goToGoodDetail(item.id)"><img :src="item.goods_cover_img" alt=""></div>
                        <div class="good-desc">
                            <div class="good-title"  @click="goToGoodDetail(item.id)">
                                <!-- <span>{{ item.title }}</span> -->
                                <div class="van-multi-ellipsis--l2">{{ item.title }}</div>
                                <span class="good-count" >x{{ item.goods_count }}</span>
                            </div>
                            <div class="good-btn">
                                <div class="price">¥{{ item.price }}</div>
                                <van-stepper integer :min="1" :max="5" :model-value="item.goods_count" :name="item.id"
                                    async-change @change="onChange" />
                            </div>
                        </div>
                    </div>
                    <template #right>
                        <van-button square icon="delete" type="danger" class="delete-button" @click="deleteGood(item.id)" />
                    </template>
                </van-swipe-cell>
            </van-checkbox-group>

        </div>
        <van-submit-bar v-if="state.list.length > 0" class="submit-all van-hairline--top" :price="total*100" button-text="结算"
            button-type="primary" @submit="onSubmit">
            <van-checkbox @click="allCheck" v-model:checked="state.checkAll">全选</van-checkbox>
        </van-submit-bar>


        
        <!-- <nav-bar /> -->
    </div>

    
</template>

<script setup>
import navBar from '@/components/NavBar.vue'
import { reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
// import { useCartStore } from '@/stores/cart'
import { showToast, showLoadingToast, closeToast, showFailToast } from 'vant'
import sHeader from '@/components/SimpleHeader.vue'
import { getCart, deleteCartItem, modifyCart } from '@/service/cart'

const router = useRouter()
const state = reactive({
    list: [], // 购物车商品列表
    result: [], // 选中的购物车商品 id 数组

    checked:false,
    checkAll: true
})
onMounted(() => {
    init()
})
const init = async () => {
    showLoadingToast({ message: '加载中...', forbidClick: true });
    const { data } = await getCart()
    state.list = data
    if (data) {
        state.result = data.map(item => item.id)
    }
    closeToast()

    // console.log(state.list)
}

const onChange = async (value, detail) => {
    // console.log(value, detail)

    if (value > 5) {
        showFailToast('超出单个商品的最大购买数量')
        return
    }
    if (value < 1) {
        showFailToast('商品不得小于0')
        return
    }

    if (state.list.find(item => item.id == detail.name)?.goodsCount == value) return
    showLoadingToast({ message: '修改中...', forbidClick: true });
    const params = {
        cart_id: detail.name,
        goods_count: value
    }
    await modifyCart(params)

    /**
   * 修改完成后，没有请求购物车列表，是因为闪烁的问题，
   * 这边手动给操作的购物车商品修改数据
  */
    state.list.forEach(item => {
        if (item.id == detail.name) {
            item.goods_count = value
        }
    })
    closeToast()
}

const deleteGood = async (id) => {
    const param = {
        cart_item: id,
    }
    await deleteCartItem(param)
    // cart.updateCart()
    init()
}

const groupChange = (result) => {
    if (result.length == state.list.length) {
        state.checkAll = true
    } else {
        state.checkAll = false
    }
    state.result = result
}

const total = computed(() => {
    let sum = 0
    let _list = state.list.filter(item => state.result.includes(item.id))
    _list.forEach(item => {
        sum += item.price * item.goods_count
    })
    return sum
})

const onSubmit = async () => {
    if (state.result.length == 0) {
        showFailToast('请选择商品进行结算')
        return
    }

    // ToDo
}

const allCheck = () => {
    if (!state.checkAll) {
        state.result = state.list.map(item => item.id)
    } else {
        state.result = []
    }
}


const goToGoodDetail =(goodId)=>{
    let id = Number(goodId)
    router.replace({
        path: `/products/${goodId}`,
    })
}
</script>

<style lang="less" scoped>
@import '../common/style/mixin';


.cart-wrap {
    .cart-body {
        margin: 16px 0 60px 0;
        padding-left: 10px;

        .good-item {
            display: flex;

            .good-img {
                img {
                    .wh(100px, 100px)
                }

                padding-left: 10px;
            }

            .good-desc {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                flex: 1;
                padding: 20px;

                .good-title {
                    display: flex;
                    justify-content: space-between;

                    .good-count{
                        padding-left: 8px;
                        // font-size:5px;
                    }
                }

                .good-btn {
                    display: flex;
                    justify-content: space-between;

                    .price {
                        font-size: 16px;
                        color: red;
                        line-height: 28px;
                    }

                    .van-icon-delete {
                        font-size: 20px;
                        margin-top: 4px;
                    }
                }

            }
        }

        .delete-button {
            width: 50px;
            height: 100%;
        }
    }
}
</style>
