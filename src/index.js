import "./style.css"
import { keyController } from "./keyget";

let APIKEY;

const pageLoad = (() => {
  const keyDialogue = document.querySelector("dialog");
  const keyInputBtn = document.querySelector('.submitkey');

  window.addEventListener("DOMContentLoaded", () => {
    keyDialogue.showModal();
  });
  keyInputBtn.addEventListener('click', () => {
    APIKEY = keyController.getKey();
    keyDialogue.close();
  });
})();
