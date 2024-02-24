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

  setCityBtn.addEventListener("click", () => {
    const cityInputValue = document.querySelector(".cityinput").value;
    // CONNECT TO API
  });
})();

export { APIKEY }