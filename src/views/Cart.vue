<template>
    <div>
        Cart
    </div>

    <nav-bar />
</template>

<script setup>
import navBar from '@/components/NavBar.vue'
import { onMounted } from 'vue';

const getName = () => {
    return new URL(`../assets/blogPhotos/test.jpg`, import.meta.url).href;
}

onMounted(() => {
    // console.log('import.meta.url', import.meta.url)
    // console.log('22', new URL(`../assets/blogPhotos/test.jpg`, import.meta.url))
    // console.log(getName())
})
</script>