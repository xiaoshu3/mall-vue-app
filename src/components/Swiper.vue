

<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#1baeae">
    <van-swipe-item v-for="(item, index) in list" :key="index">
      <img :src="item.carouselUrl" alt="" @click="goTo(item.redirectUrl)">
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import router from '@/router'
import { showToast } from 'vant'
export default {
  props: {
    list: Array
  },
  methods: {
    goTo(url) {
      // window.open(url)
      // router.push({ path: url })
      if (url != '') {
        router.push({ path: url })
      } else {
        showToast({
          message: '敬请期待',
        })
      }
    }
  },

  // setup() {
  //   const getImageUrl = (name) => {
  //     return new URL(`${name}`, import.meta.url).href
  //   }

  //   return getImageUrl
  // }
}
</script>

<style lang='less' scoped>
.my-swipe {
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
