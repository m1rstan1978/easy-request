<script setup>
const props = defineProps({
  loading: Boolean,
  borderColor: String,
  topColor: String,
});
</script>

<template>
  <button class="button" :class="{ buttonIsLoadingScale: loading }">
    <div class="button__text" :class="{ buttonIsLoading: loading }">
      <slot />
    </div>
    <div class="button__spinner" v-if="loading">
      <div class="button__spinner_spin">
        <UiSSpinner :borderColor="borderColor" :topColor="topColor" />
      </div>
    </div>
  </button>
</template>

<style scoped lang="scss">
.button {
  position: relative;
  background: $green;
  color: white;
  font-size: 14px;
  padding: 10px 0;
  width: 100%;
  border-radius: 4px;
  transition: all 0.4s ease;
  cursor: pointer;
  &__spinner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    @include flex-center();
    &_spin {
      width: 20px;
      height: 20px;
    }
  }
  &:hover {
    transform: scale(1.02);
  }
}
.buttonIsLoading {
  opacity: 0 !important;
}
.buttonIsLoadingScale {
  transform: scale(1.02);
}
</style>
