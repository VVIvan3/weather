class LocalStorageManager {
  static setKey(key) {
    localStorage.setItem("APIKEY", JSON.stringify(key));
  }
  static getKey() {
    return JSON.parse(localStorage.getItem("APIKEY"));
  }
  static setCity(city = "nizhny-novgorod") {
    localStorage.setItem("city", JSON.stringify(city));
  }
  static getCity() {
    return JSON.parse(localStorage.getItem("city"));
  }
}

export { LocalStorageManager };
