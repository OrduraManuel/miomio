import { createApp, reactive } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { router } from './router'

// setup fake backend
import { fakeBackend } from './helpers';
fakeBackend();

const GStore = reactive({ flashMessage: ''})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.provide('GStore', GStore)

app.mount('#app')
