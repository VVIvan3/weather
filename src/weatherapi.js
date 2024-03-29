import { APIKEY } from ".";

class WeatherAPI {
  static async getCurrentData(location) {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&days=3&q=${location}`,
        { mode: "cors" }
      );
      const data = await response.json();
      return data
    } catch (error) {
      console.error(`error: ${error}`);
    }
  }
}

export { WeatherAPI };
