import axios from '../utils/axios'

export function getCategory() {
    return axios.get('/category');
}

