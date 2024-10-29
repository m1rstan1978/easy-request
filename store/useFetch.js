import { defineStore } from "pinia";

export const useFetchRequest = defineStore("useFetchRequest", {
  state: () => {
    return {
      useFetchApi: null,
    };
  },
  actions: {
    async setFetch(url, options = {}) {
      try {
        return await $fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU2YWRmOGRlLTA5YmItNGU3Mi1hNDRhLWJhMmVjYTA2NDg4NyIsImlhdCI6MTczMDE4NDUyNiwiZXhwIjoxNzMwMTg1NDI2fQ.450NzR-0u2En74oq0cBDpQrAvN0vxtJ6wxj4iKucomg`,
          },
        });
      } catch (e) {
        console.log(e.status);
      }
    },
  },
});
