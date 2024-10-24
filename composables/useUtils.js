//debounce функция
export const useDebounce = (func, delay) => {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => func.call(this, args), delay);
  };
};

//Форматирование даты для инпута создании заявки
export const useFormatDateTimeInput = (e, checkBackspace) => {
  const inputValue = e.target.value;
  let arrValue = inputValue.split("");
  const filteredSymbolsArr = inputValue.replace(/[^\d ]/g, "");
  let getValue = null;

  if (checkBackspace) return false;

  if (isNaN(Number(arrValue[arrValue.length - 1]))) {
    arrValue.pop();
    return arrValue.join("");
  }

  if (filteredSymbolsArr.length === 8) {
    arrValue = arrValue.filter(el => el !== ".");
    arrValue.splice(2, 0, ".");
    arrValue.splice(5, 0, ".");
    getValue = arrValue.join("");
  } else if (filteredSymbolsArr.length >= 9) {
    arrValue.splice(arrValue.length - 1, 1);
    getValue = arrValue.join("");
  }
  return getValue;
};
