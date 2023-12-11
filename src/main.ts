import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebaseConfig from "../firebaseConfig";

import App from './App.vue'
import router from './router'

const app = createApp(App)

const fbApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(fbApp);

app.use(createPinia())
app.use(router)

app.mount('#app')

export { fbApp }
