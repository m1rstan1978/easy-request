<script setup>
useSeoMeta({
  title: "Авторизация пользователя",
});

definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <LoginSMain />
</template>

<style scoped lang="scss"></style>
