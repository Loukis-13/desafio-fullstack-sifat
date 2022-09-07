import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import router from '../router'

export const useAuthStore = defineStore('auth', () => {
    const baseUrl = 'http://localhost:8000/v1/token/'

    let _token = ref({})
    let logged = ref(false)
    let _username = ref('')

    if (window.localStorage.getItem('token') != null) {
        _token.value = JSON.parse(window.localStorage.getItem('token'))
        _username.value = window.localStorage.getItem('username')

        axios.post(baseUrl + 'verify/', { token: _token.value.refresh })
            .then(res => logged.value = true)
            .catch(err => logout())
    }

    const accessToken = computed(() => _token.value.access)
    const username = computed(() => _username.value)

    async function enter(url, user) {
        await axios.post(url, user)
            .then(res => {
                _token.value = res.data
                _username.value = user.username
                window.localStorage.setItem('token', JSON.stringify(_token.value))
                window.localStorage.setItem('username', _username.value)
                logged.value = true
                router.push('/')
            })
            .catch(err => {
                console.error(err);
            })
    }

    async function register(user) { await enter('http://localhost:8000/v1/users/register/', user) }

    async function login(user) { await enter(baseUrl, user) }

    function logout() {
        _token.value = {}
        _username.value = ''
        window.localStorage.clear()
        logged.value = false
    }

    async function refresh() {
        return await axios.post(baseUrl + 'refresh/', { refresh: _token.value.refresh })
            .then(res => {
                _token.value.access = res.data.access
                window.localStorage.setItem('token', JSON.stringify(_token.value))
                logged.value = true
                return true
            })
            .catch(err => {
                console.error(err);
                logout()
                return false
            })
    }

    return { username, logged, accessToken, register, login, logout, refresh }
})
