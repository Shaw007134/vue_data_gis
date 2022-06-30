import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/styles/index.scss";
import '@arcgis/core/assets/esri/themes/dark/main.css'
import "@UI/styles/ui.scss";
// import esriConfig from '@arcgis/core/config.js'

// // esriConfig.applicationUrl = 'http://localhost:81'
// esriConfig.assetsPath = '/assets'
// esriConfig.apiKey =
//   'AAPK693e54004a2e498d8ee7f5dec424fadbimrhpS3whlfKgZO_376pDdaZpFs0GzutnG4Nvv1IpWuk36yPcYv17W89eZGHR5nO'

if (process.env.NODE_ENV === "production") {
  const { mockXHR } = require("../mock");
  mockXHR();
}

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
