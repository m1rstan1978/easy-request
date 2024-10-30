<script setup>
const props = defineProps({
  totalPagesProps: Number,
  currentPageProps: Number,
});
const emit = defineEmits();

const currentPage = ref(props.currentPageProps);
const totalPages = ref(props.totalPagesProps);
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
  emit("changeCurrentPage", page);
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
  emit("changeCurrentPage", currentPage.value);
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
  emit("changeCurrentPage", currentPage.value);
};

onBeforeMount(() => {});

watch(
  () => props.totalPagesProps,
  val => {
    totalPages.value = val;
  }
);
watch(
  () => props.currentPageProps,
  val => {
    currentPage.value = val;
  }
);
</script>

<template>
  <div class="pagination">
    <button
      class="pagination__btn"
      @click="prevPage"
      :class="{ disabledBtn: currentPage === 1 }"
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
      :class="{ disabledBtn: currentPage === totalPages }"
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
    color: $text-color;
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
    color: $text-color;
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
.disabledBtn {
  color: #ccc;
  pointer-events: none;
  cursor: auto;
}
</style>
