<script setup>
const openToast = ref(false);

const toastTitle = ref("");
const toastDes = ref("");

function sendCreateError(err) {
  openToast.value = true;
  toastDes.value = err;
}
</script>

<template>
  <section class="login">
    <div class="login__back"></div>
    <UiSToast
      :openToast="openToast"
      position="center"
      :timeTimeOut="3000"
      @closeToast="openToast = false"
      iconSrc="/images/ui/error-icon.svg"
      title="Ошибка авторизации"
      :description="toastDes"
    />
    <LoginSCard @error="sendCreateError" />
  </section>
</template>

<style scoped lang="scss">
@mixin displayStyle {
  @include flex-center();
}
.login {
  @include displayStyle();
  height: 100vh;
  &__back {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: url("/images/login/back.webp") no-repeat;
    background-size: cover;
    z-index: -1;
  }
}
</style>
