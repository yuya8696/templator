import { createApp } from "vue";
import App from "./App.vue";

// router
import router from "./router";

// store
import store from "./store";

// Element-plus install
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);

app.use(ElementPlus);
app.use(router);
app.use(store);
app.mount("#app");
