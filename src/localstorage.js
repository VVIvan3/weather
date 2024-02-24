class LocalStorageManager {
  static setKey(key) {
    localStorage.setItem("APIKEY", JSON.stringify(key));
  }
  static getKey() {
    return JSON.parse(localStorage.getItem("APIKEY"));
  }
}

export { LocalStorageManager };
