<script setup>
import { useFetchRequest } from "@/store/useFetch";

const fetch = useFetchRequest();

onMounted(async () => {
  const response = await fetch.setFetch("/api/auth/registr", {
    method: "POST",
    body: {
      username: "m1rstan",
      password: "123vffdf",
    },
  });
  console.log(response, useCookie("refresh_token"));
});
</script>

<template>
  <IndexSMain />
</template>

<style scoped lang="scss"></style>
