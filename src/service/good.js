import axios from '../utils/axios'

export function getCategory() {
    return axios.get('/category');
}

export function getGoodsDetail(id) {
    return axios.get(`/products/${id}`)
}

// export function getDetail(id) {
//     return axios.get(`/goods/detail/${id}`);
//   }
