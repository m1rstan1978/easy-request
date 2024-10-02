<script setup></script>

<template>
  <div class="search-filter">
    <IndexSearchSSearchName />
    <IndexSearchSSearchHouse />
  </div>
</template>

<style scoped lang="scss">
.search-filter {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 15px;
}
</style>
