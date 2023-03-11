import axios from '../utils/axios'

export function loginUsingPassword(params) {
    return axios.post('/auth/login/using-password', params);
}

export function signupUsingPhone(params) {
    return axios.post('/auth/signup/using-phone', params);
}