import Vue from "vue";
import VueRouter from "vue-router";

import Dashboard from "@/views/view-dashboard.vue";
import Details from "@/views/view-details.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/details",
    name: "Details",
    component: Details,
  },
  {
    path: "*",
    redirect: "/dashboard",
    component: Dashboard,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
