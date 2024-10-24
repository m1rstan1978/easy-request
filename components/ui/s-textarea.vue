<script setup>
const props = defineProps({
  options: Object,
  modelValue: [Number, String],
});

const emit = defineEmits();

function updateValue(e) {
  emit("update:modelValue", e.target.value);
}
</script>

<template>
  <textarea
    class="textarea"
    :style="options"
    @input="updateValue"
    :value="modelValue"
    type="text"
  ></textarea>
</template>

<style scoped lang="scss">
.textarea {
  max-width: 100%;
  min-width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #cccccc;
  font-size: 14px;
  color: $text_color;
  transition: all 0.4s ease;
  &::placeholder {
    color: $color_weak;
  }
}
</style>
