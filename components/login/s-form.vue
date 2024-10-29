<script setup>
import { useAuth } from "@/store/useAuth";

const emit = defineEmits();

const inputValLogin = ref("");
const inputValPassword = ref("");
const passwordHide = ref(false);

let labelLogin = ref("Логин");
let isLoading = ref(false);

const styleOptions = {
  padding: "8px 40px 8px 30px",
};

const useAuthPinia = useAuth();

function validateInputs() {
  const arrValues = [inputValLogin, inputValPassword].filter(
    el => el.value?.length <= 0
  );
  if (arrValues.length > 0) {
    labelLogin.value = "Необходимо заполнить все поля формы";
    return false;
  }
  labelLogin.value = "Логин";
  return true;
}

const debounceSendAuth = useDebounce(authLogin, 300);

function sendAuth() {
  isLoading.value = true;
  const validate = validateInputs();
  if (!validate) {
    isLoading.value = false;
    return;
  }
  debounceSendAuth();
}

async function authLogin() {
  const [username, passsword] = [inputValLogin.value, inputValPassword.value];
  try {
    const { data, message } = await useAuthPinia.login(username, passsword);
    if (message === "success") {
      sessionStorage.setItem("accessToken", data.accessToken);
      navigateTo("/");
    }
  } catch (e) {
    emit("error", e.message);
  } finally {
    isLoading.value = false;
  }
}

watch(passwordHide, val => {
  document.querySelector(".form__input_password").type = !val
    ? "password"
    : "text";
});

watch(inputValLogin, val => {
  if (labelLogin.value !== "Логин") {
    validateInputs();
  }
});

watch(inputValPassword, val => {
  if (labelLogin.value !== "Логин") {
    validateInputs();
  }
});
</script>

<template>
  <form class="form" @submit.prevent="sendAuth">
    <div class="form__item">
      <label
        class="form__label"
        :class="{ labelError: labelLogin !== 'Логин' }"
        >{{ labelLogin }}</label
      >
      <div class="form__input">
        <img class="form__icon" :src="'/images/ui/user-icon.svg'" />
        <uiSInput
          v-model="inputValLogin"
          type="text"
          placeholder="Введите логин"
          :options="styleOptions"
          :class="{
            inputError: inputValLogin.length <= 0 && labelLogin !== 'Логин',
          }"
        />
      </div>
    </div>
    <div class="form__item">
      <label
        class="form__label"
        :class="{
          labelError: inputValPassword.length <= 0 && labelLogin !== 'Логин',
        }"
        >Пароль</label
      >
      <div class="form__input">
        <img class="form__icon" :src="'/images/ui/password-icon.svg'" />
        <button
          class="form__hide"
          type="button"
          @click="passwordHide = !passwordHide"
        >
          <img
            :src="`/images/ui/password-${passwordHide ? 'hide' : 'open'}.svg`"
          />
        </button>
        <uiSInput
          class="form__input_password"
          v-model="inputValPassword"
          type="password"
          placeholder="Введите пароль"
          :options="styleOptions"
          :class="{
            inputError: inputValPassword.length <= 0 && labelLogin !== 'Логин',
          }"
        />
      </div>
    </div>
    <div class="form__submit">
      <div class="form__submit_btn">
        <UiSButton type="submit" :loading="isLoading">Войти</UiSButton>
      </div>
    </div>
  </form>
</template>

<style scoped lang="scss">
.form {
  &__label {
    font-size: 12px;
    color: $green;
    margin-left: 30px;
  }
  &__item:nth-child(1) {
    margin-bottom: 15px;
  }
  &__input {
    position: relative;
    margin-top: 2px;
  }
  &__icon {
    position: absolute;
    top: 12%;
    left: 0;
  }
  &__hide {
    position: absolute;
    top: 12%;
    right: 2%;
    width: 22px;
    height: 21px;
    cursor: pointer;
  }
  &__submit {
    @include flex-center();
    margin-top: 30px;
    &_btn {
      min-width: 120px;
    }
  }
}
.labelError {
  color: red;
}
.inputError {
  border-bottom: 1px solid red;
}
</style>
