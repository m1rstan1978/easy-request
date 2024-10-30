<script setup>
import { useRequestServer } from "@/store/useRequest";

const styleOptions = {
  padding: "15px 40px 15px 0px",
  border: "none",
};

const request = useRequestServer();

const route = useRoute();
const router = useRouter();

const searchQuery = route?.query?.search;

const searchInputValue = ref(!searchQuery ? "" : searchQuery);

const searchDebounce = useDebounce(searchRequest, 300);

function setStartSearch() {
  request.setLoadingInfoTable();
  searchDebounce();
}

async function searchRequest() {
  await useNavigateToRouter(router, route, { search: searchInputValue.value });
  const response = await request.getArrInfoTable();
  request.setArrRequests(response);
}
</script>

<template>
  <form class="search-name" @submit.prevent>
    <div class="search-name__item">
      <UiSInput
        type="text"
        placeholder="Поиск по описанию"
        :options="styleOptions"
        @input="setStartSearch"
        v-model="searchInputValue"
      />
      <button class="search-name__submit" type="button">
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
