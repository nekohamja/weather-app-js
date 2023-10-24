export default class ui {
  static setLocation(weatherData) {
    if (!weatherData) return;

    const country = document.querySelector("#country");
    const region = document.querySelector("#region");
    const condition = document.querySelector("#condition");
    const localTime = document.querySelector("#local-time");
    const temperature = document.querySelector("#temperature");
    const humidity = document.querySelector("#humidity");
    const wind = document.querySelector("#wind");

    country.textContent = `${weatherData.location.country}`;
    region.textContent = `${weatherData.location.region}`;
    condition.textContent = `${weatherData.current.condition.text}`;
    localTime.textContent = `${weatherData.location.localtime}`;
    temperature.textContent = `${weatherData.current.temp_c} °C`;
    humidity.textContent = `${weatherData.current.humidity} %`;
    wind.textContent = `${weatherData.current.wind_kph} kph`;
  }
}
