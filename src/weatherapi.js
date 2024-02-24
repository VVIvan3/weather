import { APIKEY } from ".";

class WeatherAPI {
  static async getCurrentTemp(location) {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${location}`,
      { mode: "cors" }
    );
    console.log(response);
  }
}

export { WeatherAPI };
