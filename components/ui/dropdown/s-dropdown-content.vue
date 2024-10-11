<script setup>
const props = defineProps({
  options: Array,
  modelValue: Boolean,
  positionContent: String,
});

const emit = defineEmits();

let indexElement = ref(null);
let dropdownRef = ref(null);

function closeWindow(e) {
  const checkClassName = e.target.className.includes("dropdown");
  if (
    !checkClassName ||
    dropdownRef.value !==
      e.target?.closest(".dropdown-menu")?.querySelector(".dropdown-content")
  ) {
    emit("update:modelValue", false);
  }
}

function setActiveUp() {
  if (indexElement.value === null || indexElement.value === 0) {
    indexElement.value = 0;
    return;
  }
  indexElement.value -= 1;
}
function setActiveDown() {
  if (indexElement.value === null) {
    indexElement.value = 0;
    return;
  }
  if (indexElement.value !== props.options.length - 1) {
    indexElement.value += 1;
  }
}

function setActiveIndex(e, idx) {
  e.preventDefault();
  indexElement.value = idx;
  scrollToActive();
}

function setItem(option) {
  emit("update:modelValue", false);
  emit("setOption", option);
}

function handleKeydown(e) {
  e.preventDefault();
  if (e.key === "ArrowUp") {
    setActiveUp(e);
    scrollToActive("ArrowUp");
  } else if (e.key === "ArrowDown") {
    setActiveDown(e);
    scrollToActive("ArrowDown");
  } else if (e.key === "Enter") {
    setItem(props.options[indexElement.value]);
  }
}

function scrollToActive(nameKey) {
  const container = dropdownRef.value;
  const children = container?.children[indexElement.value];

  if (!children) {
    return;
  }

  if (!children?.getBoundingClientRect() || !container?.getBoundingClientRect) {
    return;
  }

  const { bottom: containerBottom, top: containerTop } =
    container.getBoundingClientRect();
  const {
    bottom: childrenBottom,
    top: childrenTop,
    height: childrenHeight,
  } = children.getBoundingClientRect();

  if (childrenBottom >= containerBottom && nameKey === "ArrowDown") {
    container.scrollTop += childrenHeight;
  }
  if (containerTop >= childrenTop && nameKey === "ArrowUp") {
    container.scrollTop -= childrenHeight;
  }
}

document.addEventListener("click", closeWindow);

onMounted(() => {
  const elHtml = document.querySelector(".dropdown-content");
  elHtml.focus();
});

onUnmounted(() => {
  document.removeEventListener("click", closeWindow);
});
</script>

<template>
  <div
    class="dropdown-content"
    tabindex="0"
    @keydown="handleKeydown"
    @mouseleave="indexElement = null"
    ref="dropdownRef"
    :style="{
      bottom: positionContent === 'down' ? '-10px' : '',
      top: positionContent === 'down' ? '' : '-10px',
      transform: `translateY(${positionContent === 'down' ? '100%' : '-100%'})`,
    }"
  >
    <div
      class="dropdown-content__item"
      v-for="(option, idx) in options"
      :key="idx"
      :class="
        (['dropdown-content__item' + (idx + 1)],
        { activeDropdown: idx === indexElement })
      "
      tabindex="1"
      @mousemove="setActiveIndex($event, idx)"
      @click="setItem(option)"
    >
      {{ option.name }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.dropdown-content {
  position: absolute;
  width: 100%;
  border-radius: 5px;
  background: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  border: 1px solid #cccccc;
  max-height: 190px;
  overflow-y: auto;
  z-index: 999;
  &__item {
    padding: 14px 17px;
    font-size: 14px;
    font-weight: 400;
    color: $text_color;
    transition: all 0.1s ease-out;
    cursor: pointer;
    &:nth-child(1) {
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
    }
    &:last-child {
      border-end-end-radius: 5px;
      border-end-start-radius: 5px;
    }
  }
  &::-webkit-scrollbar {
    width: 6px;
    background: rgba(0, 0, 0, 0.07);
  }
  &::-webkit-scrollbar-thumb {
    background: $green;
    border-radius: 3px;
  }
}
.activeDropdown {
  color: white;
  background: $green;
}
</style>
