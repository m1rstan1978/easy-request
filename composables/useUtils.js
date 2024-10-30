import { jwtDecode } from "jwt-decode";

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

//Парс даты для правильного отображения заявок
export const useParseDate = value => {
  const date = new Date(value);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

//Получение правильных индексов
export const useGetNumberRequest = (startIndex, idx) => {
  return `${startIndex + idx}`;
};

//Преобразование query параметров в строку
export const useToQueryString = query => {
  return Object.entries(query)
    .map(([key, value], idx) => {
      return (idx === 0 ? `?` : `&`) + `${key}=${value}`;
    })
    .join("");
};

//Редирект на нужный query
export const useNavigateToRouter = async (router, route, newQuery = {}) => {
  const updateQuery = Object.fromEntries(
    Object.entries({
      ...route?.query,
      ...newQuery,
    }).filter(([_, value]) => value !== "" && value)
  );

  await router.replace({
    ...route,
    query: updateQuery,
  });
};

//Получить информацию о юзере
export const useDecodeInfoJwt = token => {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};

//Получить дедлайнов
export const useParseDeadline = deadline => {
  if (!/^\d{2}\.\d{2}\.\d{4}$/.test(deadline)) {
    return null;
  }
  const [day, month, year] = deadline.split(".").map(Number);
  return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0)).toISOString();
};
