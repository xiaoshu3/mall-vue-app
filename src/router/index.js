import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),

    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('@/views/Home.vue')
        },
        {
            path: '/category',
            name: 'category',
            component: () => import('@/views/Category.vue')
        },
        {
            path: '/cart',
            name: 'cart',
            component: () => import('@/views/Cart.vue')
        },
        {
            path: '/user',
            name: 'user',
            component: () => import('@/views/User.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/Login.vue')
        },

        {
            path: '/products/:id',
            name: 'product',
            component: () => import('@/views/ProductDetail.vue')
        },

        {
            path: '/product-list',
            name: 'product-list',
            component: () => import('@/views/ProductList.vue')
        },
        {
            path: '/search',
            name: 'search',
            component: () => import('@/views/Search.vue')
        },
        {
            path: '/create-order',
            name: 'create-order',
            component: () => import('@/views/CreateOrder.vue')
        },
    ]
})

export default router // 将路由实例抛出