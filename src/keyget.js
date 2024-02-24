class KeyController {
  static getKey() {
    const keyInput = document.querySelector('#key');
    return keyInput.value;
  }
}

export { KeyController }