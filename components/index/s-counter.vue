<script setup>
import DropdownTrigger from "@/components/ui/dropdown/s-dropdown-trigger.vue";
import DropdownMenu from "~/components/ui/dropdown/s-dropdown-menu.vue";

import { useRequestServer } from "@/store/useRequest";

const emit = defineEmits();

const router = useRouter();
const route = useRoute();
const useRequest = useRequestServer();

const paginationItems = [
  { name: 1 },
  { name: 2 },
  { name: 3 },
  { name: 4 },
  { name: 5 },
  { name: 6 },
  { name: 7 },
  { name: 8 },
  { name: 9 },
  { name: 10 },
];

const activeItem = ref(
  !route?.query.pagesize ? { name: 6 } : { name: Number(route.query.pagesize) }
);

function setOption(item) {
  activeItem.value = item;
  setQueryPagesize(true, item);
}

const getTableInfo = computed(() => {
  return useRequest.getArrTable;
});

const recordInfo = ref(null);
const totalRequests = ref(null);

const searchPagesizeRequests = useDebounce(getRequests, 300);

async function setQueryPagesize(clickActive = false, item) {
  await useNavigateToRouter(router, route, {
    pagesize: activeItem.value.name,
  });
  if (clickActive) {
    useRequest.setLoadingInfoTable();
    await useNavigateToRouter(router, route, {
      pagesize: item.name,
      page: 1,
    });
    emit("setCurrentPageFirst");
    searchPagesizeRequests();
  }
}

async function getRequests() {
  const response = await useRequest.getArrInfoTable();
  useRequest.setArrRequests(response);
}

onBeforeMount(() => {
  setQueryPagesize();
});

watch(getTableInfo, val => {
  if (val) {
    recordInfo.value = val.recordInfo;
    totalRequests.value = val.totalCount;
  }
});
</script>

<template>
  <div class="counter">
    <div class="counter__content">
      <span class="counter__span">{{
        totalRequests === 0 ? "0" : recordInfo
      }}</span>
      из
      <span class="counter__span">{{ totalRequests }} записей</span>
    </div>
    <div class="counter__dropdown">
      <DropdownMenu
        :options="paginationItems"
        @setOption="setOption"
        :activeItem="activeItem"
      >
        <DropdownTrigger
          :name="!activeItem ? 'Дом' : activeItem.name"
          :activeItem="activeItem"
        />
      </DropdownMenu>
    </div>
  </div>
</template>

<style scoped lang="scss">
.counter {
  display: flex;
  align-items: flex-start;
  &__content {
    font-size: 14px;
    color: $text-color;
  }
  &__span {
    font-weight: 700;
  }
  &__dropdown {
    margin-left: 15px;
    min-width: 120px;
    height: 25px;
    border-bottom: 1px solid #cccccc;
  }
}
</style>
