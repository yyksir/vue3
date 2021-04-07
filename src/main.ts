import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './utils/api'

import service from "./utils/axios";

const app = createApp(App);
app.config.globalProperties.$axios = service;
app.config.globalProperties.$baseUrl = process.env.VUE_APP_HOST;
app.config.globalProperties.$api = api;


app.use(store)
app.use(router)
app.mount('#app');
