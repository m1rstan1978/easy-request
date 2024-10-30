<script setup></script>

<template>
  <div class="search-filter">
    <IndexSearchSSearchName
      @setCurrentPageFirst="$emit('setCurrentPageFirst')"
    />
    <IndexSearchSSearchHouse
      @setCurrentPageFirst="$emit('setCurrentPageFirst')"
    />
  </div>
</template>

<style scoped lang="scss">
.search-filter {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 15px;
}
</style>
