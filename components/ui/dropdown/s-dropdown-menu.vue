<script setup>
import DropdownContent from "@/components/ui/dropdown/s-dropdown-content.vue";

const props = defineProps({
  options: Array,
});

const visibleContent = ref(false);
const positionContent = ref(null);
const triggerMenu = ref(null);

const emit = defineEmits();

function toggleDropdownHeight() {
  if (visibleContent.value) {
    visibleContent.value = false;
    return;
  }

  const docScrollHeight = window.innerHeight;
  const { bottom: triggerMenuBottom } =
    triggerMenu?.value?.getBoundingClientRect();
  if (!triggerMenuBottom) {
    return;
  }

  const summHeightMenu = triggerMenuBottom + 10 + 210;
  if (summHeightMenu >= docScrollHeight) {
    positionContent.value = "up";
    visibleContent.value = true;
    return;
  }
  positionContent.value = "down";
  visibleContent.value = true;
}

function setOption(option) {
  emit("setOption", option);
}
</script>

<template>
  <div class="dropdown-menu" ref="triggerMenu">
    <div class="dropdown-menu__trigger" @click="toggleDropdownHeight">
      <slot />
    </div>
    <Transition>
      <DropdownContent
        v-if="visibleContent"
        :options="options"
        :positionContent="positionContent"
        v-model="visibleContent"
        @setOption="setOption"
      />
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.dropdown-menu {
  position: relative;
  height: 100%;
  &__trigger {
    @include no-select();
    cursor: pointer;
  }
}
.v-enter-active {
  transition: all 0.1s ease-out;
}

.v-enter-from {
  opacity: 0;
}

.v-enter-to {
  opacity: 1;
}

.v-leave-active {
  transition: all 0.1s ease-in;
}

.v-leave-from {
  opacity: 1;
}

.v-leave-to {
  opacity: 0;
}
</style>
