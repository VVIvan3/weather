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
    const test = document.querySelector(".test");
    todayIcon.src = data.condition.icon;
    todayCondition.textContent = data.condition.text;
    todayTemp.textContent = data.temp_c;
    todayFeelsLike.textContent = data.feelslike_c;
  }
  static renderAll() {
    PageRenderer.renderGreeterTitle();
    PageRenderer.renderToday();
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
