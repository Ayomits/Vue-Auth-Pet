import { createApp } from "vue";
import App from "./App.vue";
import router from "./pluging/router";
import { pinia } from "./pluging/pinia";
import { vuetify } from "./pluging/vuetify";
import "./global.css";
import { vueQuery } from "./pluging/vue-query";

export const isDev = false;

createApp(App).use(router).use(pinia).use(vueQuery).use(vuetify).mount("#app");
