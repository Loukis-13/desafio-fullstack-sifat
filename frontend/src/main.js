import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { BootstrapVue3 } from 'bootstrap-vue-3'
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue';

import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

createApp(App)
    .use(createPinia())
    .use(router)
    .use(BootstrapVue3)
    .use(BootstrapIconsPlugin)
    .mount('#app')
