import { useFetchRequest } from "@/store/useFetch";
import { defineStore } from "pinia";

export const useAuth = defineStore("useAuth", {
  state: () => {
    return {
      isAuth: false,
    };
  },
  getters: {
    getIsAuth() {
      return this.isAuth;
    },
  },
  actions: {
    async verify() {
      const fetchApi = useFetchRequest();

      const queryToken = sessionStorage?.getItem("accessToken") || null;
      const response = await fetchApi.setFetch(
        `/api/auth/verify?=${queryToken}`,
        {
          method: "GET",
        }
      );
      if (response) {
        this.isAuth = true;
        return response;
      }
      this.isAuth = false;
      return null;
    },
    async login(username, password) {
      const fetchApi = useFetchRequest();
      const response = await fetchApi.setFetch("/api/auth/login", {
        method: "POST",
        body: { username, password },
      });
      if (response) {
        this.isAuth = true;
        return {
          message: "success",
          data: response,
        };
      }
      return null;
    },
    async logout() {
      const fetchApi = useFetchRequest();
      const response = await fetchApi.setFetch("/api/auth/logout", {
        method: "DELETE",
      });
      if (response) {
        this.isAuth = false;
        return response;
      }
      return null;
    },
  },
});
