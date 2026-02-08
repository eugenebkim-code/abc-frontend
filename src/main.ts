import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./styles/base.css";

const app = createApp(App);
app.use(router);
app.mount("#app");

// Remove initial loader after Vue mounts
const initialLoader = document.getElementById("initial-loader");
if (initialLoader) {
  // Small delay to ensure smooth transition
  setTimeout(() => {
    initialLoader.style.opacity = "0";
    initialLoader.style.transition = "opacity 0.3s ease";
    setTimeout(() => {
      initialLoader.remove();
    }, 300);
  }, 100);
}