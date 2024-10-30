<script setup>
const tHeadArr = ref([
  {
    name: "№",
  },
  {
    name: "Создана",
  },
  {
    name: "Адрес",
  },
  {
    name: "Заявитель",
  },
  {
    name: "Описание",
  },
  {
    name: "Срок",
  },
]);

function setActiveFilter(idx) {
  const item = tHeadArr.value[idx];
  item.activeFilter = !item.activeFilter;
  tHeadArr.value[idx] = item;
}
</script>

<template>
  <thead class="thead">
    <tr class="thead__tr">
      <th
        class="thead__th"
        v-for="(item, idx) in tHeadArr"
        :key="idx"
        @click="setActiveFilter(idx)"
        :class="['thead__th' + (idx + 1)]"
      >
        <div class="thead__th_item">
          <div class="thead__th_text">
            {{ item.name }}
          </div>
        </div>
      </th>
    </tr>
  </thead>
</template>

<style scoped lang="scss">
.thead {
  &__th1 {
    width: 8%;
    .thead__th_item {
      margin-left: 5px;
    }
  }

  &__th5 {
    width: 25%;
  }
  &__th {
    padding: 20px 0;
    border-bottom: 1px solid #dddfe0;
    text-align: start;
    color: $green;
    font-size: 14px;
    @include no-select();
    &_item {
      display: flex;
      align-items: flex-start;
      cursor: pointer;
    }
    &_img {
      display: flex;
      margin-left: 4px;
      transform: translateY(2px);
      svg path {
        transition: all 0.2s ease;
      }
    }
  }
}

.activeIconFilter path {
  fill: $text_color;
}
</style>
