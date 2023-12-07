import axios from "axios";

export const apiUrl = "https://api.openweathermap.org/data/2.5";

axios.defaults.baseURL = apiUrl;
axios.defaults.headers.common["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.headers.common.Accept = "application/json";

class Api {
  static getCurrentWeatherData({ city, unit }: { city: string; unit: string }) {
    return axios.get("/weather", {
      params: {
        q: city,
        units: unit,
        appid: "54e323d05616ca13d670cd64f19dbd50",
      },
    });
  }

  static getWeatherListData({ city, unit }: { city: string; unit: string }) {
    return axios.get("/forecast", {
      params: {
        q: city,
        units: unit,
        appid: "54e323d05616ca13d670cd64f19dbd50",
      },
    });
  }
}

export default Api;
