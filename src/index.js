import "./style.css";
import { KeyController } from "./keyget";
import { LocalStorageManager } from "./localstorage";
import { WeatherAPI } from "./weatherapi";

let APIKEY;

class PageRenderer {
  static renderGreeterTitle() {
    const currentCity = document.querySelector(".city");
    currentCity.textContent = LocalStorageManager.getCity(); // change than to location.name
  }
  static renderAll() {
    PageRenderer.renderGreeterTitle();
  }
}

class DataManager {
  static restoreGlobalKey() {
    APIKEY = LocalStorageManager.getKey();
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
    const errorMessage = document.querySelector('.error');
    const currentData = await WeatherAPI.getCurrentData(cityInput.value);
    if (currentData.error) {
      errorMessage.classList.add('active')
      return;
    }
    errorMessage.classList.remove('active')
    LocalStorageManager.setCity(currentData.location.name);
    // CALL, RENDER CITY NAME, AND VALUES THEN
    PageRenderer.renderAll();
  });
})();

export { APIKEY };
