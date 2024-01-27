import axios from "axios";

const APY_KEY = 'live_XoqBpjBOBhi4Mxp0uAtNPBYMKHC2s7AGJH7hzvpnhXAnjlaQH6QuAJzfktubymDJ'
axios.defaults.headers.common["x-api-key"] = APY_KEY;

const HOST = 'https://api.thecatapi.com/v1'

function errorHandler(error) {
    console.error(error)
    return Promise.reject(error)
}

export function fetchBreeds() {
    return axios.get(`${HOST}/breeds`)
        .then(response => response.data)
        .catch(errorHandler)
}

export function fetchCatByBreed(breedId) {
    if (!breedId) {
        return Promise.resolve([])
    }
    return axios.get(`${HOST}/images/search?breed_ids=${breedId}`)
        .then(response => response.data)
        .catch(errorHandler)
}