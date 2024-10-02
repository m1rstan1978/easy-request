<script setup>
const props = defineProps({
  modelValue: [Number, String],
  options: Object,
});

const emit = defineEmits();
const styleOptions = {
  padding: "8px 40px 8px 0px",
};

function updateValue(e) {
  emit("update:modelValue", e.target.value);
}
</script>

<template>
  <input
    class="input"
    @input="updateValue"
    :value="modelValue"
    :style="!options ? { ...styleOptions } : { ...options }"
  />
</template>

<style scoped lang="scss">
.input {
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #cccccc;
  font-size: 14px;
  color: $text_color;
  transition: all 0.4s ease;
}
.input::placeholder {
  color: $color_weak;
}
</style>
