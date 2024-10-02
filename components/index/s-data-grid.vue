<script setup></script>

<template>
  <div class="data-grid">
    <div class="data-grid__header">
      <div class="data-grid__button">
        <UiSButton>Создать</UiSButton>
      </div>
    </div>
    <IndexSearchSSearchFilter />
  </div>
</template>

<style scoped lang="scss">
.data-grid {
  background: white;
  width: 100%;
  border-radius: 8px;
  padding: 10px 20px;

  &__header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
  &__button {
    min-width: 78px;
  }
}
</style>
