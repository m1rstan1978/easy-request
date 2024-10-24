<script setup>
import DropdownTrigger from "@/components/ui/dropdown/s-dropdown-trigger.vue";
import DropdownMenu from "~/components/ui/dropdown/s-dropdown-menu.vue";

const houses = [
  { id: 1, name: "Дом 1" },
  { id: 2, name: "Дом 2" },
  { id: 3, name: "Дом 3" },
  { id: 3, name: "Дом 4" },
  { id: 3, name: "Дом 5" },
  { id: 3, name: "Дом 6" },
  { id: 3, name: "Дом 7" },
  { id: 3, name: "Дом 8" },
];

const activeItem = ref(null);

function setOption(item) {
  activeItem.value = item;
}
</script>

<template>
  <form class="search-house" @submit.prevent>
    <div class="search-house__dropdown">
      <DropdownMenu
        :options="houses"
        @setOption="setOption"
        :activeItem="activeItem"
      >
        <DropdownTrigger
          :name="!activeItem ? 'Дом' : activeItem.name"
          :activeItem="activeItem"
        />
      </DropdownMenu>
    </div>
  </form>
</template>

<style scoped lang="scss">
.search-house {
  height: 52px;
  border-bottom: 1px solid #cccccc;
  padding-top: 15px;
  &__dropdown {
    height: 100%;
  }
}
</style>
