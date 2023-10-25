/* eslint-disable camelcase */
export default class weather {
  static async getData(city) {
    if (city === "") return;

    const url =
      location.protocol === "http:"
        ? `http://api.weatherapi.com/v1/forecast.json?key=f2dadfc93b46435e9c410604232410&q=${city}&days=1&aqi=no&alerts=no`
        : `https://api.weatherapi.com/v1/forecast.json?key=f2dadfc93b46435e9c410604232410&q=${city}&days=1&aqi=no&alerts=no`;

    try {
      const response = await fetch(url, { mode: "cors" });
      if (!response.ok) throw new Error(`City ${city} not found.`);
      const data = weather.convertData(await response.json());

      // const data = await response.json();
      console.log(data);

      return data;
    } catch (error) {
      alert(error);
      return null;
    }
  }

  //   the functions below organizes the api json file
  static convertData(data) {
    const forecast = data.forecast.forecastday[0];
    return {
      location: weather.parseLocation(data),
      current: weather.parseCurrentWeather(data),
      forecast: weather.parseForecast(forecast),
    };
  }

  static parseLocation({ location }) {
    const { country, localtime, name } = location;
    return { country, localtime, name };
  }

  static parseCurrentWeather({ current }) {
    const {
      condition,
      humidity,
      temp_c,
      temp_f,
      wind_kph,
      precip_mm: precipitation,
      cloud: cloudAmount,
      is_day,
      uv,
      feelslike_c,
      feelslike_f,
    } = current;
    return {
      condition,
      humidity,
      temp_c,
      temp_f,
      wind_kph,
      precipitation,
      cloudAmount,
      is_day,
      uv,
      feelslike_c,
      feelslike_f,
    };
  }

  static parseForecast(forecast) {
    const { astro, day, hour } = forecast;
    return { astro, day, hour };
  }

  // calculate percentage bars
  static calculateUV(value) {
    const MAX_UV = 11;
    return (value / MAX_UV) * 100;
  }

  static calculateWindSpeed(value) {
    const MAX_WIND_SPEED = 75;
    return (value / MAX_WIND_SPEED) * 100;
  }
}
