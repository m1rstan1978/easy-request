<script setup>
import DialogForm from "@/components/index/s-dialog-form.vue";
import Table from "@/components/index/table/s-table.vue";
import Dialog from "@/components/ui/s-dialog.vue";
import { useRequestServer } from "~/store/useRequest";

const useRequest = useRequestServer();

const visibleDialog = ref(false);
const activeTable = ref(null);

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
  useRequest.fillDialogFields(item);
  activeTable.value = item;
  visibleDialog.value = true;
}

function closeModal() {
  visibleDialog.value = false;
  activeTable.value = null;
}

watch(visibleDialog, val => {
  const errorIcon = toastOptions.value.iconToast;
  if (!val && errorIcon === "error") {
    toastOptions.value.openToast = false;
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
      <Table @setItem="setItem" />
    </div>
    <div class="data-grid__menu">
      <div class="data-grid__counter">
        <IndexSCounter />
      </div>
      <div class="data-grid__pagination">
        <UiSPagination />
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
                : `Заявка № ${activeTable.number} (от ${activeTable.created})`
            }}
          </div>
          <div class="data-grid__modal_status">Активная</div>
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
    min-height: calc(100vh - 360px);
    margin-bottom: 30px;
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
