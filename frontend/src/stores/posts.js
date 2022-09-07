import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth'

export const usePostsStore = defineStore('posts', () => {
    const baseUrl = 'http://localhost:8000/v1/'
    const auth = useAuthStore()

    let posts = ref({})

    
    function getHeaders() {
        return { headers: { Authorization: `Bearer ${auth.accessToken}` } }
    }

    async function handleAxiosCall(promisse, callback) {
        await promisse
            .then(res => getPosts())
            .catch(async err => {
                console.error(err)
                if (err.response.status == 401 && await auth.refresh()) callback()
            })
    }

    async function getPosts(url) {
        posts.value = await (await axios.get(url || (baseUrl + 'posts/'))).data
    }

    async function postPost(message) {
        handleAxiosCall(axios.post(baseUrl + 'posts/', { message }, getHeaders()), () => postPost(message))
    }

    async function putPost(url, message) {
        handleAxiosCall(axios.put(url, { message }, getHeaders()), () => putPost(url, message))
    }

    async function deletePost(url) {
        handleAxiosCall(axios.delete(url, getHeaders()), () => deletePost(url))
    }

    return { posts, getPosts, postPost, putPost, deletePost }
})
