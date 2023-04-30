import axios from '../utils/axios'

export function addCart(params) {
    return axios.post('/shop-cart', params);
}

export function modifyCart(params) {
    return axios.put('/shop-cart', params);
}

export function getCart() {
    return axios.get('/shop-cart');
}

export function deleteCartItem(params) {
    // return axios.delete(`/shop-cart/${id}`);
    return axios.delete('/shop-cart', {
        data: params
    })
}

export function getByCartItemIds(params) {
    return axios.get('/shop-cart/settle', {
        params: {
            CartItemIds: params
        }
    })
}