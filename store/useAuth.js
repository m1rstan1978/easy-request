import { defineStore } from "pinia";

export const useAuth = defineStore("useAuth", {
  state: () => {
    return {
      isAuth: false,
    };
  },
  actions: {
    async userVerify() {
      return await $fetch("/api/auth/verify");
    },
  },
});
