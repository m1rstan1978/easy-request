<script setup>
import { useRequestServer } from "@/store/useRequest";

const request = useRequestServer();

function getShortName(fullName) {
  const [lastName, firstName, middleName] = fullName.split(" ");
  const shortName = `${lastName} ${firstName[0]}.${middleName[0]}.`;
  return shortName;
}

const tBodyArr = computed(() => {
  return request.getArrTable;
});
</script>

<template>
  <tbody class="tbody" v-if="tBodyArr?.requests">
    <tr
      class="tbody__tr"
      v-for="(item, idx) in tBodyArr.requests"
      :key="idx"
      @click="
        $emit('setItem', {
          ...item,
          idx: useGetNumberRequest(tBodyArr.startIndex, idx),
        })
      "
    >
      <td class="tbody__number">
        <div class="tbody__number_item">
          {{ useGetNumberRequest(tBodyArr.startIndex, idx) }}
        </div>
      </td>
      <td class="tbody__text">
        <div class="tbody__text_item">
          {{ useParseDate(item?.created) }}
        </div>
      </td>
      <td class="tbody__text">
        <div class="tbody__text_item">
          {{ `${item.house}, кв.${item.flat}` }}
        </div>
      </td>
      <td class="tbody__text">
        <div class="tbody__text_item">
          {{
            getShortName(
              `${item.surname} ${item.first_name} ${item.middle_name}`
            )
          }}
        </div>
      </td>
      <td class="tbody__des">
        <div class="tbody__des_item">
          {{ item.textarea }}
        </div>
      </td>
      <td class="tbody__text">
        <div class="tbody__text_item">
          {{ useParseDate(item.deadline) }}
        </div>
      </td>
    </tr>
  </tbody>
</template>

<style scoped lang="scss">
.tbody {
  td {
    padding: 20px 0;
    border-bottom: 1px solid #dddfe0;
    text-align: start;
  }
  &__tr {
    transition: all 0.2s ease;
    cursor: pointer;
    &:hover {
      background: rgba(0, 0, 0, 0.03);
    }
  }
  &__number {
    width: 8%;
    &_item {
      font-family: "Inter", sans-serif;
      font-size: 14px;
      color: white;
      background: $green;
      padding: 4px 15px;
      border-radius: 4px;
      @include flex-center();
      margin-right: 30px;
      margin-left: 5px;
    }
  }
  &__text {
    &_item {
      font-family: "Inter", sans-serif;
      color: $text_color;
      font-size: 14px;
      margin-right: 20px;
      @include text-ellipsis(1);
    }
  }
  &__des {
    &_item {
      margin-right: 20px;
      @include text-ellipsis(1);
      font-family: "Inter", sans-serif;
      color: $text_color;
      font-size: 14px;
    }
  }
}
</style>
