import { defineStore } from "pinia";

export const useFetchRequest = defineStore("useFetchRequest", {
  state: () => {
    return {
      useFetchApi: null,
    };
  },
  actions: {
    async interceptorsFetch() {
      try {
        const url = `/api/auth/refresh?access_token_query=${sessionStorage.getItem(
          "accessToken"
        )}`;
        const data = await $fetch(url, {
          method: "GET",
        });
        if (!!data) {
          return data;
        }
      } catch (e) {
        throw {
          message: !e.data?.message ? "Ошибка сервера" : e.data?.message,
          status: !e?.status ? 500 : e.status,
        };
      }
    },
    async setFetch(url, options = {}, checkInter = false) {
      let checkInterceptorResponse = checkInter;
      try {
        return await $fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        });
      } catch (e) {
        if (e.status === 401 && !checkInterceptorResponse) {
          const { accessToken } = await this.interceptorsFetch();
          if (accessToken) {
            sessionStorage.setItem("accessToken", accessToken);
            checkInterceptorResponse = true;
            return await this.setFetch(url, options, true);
          }
          return;
        }
        throw {
          message: !e.data?.message ? "Ошибка сервера" : e.data?.message,
          status: !e?.status ? 500 : e.status,
        };
      }
    },
  },
});
