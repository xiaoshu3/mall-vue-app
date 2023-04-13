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
export function getGoodsList(param) {
    // console.log(param)
    // let url = `?page=${param.page}&sort=${param.sort}&categoryId=${param.categoryId}&specGroupId=${param.specGroupId}&brandId=${param.brandId}`
    // if ('keyword' in param) {
    //     url += `&keyword=${param.keyword}`
    // }

    // console.log(url)

    // return axios.get(`/spus${url}`)

    return axios.get('/spus', {
        params: {
            page: param.page,
            sort: param.sort,
            categoryId: param.categoryId,
            specGroupId: param.specGroupId,
            brandId: param.brandId,
            keyword: param.keyword || '',
            order: param.order || 'asc'
        }
    })
}