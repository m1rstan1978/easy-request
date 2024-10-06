<script setup>
const tHeadArr = ref([
  {
    name: "№",
    canFilter: true,
    activeFilter: false,
  },
  {
    name: "Создана",
    canFilter: true,
    activeFilter: false,
  },
  {
    name: "Адрес",
    canFilter: false,
  },
  {
    name: "Заявитель",
    canFilter: false,
  },
  {
    name: "Описание",
    canFilter: false,
  },
  {
    name: "Срок",
    canFilter: false,
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
          <div class="thead__th_img" v-if="item.canFilter">
            <svg
              width="8"
              height="9"
              viewBox="0 0 8 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              :class="{ activeIconFilter: item.activeFilter }"
            >
              <path
                d="M3.33333 9.00004V2.86671L0.933333 5.26671L0 4.33337L4 0.333374L8 4.33337L7.06667 5.26671L4.66667 2.86671V9.00004H3.33333Z"
                fill="#CCCCCC"
              />
            </svg>
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
