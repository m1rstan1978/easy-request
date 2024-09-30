// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  css: ["@/assets/style/main.scss"],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/style/variables.scss" as *;',
        },
      },
    },
  },

  googleFonts: {
    preload: true,
    families: {
      Roboto: {
        wght: [400, 500, 600, 700],
      },
      Inter: "300..700",
    },
  },

  modules: ["@nuxtjs/google-fonts"],
});
