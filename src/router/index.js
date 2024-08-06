import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Main from "../views/Main.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/main",
    name: "Done",
    component: Main,
  },
  {
    path: "/category/:id",
    component: () => import("../views/Subcategories.vue"),
  },
  {
    path: "/quizes/:id",
    component: () => import("../views/Quizes.vue"),
  },
  {
    path: "/",
    redirect: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
