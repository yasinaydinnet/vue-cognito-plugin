import store from "@/store";

export const checkRoutes = (to, from, next) => {
  const requireAuth = (to.meta && to.meta.auth) || false;

  if (requireAuth && !store.state.AuthStore.isAuthenticated) {
    return next("/login");
  }

  if (!requireAuth && store.state.AuthStore.isAuthenticated) {
    return next("/");
  }

  return next();
};
