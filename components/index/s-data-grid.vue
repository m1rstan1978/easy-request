<script setup>
import DialogForm from "@/components/index/s-dialog-form.vue";
import Table from "@/components/index/table/s-table.vue";
import Dialog from "@/components/ui/s-dialog.vue";
import { useRequestServer } from "~/store/useRequest";

const useRequest = useRequestServer();

const route = useRoute();
const router = useRouter();

const visibleDialog = ref(false);
const activeTable = ref(null);

const currentPagePagination = ref(
  !route?.query?.page ? 1 : Number(route.query.page)
);

const totalPageCount = ref(1);

const styleOptionsModal = {
  maxWidth: "720px",
  background: "white",
  borderRadius: "8px",
  padding: "32px",
};

const toastOptions = ref({
  positionToast: "center",
  openToast: false,
  titleToast: "Ошибка создании заявки",
  messageToast: [],
  timeOutToast: 3000,
  iconToast: "error",
});

function setToast(item) {
  toastOptions.value = { ...toastOptions.value, ...item };
}

function setItem(item) {
  item.deadline = useParseDate(item?.deadline);
  useRequest.fillDialogFields(item);
  activeTable.value = item;
  visibleDialog.value = true;
}

function closeModal() {
  visibleDialog.value = false;
  activeTable.value = null;
}

async function setInfoTable() {
  const response = await useRequest.getArrInfoTable();
  useRequest.setArrRequests(response);
}

const useDebounceChangeCurrentPage = useDebounce(getArrTablePagination, 300);

async function changeCurrentPage(val) {
  currentPagePagination.value = val;
  useRequest.setLoadingInfoTable();
  useDebounceChangeCurrentPage.call(val);
}

async function getArrTablePagination() {
  await useNavigateToRouter(router, route, { page: this });
  const response = await useRequest.getArrInfoTable();
  useRequest.setArrRequests(response);
}

const getTableInfo = computed(() => {
  return useRequest.getArrTable;
});

async function calculatePagination() {
  const { query } = route;
  if (query?.page) {
    currentPagePagination.value = Number(query.page);
  }
}

onBeforeMount(() => {
  calculatePagination();
});

onMounted(() => {
  setInfoTable();
});

watch(visibleDialog, val => {
  const errorIcon = toastOptions.value.iconToast;
  if (!val && errorIcon === "error") {
    toastOptions.value.openToast = false;
  }
});

watch(getTableInfo, val => {
  if (val) {
    totalPageCount.value = val.totalPages;
  }
});
</script>

<template>
  <UiSToast
    :openToast="toastOptions.openToast"
    :position="toastOptions.positionToast"
    :timeTimeOut="toastOptions.timeOutToast"
    @closeToast="toastOptions.openToast = false"
    :iconSrc="`/images/ui/${toastOptions.iconToast}-icon.svg`"
    :title="toastOptions.titleToast"
    :description="toastOptions.messageToast"
  />
  <div class="data-grid">
    <div class="data-grid__header">
      <div class="data-grid__button">
        <UiSButton @click="visibleDialog = true">Создать</UiSButton>
      </div>
    </div>
    <div class="data-grid__filter">
      <IndexSearchSSearchFilter />
    </div>
    <div class="data-grid__table">
      <Table @setItem="setItem" v-if="getTableInfo?.requests?.length > 0" />
      <div class="data-grid__loading" v-else-if="getTableInfo === null">
        <div class="data-grid__loading_spinner">
          <UiSSpinner
            :borderColor="'#50b053  '"
            :topColor="'rgba(255, 255, 255, 0.3)'"
          />
        </div>
      </div>
      <div class="data-grid__empty" v-else>Пусто</div>
    </div>
    <div class="data-grid__menu">
      <div class="data-grid__counter">
        <IndexSCounter @setCurrentPageFirst="currentPagePagination = 1" />
      </div>
      <div class="data-grid__pagination">
        <UiSPagination
          :totalPagesProps="totalPageCount"
          :currentPageProps="currentPagePagination"
          @changeCurrentPage="changeCurrentPage"
        />
      </div>
    </div>
    <Dialog
      :styleOptionsModal="styleOptionsModal"
      :visibleDialog="visibleDialog"
      @closeModal="closeModal"
    >
      <div class="data-grid__modal">
        <div class="data-grid__modal_header">
          <div class="data-grid__modal_name">
            {{
              !activeTable
                ? "Создание заявки"
                : `Заявка № ${activeTable.idx} (от ${useParseDate(
                    activeTable.created
                  )})`
            }}
          </div>
          <div class="data-grid__modal_status">
            {{
              `${
                new Date(useParseDeadline(activeTable?.deadline)).getTime() >
                  new Date().getTime() || !activeTable
                  ? "Активная"
                  : "Завершена"
              }`
            }}
          </div>
        </div>
      </div>
      <DialogForm
        @setToast="setToast"
        @closeModal="closeModal"
        :activeTable="activeTable"
      />
    </Dialog>
  </div>
</template>

<style scoped lang="scss">
.data-grid {
  background: white;
  width: 100%;
  border-radius: 8px;
  padding: 10px 20px;
  margin-bottom: 20px;

  &__header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
  &__button {
    min-width: 78px;
  }
  &__filter {
    margin-bottom: 30px;
  }
  &__table {
    min-height: calc(100vh - 420px);
    margin-bottom: 30px;
  }
  &__loading {
    @include flex-center();
    transform: translateY(100px);
    &_spinner {
      width: 30px;
      height: 30px;
    }
  }
  &__empty {
    text-align: center;
    transform: translateY(100px);
    font-size: 24px;
    color: $text_color;
    font-weight: 500;
  }
  &__menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__modal {
    margin-bottom: 25px;
    &_header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &_name {
      font-size: 16px;
      font-weight: 500;
      color: $text_color;
    }
    &_status {
      font-family: "Inter", sans-serif;
      font-size: 14px;
      font-weight: 400;
      color: $text_color;
    }
  }
}
</style>
