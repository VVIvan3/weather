import "./style.css";
import { KeyController } from "./keyget";
import { LocalStorageManager } from "./localstorage";

let APIKEY;

class DataManager {
  static restoreGlobalKey() {
    APIKEY = LocalStorageManager.getKey();
  }
}

const pageLoad = (() => {
  const keyDialogue = document.querySelector("dialog");
  const keyInputBtn = document.querySelector(".submitkey");

  window.addEventListener("DOMContentLoaded", () => {
    DataManager.restoreGlobalKey();
    if (APIKEY == null) {
      keyDialogue.showModal();
    }
  });

  keyInputBtn.addEventListener("click", () => {
    APIKEY = KeyController.getKey();
    LocalStorageManager.setKey(APIKEY);
    keyDialogue.close();
  });
})();
