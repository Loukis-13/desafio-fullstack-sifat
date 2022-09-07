import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth'

export const usePostsStore = defineStore('posts', () => {
    const baseUrl = 'http://localhost:8000/v1/posts/'
    const auth = useAuthStore()

    let posts = ref({})
    let currentPage = ref(baseUrl)

    
    function getHeaders() {
        return { headers: { Authorization: `Bearer ${auth.accessToken}` } }
    }

    async function handleAxiosCall(promisse, callback) {
        await promisse
            .then(res => get())
            .catch(async err => {
                console.error(err)
                if (err.response.status == 401 && await auth.refresh()) callback()
            })
    }

    async function get(url) {
        if (url) currentPage.value = url
        posts.value = await (await axios.get(currentPage.value)).data
    }

    async function post(message) {
        handleAxiosCall(axios.post(baseUrl, { message }, getHeaders()), () => post(message))
    }

    async function put(url, message) {
        handleAxiosCall(axios.put(url, { message }, getHeaders()), () => put(url, message))
    }

    async function exclude(url) {
        handleAxiosCall(axios.delete(url, getHeaders()), () => exclude(url))
    }

    async function like(url) {
        handleAxiosCall(axios.get(url+'like/', getHeaders()), () => like(url))
    }

    return { posts, get, post, put, exclude, like }
})
