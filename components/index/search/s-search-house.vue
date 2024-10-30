<script setup>
import DropdownTrigger from "@/components/ui/dropdown/s-dropdown-trigger.vue";
import { useRequestServer } from "@/store/useRequest";
import DropdownMenu from "~/components/ui/dropdown/s-dropdown-menu.vue";

const houses = [
  { id: 1, name: "Лесная, 10" },
  { id: 2, name: "Парковая, 12" },
  { id: 3, name: "Сосновая, 8" },
  { id: 4, name: "Центральная, 21" },
  { id: 5, name: "Садовая, 15" },
  { id: 6, name: "Набережная, 3" },
  { id: 7, name: "Березовая, 17" },
  { id: 8, name: "Заречная, 5" },
  { id: 9, name: "Молодежная, 14" },
  { id: 10, name: "Школьная, 9" },
  { id: 11, name: "Пионерская, 4" },
  { id: 12, name: "Привольная, 20" },
  { id: 13, name: "Тихая, 11" },
  { id: 14, name: "Весенняя, 7" },
  { id: 15, name: "Речная, 6" },
  { id: 16, name: "Луговая, 18" },
  { id: 17, name: "Полевая, 2" },
  { id: 18, name: "Южная, 13" },
  { id: 19, name: "Вишневая, 22" },
  { id: 20, name: "Зеленая, 25" },
  { id: 21, name: "Прудовая, 16" },
  { id: 22, name: "Кирпичная, 19" },
  { id: 23, name: "Мирная, 30" },
  { id: 24, name: "Дачная, 23" },
  { id: 25, name: "Солнечная, 26" },
  { id: 26, name: "Лермонтова, 28" },
  { id: 27, name: "Кленовая, 27" },
  { id: 28, name: "Озерная, 24" },
  { id: 29, name: "Еловая, 29" },
  { id: 30, name: "Гагарина, 31" },
  { id: 31, name: "Удалить из поиска" },
];

const emit = defineEmits();

const request = useRequestServer();

const router = useRouter();
const route = useRoute();

const findHouse = houses.find(item => item.name === route?.query?.house);

const activeItem = ref(!!findHouse ? findHouse : null);

const searchHousesDebounce = useDebounce(getInfoTableSearchHouse, 300);

async function setOption(item) {
  request.setLoadingInfoTable();
  emit("setCurrentPageFirst");
  if (item.id === 31) {
    activeItem.value = null;
    await useNavigateToRouter(router, route, { house: "", page: 1 });
    searchHousesDebounce();
    return;
  }
  activeItem.value = item;
  await useNavigateToRouter(router, route, { house: item.name, page: 1 });
  searchHousesDebounce();
}

async function getInfoTableSearchHouse() {
  const response = await request.getArrInfoTable();
  request.setArrRequests(response);
}
</script>

<template>
  <form class="search-house" @submit.prevent>
    <div class="search-house__dropdown">
      <DropdownMenu
        :options="houses"
        @setOption="setOption"
        :activeItem="activeItem"
      >
        <DropdownTrigger
          :name="!activeItem ? 'Дом' : activeItem.name"
          :activeItem="activeItem"
        />
      </DropdownMenu>
    </div>
  </form>
</template>

<style scoped lang="scss">
.search-house {
  height: 52px;
  border-bottom: 1px solid #cccccc;
  padding-top: 15px;
  &__dropdown {
    height: 100%;
  }
}
</style>
