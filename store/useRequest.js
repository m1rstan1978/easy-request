import formFieldsJson from "@/public/json/formFields.json";
import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

export const useRequestServer = defineStore("useRequestServer", {
  state: () => {
    return {
      formFields: formFieldsJson,
    };
  },
  getters: {
    getFormFields(state) {
      return state.formFields;
    },
  },
  actions: {
    setOptionDropdown(item) {
      this.formFields[item.idx].activeItemHouses = item.el;
    },
    fillDialogFields(item) {
      Object.entries(item).forEach(([key, value]) => {
        const field = this.formFields.findIndex(el => el.name === key);
        if (field < 0) return;

        if (key === "house") {
          this.formFields[field].activeItemHouses = {
            id: uuidv4(),
            name: value,
          };
        } else {
          this.formFields[field].inputValue = value;
        }
      });
    },
    validateDate(el, idx) {
      const [datePart] = el.inputValue.split(" ");
      const [day, month, year] = datePart.split(".");

      const inputDate = new Date(year, month - 1, day);
      if (
        inputDate.getDate() != day ||
        inputDate.getMonth() + 1 != month ||
        inputDate.getFullYear() != year
      ) {
        return { errorText: el.regExpErrorText, idx };
      }
      const currentDate = new Date();

      if (inputDate <= currentDate) {
        return { errorText: el.regExpErrorText, idx };
      }
    },
    checkErrorsFormFields() {
      return this.formFields
        .map((el, idx) => {
          let activeValue =
            el.name === "house" ? el.activeItemHouses : el.inputValue;

          if (el.name === "deadline") {
            return this.validateDate(el, idx);
          }
          if (activeValue && el.name === "house") {
            activeValue = activeValue.name;
          }
          const regExp = new RegExp(el.regExp);
          if (!regExp.test(activeValue) || !activeValue) {
            return { errorText: el.regExpErrorText, idx };
          }
        })
        .filter(el => (!el && el !== 0 ? false : true));
    },
    cleanedFields() {
      this.formFields = this.formFields.map(el =>
        el.name === "house"
          ? { ...el, activeItemHouses: null }
          : { ...el, inputValue: "" }
      );
    },
  },
});
