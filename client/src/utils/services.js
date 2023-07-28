export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const clearUser = () => {
  localStorage.clear();
};

export const isValidData = (data) => {
  let isValid = true;
  for (let key in data) {
    if (!data[key]) {
      isValid = false;
    }
  }
  return isValid;
};

export const convertToMillion = (num) => {
  if (num) {
    const millionFormat = (parseInt(num) / 1000000).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return millionFormat;
  }
  return 0;
};
