<script setup>
const props = defineProps({
  openToast: Boolean,
  name: String,
  timeTimeOut: Number,
  iconSrc: String,
  title: String,
  description: String,
});

const emit = defineEmits();
let timer = null;

const arrSettings = [
  {
    name: "center",
    styleComponent: {
      top: "40px",
      marginLeft: "0%",
    },
  },
  {
    name: "right",
    styleComponent: {
      bottom: "20px",
      right: "20px",
    },
  },
];
const getStyle = computed(() => {
  return arrSettings.find(el => el.name === props.name);
});

function clearTimer() {
  if (!timer) {
    return;
  }
  clearTimeout(timer);
  timer = null;
}

function closeT() {
  emit("closeToast");
  clearTimer();
}

watch(
  () => props.openToast,
  val => {
    if (val) {
      timer = setTimeout(() => {
        emit("closeToast");
        clearTimer();
      }, props.timeTimeOut);
      return;
    }
    clearTimer();
  }
);
</script>

<template>
  <Transition>
    <div class="toast" v-if="openToast" :style="{ ...getStyle.styleComponent }">
      <div class="toast__content">
        <div class="toast__icon" v-if="iconSrc">
          <img :src="iconSrc" />
        </div>
        <div class="toast__info">
          <div class="toast__title">{{ title }}</div>
          <p class="toast__des">{{ description }}</p>
        </div>
      </div>
      <button class="toast__close" @click="closeT">
        <img :src="'/images/ui/close-toast.svg'" />
      </button>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.toast {
  position: fixed;
  max-width: 403px;
  background: white;
  border-radius: 5px;
  padding: 15px 30px 17px 18px;

  &__content {
    display: flex;
    align-items: flex-start;
    column-gap: 10px;
  }
  &__title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 2px;
    min-width: 315px;
    max-width: 315px;
    color: $text_color;
    @include text-ellipsis(1);
  }
  &__des {
    font-size: 14px;
    font-weight: 400;
    font-family: "Inter", sans-serif;
    max-width: 315px;
    word-wrap: break-word;
    color: #8a8a8a;
  }
  &__icon {
    display: flex;
    min-width: 20px;
  }
  &__close {
    position: absolute;
    @include flex-center();
    width: 30px;
    height: 30px;
    top: 8%;
    right: 1%;
    cursor: pointer;
    img {
      transition: all 0.3s ease;
    }
    &:hover img {
      transform: scale(1.4);
    }
  }
}

.v-enter-active {
  transition: all 0.15s ease-out;
}

.v-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.v-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.v-leave-active {
  transition: all 0.15s ease-in;
}

.v-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.v-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
