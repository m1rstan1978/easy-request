<script setup>
const currentPage = ref(1);
const totalPages = ref(12);
const pageLimit = 5;

const pages = computed(() => {
  let start = Math.max(1, currentPage.value - Math.floor(pageLimit / 2));
  let end = start + pageLimit - 1;

  if (end > totalPages.value) {
    end = totalPages.value;
    start = Math.max(1, end - pageLimit + 1);
  }

  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }

  return result;
});

const goToPage = page => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

watch(currentPage, val => {
  //   console.log(val);
});
</script>

<template>
  <div class="pagination">
    <button
      class="pagination__btn"
      @click="prevPage"
      :disabled="currentPage === 1"
      v-if="totalPages > pageLimit"
    >
      <
    </button>
    <span
      class="pagination__span"
      v-for="page in pages"
      :key="page"
      @click="goToPage(page)"
      :class="{ active: page === currentPage }"
    >
      {{ page }}
    </span>
    <button
      v-if="totalPages > pageLimit"
      class="pagination__btn"
      @click="nextPage"
      :disabled="currentPage === totalPages"
    >
      >
    </button>
  </div>
</template>

<style scoped lang="scss">
.pagination {
  display: flex;
  align-items: center;
  gap: 10px;
  @include no-select();
  &__btn {
    width: 32px;
    height: 32px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 3px;
    @include flex-center();
    transition: all 0.3s ease;
    cursor: pointer;
    &:hover {
      border: 1px solid #6c757d;
    }
  }

  &__span {
    width: 32px;
    height: 32px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 3px;
    @include flex-center();
    color: #6c757d;
    transition: all 0.3s ease;
    cursor: pointer;
    &:hover {
      border: 1px solid #6c757d;
    }
    &.active {
      border: 1px solid rgba(0, 0, 0, 0);
      background: $green;
      color: white;
    }
  }
}
</style>
