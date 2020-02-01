import store from "@/store";
import LoginPage from "./LoginPage.vue";
import { checkAndReturnPayloadFromUrl } from "./service";

const routes = [
  {
    path: "/login",
    name: "LoginPage",
    meta: {
      auth: false
    },
    component: LoginPage
  },
  {
    path: "/logout",
    name: "logout",
    meta: {
      auth: true
    },
    beforeEnter(to, from, next) {
      store.commit("AuthStore/setValues", {});

      next("/login");
    }
  },
  {
    path: "/callback/",
    name: "callback",
    meta: {
      auth: false
    },
    beforeEnter(to, from, next) {
      const routeHash = to.hash;

      try {
        const payload = checkAndReturnPayloadFromUrl(routeHash);

        store.commit("AuthStore/setValues", payload);

        return next("/");
      } catch (e) {
        return next("/login");
      }
    }
  }
];

export default routes;
