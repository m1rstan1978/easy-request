import { useAuth } from "~/store/useAuth";

export default defineNuxtRouteMiddleware(async value => {
  const useAuthPinia = useAuth();

  try {
    const response = await useAuthPinia.verify("/api/auth/verify", {
      method: "GET",
    });

    if (response && value.path !== "/") {
      return navigateTo("/");
    } else if (!response && value.path !== "/login") {
      return navigateTo("/login");
    }
  } catch {
    if (value.path !== "/login") {
      return navigateTo("/login");
    }
  }
});
