import formFieldsJson from "@/public/json/formFields.json";
import { useFetchRequest } from "@/store/useFetch";
import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

export const useRequestServer = defineStore("useRequestServer", {
  state: () => {
    return {
      formFields: formFieldsJson,
      arrInfoTable: null,
    };
  },
  getters: {
    getFormFields() {
      return this.formFields;
    },
    getArrTable() {
      return this.arrInfoTable;
    },
    parseFormFields() {
      return Object.fromEntries(
        this.formFields.map(el => {
          return el.name === "house"
            ? [
                el.name,
                !el.activeItemHouses?.name ? "" : el.activeItemHouses.name,
              ]
            : [el.name, el.inputValue];
        })
      );
    },
  },
  actions: {
    setOptionDropdown(item) {
      this.formFields[item.idx].activeItemHouses = item.el;
    },
    setArrRequests(item) {
      this.arrInfoTable = item;
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
    setLoadingInfoTable(value = null) {
      this.arrInfoTable = value;
    },
    async getArrInfoTable(setNullArrTable = true) {
      const fetchApi = useFetchRequest();

      if (setNullArrTable) {
        this.arrInfoTable = null;
      }

      const { query } = useRoute();
      const queryToString = useToQueryString(query);

      try {
        const response = await fetchApi.setFetch(
          `/api/request/data${queryToString}`,
          {
            method: "GET",
          }
        );
        if (response) {
          return response;
        }
        return [];
      } catch {
        return [];
      }
    },
    async createRequest(data) {
      const fetchApi = useFetchRequest();
      const response = await fetchApi.setFetch("/api/request/create", {
        method: "POST",
        body: data,
      });
      if (response?.request) {
        const getRequest = await this.getArrInfoTable(false);
        this.arrInfoTable = getRequest;
        return "success";
      }
      return null;
    },
    async removeRequest(id) {
      const fetchApi = useFetchRequest();
      const response = await fetchApi.setFetch(`/api/request/remove?id=${id}`, {
        method: "DELETE",
      });
      if (response) {
        const getRequest = await this.getArrInfoTable(false);
        this.arrInfoTable = getRequest;
        return response;
      }
      return null;
    },
    async editRequest(data) {
      const fetchApi = useFetchRequest();
      const response = await fetchApi.setFetch("/api/request/edit", {
        method: "PUT",
        body: data,
      });
      if (response?.updateRequest) {
        const { user_id, updatedAt, ...responseBody } = response.updateRequest;
        const findIndexRequest = this.arrInfoTable.requests.findIndex(
          el => el.id === responseBody.id
        );
        if (findIndexRequest >= 0) {
          this.arrInfoTable.requests[findIndexRequest] = responseBody;
        }
      }
    },
  },
});
