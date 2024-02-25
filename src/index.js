import "./style.css";
import { KeyController } from "./keyget";
import { LocalStorageManager } from "./localstorage";
import { WeatherAPI } from "./weatherapi";

let APIKEY;

class PageRenderer {
  static renderGreeterTitle() {
    const currentCity = document.querySelector(".city");
    currentCity.textContent = LocalStorageManager.getCity();
  }
  static async renderToday() {
    const data = await DataManager.getTodayWeatherData();
    const todayCondition = document.querySelector(".todaycondition");
    const todayIcon = document.querySelector(".todayicon");
    const todayTemp = document.querySelector(".todaytemp");
    const todayFeelsLike = document.querySelector(".todayfeels");
    todayIcon.src = data.condition.icon;
    todayCondition.textContent = data.condition.text;
    todayTemp.textContent = data.temp_c;
    todayFeelsLike.textContent = data.feelslike_c;
  }
  static async renderForecast() {
    const data = await DataManager.getForecastData();
    for (let i = 0; i < data.length; i++) {
      const selectedData = data[i]
      const forecastTitle = document.querySelector(
        `.forecasttitle#f-${i + 1}`
      );
      const forecastIcon = document.querySelector(
        `.forecasticon#f-${i + 1}`
      );
      const forecastCondition = document.querySelector(
        `.forecastcondition#f-${i + 1}`
      );
      const forecastTemp = document.querySelector(
        `.forecasttemp#f-${i + 1}`
      );
      forecastTitle.textContent = selectedData.date.split('-')[2]
      forecastIcon.src = selectedData.day.condition.icon
      forecastCondition.textContent = selectedData.day.condition.text
      forecastTemp.textContent = selectedData.day.avgtemp_c
    }
  }
  static renderAll() {
    PageRenderer.renderGreeterTitle();
    PageRenderer.renderToday();
    PageRenderer.renderForecast();
  }
}

class DataManager {
  static restoreGlobalKey() {
    APIKEY = LocalStorageManager.getKey();
  }
  static async getTodayWeatherData() {
    const currentData = await WeatherAPI.getCurrentData(
      LocalStorageManager.getCity()
    );
    const temperatureData = await currentData.current;
    return temperatureData;
  }
  static async getForecastData() {
    const currentData = await WeatherAPI.getCurrentData(
      LocalStorageManager.getCity()
    );
    const forecastedArray = await currentData.forecast.forecastday.slice(1);
    return forecastedArray;
  }
}

const pageLoad = (() => {
  const keyDialogue = document.querySelector("dialog");
  const keyInputBtn = document.querySelector(".submitkey");
  const setCityBtn = document.querySelector(".citysearch");
  window.addEventListener("DOMContentLoaded", () => {
    DataManager.restoreGlobalKey();
    if (APIKEY == null) {
      keyDialogue.showModal();
    }
    if (LocalStorageManager.getCity() == null) {
      LocalStorageManager.setCity();
    }
    PageRenderer.renderAll();
  });

  keyInputBtn.addEventListener("click", () => {
    APIKEY = KeyController.getKey();
    LocalStorageManager.setKey(APIKEY);
    keyDialogue.close();
    PageRenderer.renderAll();
  });

  setCityBtn.addEventListener("click", async () => {
    const cityInput = document.querySelector(".cityinput");
    const errorMessage = document.querySelector(".error");
    const currentData = await WeatherAPI.getCurrentData(cityInput.value);
    if (currentData.error) {
      errorMessage.classList.add("active");
      return;
    }
    errorMessage.classList.remove("active");
    LocalStorageManager.setCity(currentData.location.name);
    PageRenderer.renderAll();
  });
})();

export { APIKEY };
