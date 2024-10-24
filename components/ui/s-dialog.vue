<script setup>
const props = defineProps({
  styleOptionsModal: Object,
  visibleDialog: Boolean,
});

const emit = defineEmits(["closeModal"]);
</script>

<template>
  <div class="dialog">
    <Transition name="fade-dialog">
      <div class="dialog__content" v-if="visibleDialog">
        <div class="dialog__modal" :style="styleOptionsModal">
          <button class="dialog__close" @click="$emit('closeModal')">
            <img :src="'/images/ui/close-dialog.svg'" />
          </button>
          <slot />
        </div>
      </div>
    </Transition>
  </div>
  <Transition name="fade-background">
    <div class="dialog__background" v-if="visibleDialog"></div>
  </Transition>
</template>

<style scoped lang="scss">
.dialog {
  position: relative;
  z-index: 100;
  &__content {
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0);
    width: 100%;
    height: 100vh;
    @include flex-center();
    z-index: 5;
  }
  &__modal {
    position: relative;
    margin: 0px 20px 80px 20px;
  }
  &__close {
    position: absolute;
    right: 0;
    top: 0;
    transform: translateY(-15px) translateX(15px);
    cursor: pointer;
    img {
      transition: all 0.3s ease;
    }
    &:hover img {
      transform: scale(1.1);
    }
  }
  &__background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.2);
    z-index: 4;
  }
}
.fade-dialog-enter-from {
  transform: translateY(-20px);
  opacity: 0;
  transition: all 0.3s ease;
}
.fade-dialog-enter-to {
  transform: translateY(0px);
  opacity: 1;
  transition: all 0.3s ease;
}
.fade-dialog-leave-from {
  transform: translateY(0px);
  opacity: 1;
  transition: all 0.3s ease;
}
.fade-dialog-leave-to {
  transform: translateY(-20px);
  opacity: 0;
  transition: all 0.3s ease;
}

.fade-background-enter-from {
  opacity: 0;
  transition: all 0.3s ease;
}
.fade-background-enter-to {
  opacity: 1;
  transition: all 0.3s ease;
}
.fade-background-leave-from {
  opacity: 1;
  transition: all 0.3s ease;
}
.fade-background-leave-to {
  opacity: 0;
  transition: all 0.3s ease;
}
</style>
