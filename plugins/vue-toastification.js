
// YourApp.vue

import Vue from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";



Vue.use(Toast, {
  transition: "my-custom-fade",
  maxToasts: 5,
  newestOnTop: true,
  position: "bottom-right"
});