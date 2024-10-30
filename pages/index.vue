<script setup>
import { useAuth } from "~/store/useAuth";

useSeoMeta({
  title: "Главная страница с заявками",
});

definePageMeta({
  middleware: ["auth"],
});

const useAuthPinia = useAuth();

const openToast = ref(false);
const isLoading = ref(false);

const toastDes = ref("");

async function logoutAcc() {
  isLoading.value = true;
  try {
    const response = await useAuthPinia.logout();
    if (response) {
      sessionStorage.clear();
      navigateTo("/login");
    }
  } catch {
    openToast.value = true;
    toastDes.value = e.message;
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <UiSToast
    :openToast="openToast"
    position="center"
    :timeTimeOut="3000"
    @closeToast="openToast = false"
    iconSrc="/images/ui/error-icon.svg"
    title="Ошибка выхода"
    :description="toastDes"
  />
  <UiSButton class="logout" @click="logoutAcc" :loading="isLoading"
    >Выйти из аккаунта</UiSButton
  >
  <IndexSMain />
</template>

<style scoped lang="scss">
.logout {
  max-width: 160px;
  margin-top: 20px;
}
</style>
