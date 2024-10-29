<script setup>
import { useFetchRequest } from "@/store/useFetch";

const useFetchApi = useFetchRequest();

async function clickSide() {
  try {
    const response = await useFetchApi.setFetch("/api/auth/verify", {
      method: "GET",
      headers: {
        Autorization: "Bearer fdsafasf",
      },
    });
    console.log(response);
  } catch (e) {
    console.log(e?.message);
  }
}

onMounted(async () => {});
</script>

<template>
  <button @click="clickSide">павыфаы</button>
  <IndexSMain />
</template>

<style scoped lang="scss"></style>
