<script setup>
import DropdownTrigger from "@/components/ui/dropdown/s-dropdown-trigger.vue";
import DropdownMenu from "~/components/ui/dropdown/s-dropdown-menu.vue";

const paginationItems = [
  { name: 1 },
  { name: 2 },
  { name: 3 },
  { name: 4 },
  { name: 5 },
  { name: 6 },
  { name: 7 },
  { name: 8 },
  { name: 9 },
  { name: 10 },
];

const activeItem = ref({ name: 10 });

function setOption(item) {
  activeItem.value = item;
}
</script>

<template>
  <div class="counter">
    <div class="counter__content">
      <span class="counter__span">1–10</span>
      из
      <span class="counter__span">1500 записей</span>
    </div>
    <div class="counter__dropdown">
      <DropdownMenu :options="paginationItems" @setOption="setOption">
        <DropdownTrigger
          :name="!activeItem ? 'Дом' : activeItem.name"
          :activeItem="activeItem"
        />
      </DropdownMenu>
    </div>
  </div>
</template>

<style scoped lang="scss">
.counter {
  display: flex;
  align-items: flex-start;
  &__content {
    font-size: 14px;
    color: $text-color;
  }
  &__span {
    font-weight: 700;
  }
  &__dropdown {
    margin-left: 15px;
    min-width: 120px;
    height: 25px;
    border-bottom: 1px solid #cccccc;
  }
}
</style>
