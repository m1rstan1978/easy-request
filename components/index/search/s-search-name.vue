<script setup>
const styleOptions = {
  padding: "15px 40px 15px 0px",
  border: "none",
};
</script>

<template>
  <form class="search-name" @submit.prevent>
    <div class="search-name__item">
      <UiSInput
        type="text"
        placeholder="Поиск (№ заявки, название)"
        :options="styleOptions"
      />
      <button class="search-name__submit" type="submit">
        <img :src="'/images/ui/search-icon.svg'" />
      </button>
    </div>
  </form>
</template>

<style scoped lang="scss">
.search-name {
  width: 100%;
  height: 52px;
  width: 100%;
  border-bottom: 1px solid #cccccc;
  &__item {
    position: relative;
    width: 100%;
  }
  &__submit {
    position: absolute;
    display: flex;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
