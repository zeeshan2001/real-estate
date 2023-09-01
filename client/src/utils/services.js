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

export const getRandomCoordinates = (coordinates) => {
  const results = {};

  const kmInLatitudeDegree = 111.0; // Approx. 111 km in a degree of latitude
  const kmInLongitudeDegree =
    111.0 * Math.cos((Math.PI / 180.0) * coordinates.lat); // Approx. 111 * cos(lat) km in a degree of longitude

  const maxDistanceKm = 50.0; // Max distance in km

  // Random factor that converts the max distance to degrees of latitude and longitude
  const randomLatFactor =
    (Math.random() - 0.5) * (maxDistanceKm / kmInLatitudeDegree) * 2;
  const randomLngFactor =
    (Math.random() - 0.5) * (maxDistanceKm / kmInLongitudeDegree) * 2;

  results["lat"] = coordinates.lat + randomLatFactor;
  results["lng"] = coordinates.lng + randomLngFactor;

  return results;
};
