<script setup>
import Table from "@/components/index/table/s-table.vue";
</script>

<template>
  <div class="data-grid">
    <div class="data-grid__header">
      <div class="data-grid__button">
        <UiSButton>Создать</UiSButton>
      </div>
    </div>
    <div class="data-grid__filter">
      <IndexSearchSSearchFilter />
    </div>
    <div class="data-grid__table">
      <Table />
    </div>
    1
  </div>
</template>

<style scoped lang="scss">
.data-grid {
  background: white;
  width: 100%;
  border-radius: 8px;
  padding: 10px 20px;
  margin-bottom: 20px;

  &__header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
  &__button {
    min-width: 78px;
  }
  &__filter {
    margin-bottom: 30px;
  }
  &__table {
    min-height: calc(100vh - 350px);
  }
}
</style>
