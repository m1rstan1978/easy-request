<script setup></script>

<template>
  <div class="card">
    <div class="card__content">
      <div class="card__title">Авторизация</div>
      <LoginSForm />
    </div>
  </div>
</template>

<style scoped lang="scss">
@mixin fontStyle() {
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: white;
  text-align: center;
}
.card {
  width: 390px;
  background: white;
  border-radius: 5px;
  padding: 20px;
  &__title {
    @include fontStyle();
    width: 100%;
    background: $green;
    border-radius: 5px;
    padding: 18px 0;
    transform: translateY(-40px);
    margin-bottom: 10px;
  }
}
</style>
