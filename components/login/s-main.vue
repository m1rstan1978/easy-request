<script setup>
const openToast = ref(false);
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
      description="Неверно введены логин или пароль"
    />
    <LoginSCard @click="openToast = !openToast" />
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
