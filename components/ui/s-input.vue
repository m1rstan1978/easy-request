<script setup>
import { MaskInput } from "vue-3-mask";

const props = defineProps({
  modelValue: [Number, String],
  options: Object,
  maskDate: Boolean,
  maskPhone: Boolean,
});

const emit = defineEmits();
const checkBackspace = ref(false);
const phoneValidateValue = ref(props.modelValue);

const formatDateTimeInput = useFormatDateTimeInput;

const styleOptions = {
  padding: "8px 40px 8px 0px",
};

function updateValue(e) {
  if (props.maskDate) {
    const getValue = formatDateTimeInput(e, checkBackspace.value);

    if (getValue || getValue === "") {
      e.target.value = getValue;
    }
  }
  emit("update:modelValue", e.target.value);
}

function updateMaskPhoneValue(e) {
  let cleanedNumber = e.target.value.replace(/\D/g, "");
  let getFilterPhone = null;

  if (cleanedNumber.length > 11) {
    cleanedNumber = cleanedNumber.slice(0, 11);
  }

  if (cleanedNumber.length === 11) {
    const match = cleanedNumber.match(/^(\d)(\d{3})(\d{3})(\d{2})(\d{2})$/);
    getFilterPhone = `${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
  }

  emit("update:modelValue", !getFilterPhone ? e.target.value : getFilterPhone);
}

function deleteSymbols(e) {
  checkBackspace.value = e.key === "Backspace";
}
</script>

<template>
  <input
    v-if="!maskPhone"
    class="input"
    @input="updateValue"
    :value="modelValue"
    @keydown="deleteSymbols($event)"
    :style="!options ? { ...styleOptions } : { ...options }"
  />
  <MaskInput
    v-else
    class="input__mobile"
    mask="# (###) ###-##-##"
    @input="updateMaskPhoneValue"
    :value="phoneValidateValue"
    v-model="phoneValidateValue"
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
  &__mobile {
    font-size: 14px;
    color: $text_color;
    &::placeholder {
      color: $color_weak;
    }
  }
  &::placeholder {
    color: $color_weak;
  }
}
</style>
