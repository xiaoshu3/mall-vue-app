

import axios from '../utils/axios'

export function getHomeCarousels() {
    return axios.get('/home/carousels');
}

export function getHomeGrids() {
    return axios.get('/home/grids');
}
