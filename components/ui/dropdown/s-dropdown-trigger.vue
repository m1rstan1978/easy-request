<script setup>
const props = defineProps({
  name: [String, Number],
  activeItem: Object,
});
</script>

<template>
  <div class="dropdown-trigger">
    <div class="dropdown-trigger__content">
      <div
        class="dropdown-trigger__name"
        :class="{ activeTrigger: activeItem }"
      >
        {{ name }}
      </div>
      <div class="dropdown-trigger__img">
        <img :src="'/images/ui/dropdown-trigger.svg'" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dropdown-trigger {
  width: 100%;
  height: 100%;
  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__name {
    font-size: 14px;
    color: $color_weak;
  }
  &__img {
    display: flex;
  }
}
.activeTrigger {
  color: $text_color;
}
</style>
