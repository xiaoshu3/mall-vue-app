<template>
  <div class="create-order">
    <s-header :name="'生成订单'"></s-header>
    <div class="address-wrap">
      <div class="name">
        <span>{{ state.address.name }} </span>

        <span>{{ state.address.phone }}</span>
      </div>
      <div class="address">{{ state.address.province_name }} {{ state.address.city_name }} {{ state.address.region_name }}
        {{ state.address.detail_address }}</div>
      <van-icon class="arrow" name="arrow" />
    </div>
    <div class="good">
      <div class="good-item" v-for="(item, index) in  state.cartList" :key="index">
        <div class="good-img">
          <img :src="item.Spus[0].goods_cover_img" alt="" />
        </div>
        <div class="good-desc">
          <div class="good-title">
            <!-- <span>{{ item.Spus[0].title }}</span> -->
            <div class="van-multi-ellipsis--l2">{{ item.Spus[0].title }}</div>
            <span class="good-count">x{{ item.goods_count }}</span>
          </div>
          <div class="good-btn">
            <div class="price">¥{{ item.Spus[0].price }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-wrap">
      <div class="price">
        <span>商品金额</span>
        <span>¥{{ total }}</span>
      </div>
      <van-button class="pay-btn" color="#1baeae" type="primary" block>生成订单</van-button>
    </div>
  </div>
</template>
  
<script setup>
import { reactive, onMounted, computed } from "vue";
import sHeader from "@/components/SimpleHeader.vue";
import { getByCartItemIds } from '@/service/cart'
import { getDefaultAddress, getAddressDetail } from '@/service/address'
import { showLoadingToast, closeToast, showSuccessToast } from "vant";
import { useRoute, useRouter } from 'vue-router'
import { setLocal, getLocal } from '@/common/js/utils'


const router = useRouter()
const route = useRoute()

const state = reactive({
  cartList: [], // 购物车列表
  address: [] //地址列表
})
onMounted(() => {
  init();
});

const init = async () => {
  showLoadingToast({ message: "加载中...", forbidClick: true });
  const { addressId, cartItemIds } = route.query

  // console.log(cartItemIds)
  // id 会本地存储，如果查询字符串 id 优先获取，若没有则获取本地存储的 ids
  const _cartItemIds = cartItemIds ? JSON.parse(cartItemIds) : JSON.parse(getLocal('cartItemIds'))
  // console.log(_cartItemIds)
  setLocal('cartItemIds', JSON.stringify(_cartItemIds))

  // console.log(_cartItemIds.join(',') )

  const { data: list } = await getByCartItemIds(_cartItemIds.join(','))
  state.cartList = list

  const { data: address } = addressId ? await getAddressDetail(addressId) : await getDefaultAddress()

  if (!address) {
    router.push({ path: '/address' })
    return
  }

  state.address = address


  closeToast()

  console.log(state.address)
  // console.log(state.cartList[0].Spus)
};

const total = computed(() => {
  let sum = 0
  state.cartList.forEach(item => {
    sum += item.goods_count * item.Spus[0].price
  })
  return sum
})
</script>
  
<style lang="less" scoped>
@import "../common/style/mixin";

.create-order {
  background: #f9f9f9;

  .address-wrap {
    margin-bottom: 20px;
    background: #fff;
    position: relative;
    // margin-top: 44px;
    font-size: 14px;
    padding: 15px;
    color: #222333;

    .name,
    .address {
      margin: 10px 0;
    }

    .arrow {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px;
    }

    &::before {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 2px;
      background: -webkit-repeating-linear-gradient(135deg,
          #ff6c6c 0,
          #ff6c6c 20%,
          transparent 0,
          transparent 25%,
          #1989fa 0,
          #1989fa 45%,
          transparent 0,
          transparent 50%);
      background: repeating-linear-gradient(-45deg,
          #ff6c6c 0,
          #ff6c6c 20%,
          transparent 0,
          transparent 25%,
          #1989fa 0,
          #1989fa 45%,
          transparent 0,
          transparent 50%);
      background-size: 80px;
      content: "";
    }
  }

  .good {
    margin-bottom: 120px;
  }

  .good-item {
    padding: 10px;
    background: #fff;
    display: flex;

    .good-img {
      img {
        .wh(100px, 100px);
      }
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

        .good-count {
          padding-left: 8px;
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

  .pay-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    padding: 10px 0;
    padding-bottom: 50px;
    border-top: 1px solid #e9e9e9;

    >div {
      display: flex;
      justify-content: space-between;
      padding: 0 5%;
      margin: 10px 0;
      font-size: 14px;

      span:nth-child(2) {
        color: red;
        font-size: 18px;
      }
    }

    .pay-btn {
      position: fixed;
      bottom: 7px;
      right: 0;
      left: 0;
      width: 90%;
      margin: 0 auto;
    }
  }
}
</style>