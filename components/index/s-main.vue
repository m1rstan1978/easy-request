<script setup></script>

<template>
  <section class="index">
    <div class="index__header">
      <h1 class="index__title">Список заявок</h1>
    </div>
    <div class="index__content">
      <IndexSDataGrid />
    </div>
  </section>
</template>

<style scoped lang="scss">
.index__header {
  margin-bottom: 44px;
  .index__title {
    padding: 25px 0;
    color: #454545;
    font-size: 20px;
  }
}
</style>
