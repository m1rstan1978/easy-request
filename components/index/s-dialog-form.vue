<script setup>
import DropdownMenu from "@/components/ui/dropdown/s-dropdown-menu.vue";
import DropdownTrigger from "@/components/ui/dropdown/s-dropdown-trigger.vue";
import { useRequestServer } from "~/store/useRequest";

const props = defineProps({
  activeTable: Object,
});
const emit = defineEmits();

const useRequest = useRequestServer();
const arrErrors = ref([]);
const isLoadingBtn = ref(false);
const isLoadingDeleteBtn = ref(false);

function setOption(item) {
  useRequest.setOptionDropdown(item);
}

async function createRequest() {
  arrErrors.value = useRequest.checkErrorsFormFields();
  if (arrErrors.value.length > 0) {
    emit("setToast", {
      positionToast: "center",
      openToast: true,
      titleToast: "Ошибка создании заявки",
      iconToast: "error",
      messageToast: arrErrors.value.filter((_, idx) => idx < 1),
      timeOutToast: 3000,
    });
    isLoadingBtn.value = false;
    return;
  }
  const infoJwt = useDecodeInfoJwt(sessionStorage.getItem("accessToken"));
  const getValuesFields = {
    ...useRequest.parseFormFields,
    user_id: !infoJwt?.id ? null : infoJwt.id,
  };

  const parseDeadline = parseDeadlineForCreateReq(getValuesFields.deadline);
  getValuesFields.deadline = !parseDeadline ? "" : parseDeadline;

  await sendCreateRequest(getValuesFields);
}

async function sendCreateRequest(data) {
  try {
    const response = await useRequest.createRequest(data);
    if (response) {
      emit("setToast", {
        positionToast: "right",
        openToast: true,
        titleToast: "Успешно",
        messageToast: `Ваша заявка была успешно ${
          !props.activeTable ? "создана" : "сохранена"
        }!`,
        iconToast: "success",
        timeOutToast: 6000,
      });
    }
    emit("closeModal");
  } catch (e) {
    emit("setToast", {
      positionToast: "center",
      openToast: true,
      titleToast: "Ошибка создании заявки",
      iconToast: "error",
      messageToast: e.message,
      timeOutToast: 3000,
    });
  } finally {
    isLoadingBtn.value = false;
  }
}

function parseDeadlineForCreateReq(dateStr) {
  return useParseDeadline(dateStr);
}

const useDebounceCreate = useDebounce(createRequest, 300);

const startLoading = () => {
  emit("setToast", {
    openToast: false,
  });
  isLoadingBtn.value = true;
  useDebounceCreate();
};

const useDebounceDelete = useDebounce(removeRequest, 300);

const startLoadingRemoveRequest = idRequest => {
  emit("setToast", {
    openToast: false,
  });
  isLoadingDeleteBtn.value = true;
  useDebounceDelete.call(idRequest);
};

async function removeRequest() {
  try {
    await useRequest.removeRequest(this);
    emit("setToast", {
      positionToast: "right",
      openToast: true,
      titleToast: "Успешно",
      messageToast: `Ваша заявка была успешно удалена!`,
      iconToast: "success",
      timeOutToast: 6000,
    });
    emit("closeModal");
  } catch (e) {
    emit("setToast", {
      positionToast: "center",
      openToast: true,
      titleToast: "Ошибка удалении заявки",
      iconToast: "error",
      messageToast: e.message,
      timeOutToast: 3000,
    });
  } finally {
    isLoadingDeleteBtn.value = false;
  }
}

const useDebounceEdit = useDebounce(editRequest, 300);

const startLoadingEditRequest = () => {
  emit("setToast", {
    openToast: false,
  });
  isLoadingBtn.value = true;
  useDebounceEdit.call(props.activeTable);
};

async function editRequest() {
  const data = {
    id: props.activeTable?.id,
    created: props.activeTable?.created,
    ...useRequest.parseFormFields,
    deadline: parseDeadlineForCreateReq(useRequest.parseFormFields?.deadline),
    user_id: useDecodeInfoJwt(sessionStorage.getItem("accessToken"))?.id,
  };
  try {
    await useRequest.editRequest(data);
    emit("setToast", {
      positionToast: "right",
      openToast: true,
      titleToast: "Успешно",
      messageToast: `Ваша заявка была успешно сохранена!`,
      iconToast: "success",
      timeOutToast: 6000,
    });
    emit("closeModal");
  } catch (e) {
    emit("setToast", {
      positionToast: "center",
      openToast: true,
      titleToast: "Ошибка изменения заявки",
      iconToast: "error",
      messageToast: e.message,
      timeOutToast: 3000,
    });
  } finally {
    isLoadingBtn.value = false;
  }
}

onUnmounted(() => {
  useRequest.cleanedFields();
});
</script>

<template>
  <form class="dialog-form" @submit.prevent="startLoading">
    <div class="dialog-form__fields">
      <div
        class="dialog-form__fields_item"
        v-for="(item, idx) in useRequest.getFormFields"
        :key="item.id"
        :class="[
          'form__fields_item' + (idx + 1),
          {
            errorBorder: arrErrors?.find(el => el.idx === idx),
          },
        ]"
      >
        <label
          class="dialog-form__label"
          :class="{
            labelPresent:
              item?.inputValue?.length > 0 ||
              item?.activeItemHouses?.name?.length > 0,
            labelErrorValue: arrErrors?.find(el => el.idx === idx),
          }"
          >{{ item.placeholder }}</label
        >
        <DropdownMenu
          v-if="item.dropdown"
          class="dialog-form__fields_dropdown"
          :options="item.optionsDropDown"
          @setOption="setOption"
          :activeItem="item.activeItemHouses"
          :idx="idx"
        >
          <DropdownTrigger
            :name="!item.activeItemHouses ? 'Дом' : item.activeItemHouses.name"
            :activeItem="item.activeItemHouses"
          />
        </DropdownMenu>
        <UiSTextarea
          v-else-if="item?.textArea"
          :placeholder="item.placeholder"
          :options="item.optionStyle"
          v-model="item.inputValue"
        />
        <UiSInput
          v-else
          :type="item.type"
          :placeholder="item.placeholder"
          :maskDate="item?.maskDate"
          :maskPhone="item?.maskPhone"
          :options="{ padding: '0 0 15px 0' }"
          v-model="item.inputValue"
        />
      </div>
    </div>
    <div class="dialog-form__submit">
      <div class="dialog-form__btn" v-if="!activeTable">
        <UiSButton type="submit" :loading="isLoadingBtn">Создать</UiSButton>
      </div>
      <div class="dialog-form__buttons" v-else>
        <UiSButton
          class="dialog-form__buttons_delete"
          type="button"
          :loading="isLoadingDeleteBtn"
          :styleButton="{
            background: '#e60000',
          }"
          @click="startLoadingRemoveRequest(activeTable.id)"
          >Удалить</UiSButton
        >
        <UiSButton
          class="dialog-form__buttons_save"
          type="button"
          :loading="isLoadingBtn"
          @click="startLoadingEditRequest"
          >Сохранить</UiSButton
        >
      </div>
    </div>
  </form>
</template>

<style scoped lang="scss">
.dialog-form {
  max-width: 100%;
  padding-top: 25px;
  &__fields {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    column-gap: 15px;
    row-gap: 45px;
    max-width: 100%;
    margin-bottom: 25px;

    &_item {
      position: relative;
      border-bottom: 1px solid #cccccc;
      max-width: 100%;
      transition: all 0.3s ease;
      input,
      textarea {
        border: none;
      }
    }
  }
  &__label {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 13px;
    color: $green;
    transform: translateY(-26px);
    opacity: 0;
    transition: all 0.3s ease;
  }
  &__submit {
    display: flex;
    justify-content: flex-end;
  }
  &__btn {
    width: 90px;
  }
  &__buttons {
    display: flex;
    column-gap: 10px;
    &_delete {
      width: 80px;
    }
    &_save {
      width: 110px;
    }
  }
}
.labelPresent {
  opacity: 1;
}
.labelErrorValue {
  color: red !important;
}
.errorBorder {
  border-bottom: 1px solid red;
}
.form__fields_item1 {
  @include grid-column(1, 4);
}
.form__fields_item2 {
  @include grid-column(4, 7);
}
.form__fields_item3 {
  @include grid-column(7, 10);
}
.form__fields_item4 {
  @include grid-column(1, 3);
}
.form__fields_item5 {
  @include grid-column(3, 5);
}
.form__fields_item6 {
  @include grid-column(5, 7);
}
.form__fields_item7 {
  @include grid-column(7, 10);
}
.form__fields_item8 {
  @include grid-column(1, 10);
}
</style>
