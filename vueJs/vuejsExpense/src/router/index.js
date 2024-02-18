import { createRouter, createWebHistory } from "vue-router";
import AppHome from "../views/Home";
import AppAbout from "../views/About";

const routes = [
  {
    path: "/",
    name: "Home",
    component: AppHome,
  },
  {
    path: "/about",
    name: "About",
    component: AppAbout,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
