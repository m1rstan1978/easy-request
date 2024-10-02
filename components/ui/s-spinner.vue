<script setup>
const props = defineProps({
  borderColor: String,
  topColor: String,
});
</script>

<template>
  <div
    class="spinner"
    :style="{
      border: `3px solid ${props.borderColor}`,
      borderTop: `3px solid ${props.topColor}`,
    }"
  ></div>
</template>

<style scoped lang="scss">
.spinner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
