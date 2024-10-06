<script setup>
const tBodyArr = [
  {
    number: 133,
    create: "17.04.2024",
    house: "Лесная, 10",
    apartment: "3",
    applicant: "Забавкин Дмитрий Валентинович",
    des: "Подкрасить царапины на стенах в гостиной",
    deadline: "24.04.2024 10:00",
  },
  {
    number: 134,
    create: "10.04.2024",
    house: "Мира, 22",
    apartment: "18",
    applicant: "Чудов Валентин Александрович",
    des: "Заменить потрескавшуюся плитку в ванной",
    deadline: "17.04.2024 14:30",
  },
  {
    number: 135,
    create: "03.04.2024",
    house: "Речная, 3",
    apartment: "5",
    applicant: "Пестряков Павел Павлович",
    des: "Отремонтировать протекающий кран на кухне",
    deadline: "10.04.2024 09:15",
  },
  {
    number: 135,
    create: "03.04.2024",
    house: "Речная, 3",
    apartment: "5",
    applicant: "Пестряков Павел Павлович",
    des: "Отремонтировать протекающий кран на кухне",
    deadline: "10.04.2024 09:15",
  },
  {
    number: 135,
    create: "03.04.2024",
    house: "Речная, 3",
    apartment: "5",
    applicant: "Пестряков Павел Павлович",
    des: "Отремонтировать протекающий кран на кухне",
    deadline: "10.04.2024 09:15",
  },
  {
    number: 135,
    create: "03.04.2024",
    house: "Речная, 3",
    apartment: "5",
    applicant: "Пестряков Павел Павлович",
    des: "Отремонтировать протекающий кран на кухне",
    deadline: "10.04.2024 09:15",
  },
  {
    number: 135,
    create: "03.04.2024",
    house: "Речная, 3",
    apartment: "5",
    applicant: "Пестряков Павел Павлович",
    des: "Отремонтировать протекающий кран на кухне",
    deadline: "10.04.2024 09:15",
  },

  {
    number: 135,
    create: "03.04.2024",
    house: "Речная, 3",
    apartment: "5",
    applicant: "Пестряков Павел Павлович",
    des: "Отремонтировать протекающий кран на кухне",
    deadline: "10.04.2024 09:15",
  },
];

function getShortName(fullName) {
  const [lastName, firstName, middleName] = fullName.split(" ");
  const shortName = `${lastName} ${firstName[0]}.${middleName[0]}.`;
  return shortName;
}
</script>

<template>
  <tbody class="tbody">
    <tr class="tbody__tr" v-for="(item, idx) in tBodyArr" :key="idx">
      <td class="tbody__number">
        <div class="tbody__number_item">
          {{ item.number }}
        </div>
      </td>
      <td class="tbody__text">
        <div class="tbody__text_item">
          {{ item.create }}
        </div>
      </td>
      <td class="tbody__text">
        <div class="tbody__text_item">
          {{ `${item.house}, кв.${item.apartment}` }}
        </div>
      </td>
      <td class="tbody__text">
        <div class="tbody__text_item">
          {{ getShortName(item.applicant) }}
        </div>
      </td>
      <td class="tbody__des">
        <div class="tbody__des_item">
          {{ item.des }}
        </div>
      </td>
      <td class="tbody__text">
        <div class="tbody__text_item">
          {{ item.deadline }}
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
      background: rgba(0, 0, 0, 0.04);
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
.activeHoverTr {
  background: rgba(0, 0, 0, 0.03);
}
</style>
