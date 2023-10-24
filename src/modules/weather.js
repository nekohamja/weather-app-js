/* eslint-disable camelcase */
export default class weather {
  static async getData(city) {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=f2dadfc93b46435e9c410604232410&q=${city}&days=1&aqi=no&alerts=no`;

    try {
      const response = await fetch(url, { mode: "cors" });
      if (!response.ok) throw new Error(`City ${city} not found.`);
      const data = weather.convertData(await response.json());

      //   const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      alert(error);
      return null;
    }
  }

  //   the functions below organizes the json file
  static convertData(data) {
    const forecast = data.forecast.forecastday[0];
    return {
      location: weather.parseLocation(data),
      current: weather.parseCurrentWeather(data),
      forecast: weather.parseForecast(forecast),
    };
  }

  static parseLocation({ location }) {
    const { country, region, localtime } = location;
    return { country, region, localtime };
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
    };
  }

  static parseForecast(forecast) {
    const { astro, day, hour } = forecast;
    return { astro, day, hour };
  }
}
