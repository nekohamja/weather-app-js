import weather from "./weather.js";
import utilities from "./utilities.js";

export default class ui {
  static setLocation(data) {
    if (!data) return;

    const country = document.querySelector("#country");
    const countryFlag = document.querySelector("#region-flag");
    const region = document.querySelector("#region");
    const condition = document.querySelector("#condition");
    const feelslike = document.querySelector("#feelslike");
    const time = document.querySelector("#time");
    const date = document.querySelector("#date");
    const temperature = document.querySelector("#temperature");
    const todayHeading = document.querySelector(".hour-today-title");
    const tomorrowHeading = document.querySelector(".hour-tomorrow-title");

    country.textContent = data.location.country;
    countryFlag.textContent = utilities.convertCountryToISO(
      data.location.country
    );
    region.textContent = data.location.name;
    condition.textContent = data.current.condition.text;
    feelslike.textContent = `Feels like ${data.current.feelslike_c} °C`;
    time.textContent = `${utilities.formatTime(
      data.location.localtime
    )} Local time`;
    date.textContent = utilities.formatDate("");
    temperature.textContent = `${data.current.temp_c} °C`;
    todayHeading.textContent = `Today @${
      data.location.name
    } ${utilities.convertCountryToISO(data.location.country)}`;
    tomorrowHeading.textContent = `Tomorrow @${
      data.location.name
    } ${utilities.convertCountryToISO(data.location.country)}`;

    ui.setPercentageBars(data);
    ui.setWeatherIcon(data);
    ui.setAstroForecast(data);
    ui.setHourForecast(data, "today");
    ui.setHourForecast(data, "tomorrow");
    ui.setTemperatureScale(data);
    ui.setMessages();
  }

  static setPercentageBars(data) {
    const humidity = document.querySelector("#humidity");
    const wind = document.querySelector("#wind");
    const uv = document.querySelector("#uv");
    const chanceOfRain = document.querySelector("#chance-of-rain");

    humidity.textContent = `${data.current.humidity} %`;
    wind.textContent = `${data.current.wind_kph} km/h`;
    uv.textContent = data.current.uv;
    chanceOfRain.textContent = `${data.forecast.day.daily_chance_of_rain} %`;

    humidity.parentNode.parentNode.childNodes[3].childNodes[1].style.width = `${data.current.humidity}%`;
    wind.parentNode.parentNode.childNodes[3].childNodes[1].style.width = `${weather.calculateWindSpeed(
      data.current.wind_kph
    )}%`;
    uv.parentNode.parentNode.childNodes[3].childNodes[1].style.width = `${weather.calculateUV(
      data.current.uv
    )}%`;
    chanceOfRain.parentNode.parentNode.childNodes[3].childNodes[1].style.width = `${data.forecast.day.daily_chance_of_rain}%`;
  }

  static setTemperatureScale(data) {
    const celsiusButton = document.querySelector(".celsius");
    const fahrenheitButton = document.querySelector(".fahrenheit");
    const temperature = document.querySelector("#temperature");
    const feelslike = document.querySelector("#feelslike");
    const forecastTempToday = document.querySelectorAll(".forecast-temp");
    const forecastTempTomorrow = document.querySelectorAll(
      ".forecast-tomorrow-temp"
    );
    const forecastTodayData = data.forecast.hour;
    const forecastTomorrowData = data.forecastTommorrow.hour;

    celsiusButton.addEventListener("click", () => {
      celsiusButton.classList.add("active");
      fahrenheitButton.classList.remove("active");
      temperature.textContent = `${data.current.temp_c} °C`;
      feelslike.textContent = `Feels like ${data.current.feelslike_c} °C`;

      forecastTodayData.forEach((data, index) => {
        forecastTempToday[index].textContent = `${data.temp_c} °C`;
      });

      forecastTomorrowData.forEach((data, index) => {
        forecastTempTomorrow[index].textContent = `${data.temp_c} °C`;
      });
    });
    fahrenheitButton.addEventListener("click", () => {
      fahrenheitButton.classList.add("active");
      celsiusButton.classList.remove("active");
      temperature.textContent = `${data.current.temp_f} °F`;
      feelslike.textContent = `Feels like ${data.current.feelslike_f} °F`;

      forecastTodayData.forEach((data, index) => {
        forecastTempToday[index].textContent = `${data.temp_f} °F`;
      });
      forecastTomorrowData.forEach((data, index) => {
        forecastTempTomorrow[index].textContent = `${data.temp_f} °F`;
      });
    });
  }

  static setAstroForecast(data) {
    const astroData = data.forecast.astro;
    const sunrise = document.querySelector("#sunrise");
    const sunset = document.querySelector("#sunset");
    const moonrise = document.querySelector("#moonrise");
    const moonset = document.querySelector("#moonset");
    const moonPhase = document.querySelector("#moon-phase");

    sunrise.textContent = astroData.sunrise;
    sunset.textContent = astroData.sunset;
    moonrise.textContent = astroData.moonrise;
    moonset.textContent = astroData.moonset;
    moonPhase.textContent = astroData.moon_phase;
  }

  static setHourForecast(data, type) {
    const hourData =
      type === "today" ? data.forecast.hour : data.forecastTommorrow.hour;
    const slider =
      type === "today"
        ? document.querySelector(".forecast-today-slider")
        : document.querySelector(".forecast-tomorrow-slider");
    const container = document.createElement("div");
    const text = document.createElement("p");
    const weatherIcon = document.createElement("img");

    container.classList.add("card");
    slider.innerHTML = "";

    hourData.forEach((data, index) => {
      const time = text.cloneNode(true);
      const temperature = text.cloneNode(true);
      const condition = text.cloneNode(true);
      const icon = weatherIcon.cloneNode(true);
      const card = container.cloneNode(true);
      const iconName = hourData[index].condition.icon.slice(-7);

      if (type === "today") {
        temperature.classList.add("forecast-temp");
      } else temperature.classList.add("forecast-tomorrow-temp");

      icon.src = hourData[index].is_day
        ? `./weather/64x64/day/${iconName}`
        : `./weather/64x64/night/${iconName}`;

      time.textContent = utilities.formatTime(data.time);
      temperature.textContent = `${data.temp_c} °C`;
      condition.textContent = data.condition.text;

      card.append(icon, time, temperature, condition);
      slider.appendChild(card);
    });
  }

  static setWeatherIcon(data) {
    const iconContainer = document.querySelector("#weather-icon");
    const iconName = data.current.condition.icon.slice(-7);
    const isDay = data.current.is_day;

    if (isDay) iconContainer.src = `./weather/64x64/day/${iconName}`;
    else iconContainer.src = `./weather/64x64/night/${iconName}`;
  }

  static setMessages() {
    ui.clear();
    const humidity = document.querySelector("#humidity");
    const uv = document.querySelector("#uv");
    const chanceOfRain = document.querySelector("#chance-of-rain");

    if (humidity.textContent.slice(0, -1) >= 70) {
      humidity.parentNode.parentNode.childNodes[5].textContent =
        "Light clothing is recommended";
    } else if (humidity.textContent.slice(0, -1) <= 30)
      humidity.parentNode.parentNode.childNodes[5].textContent =
        "Moisturizing skin is recommended";
    else humidity.parentNode.parentNode.childNodes[5].textContent = "";

    if (uv.textContent >= 6) {
      uv.parentNode.parentNode.childNodes[5].textContent =
        "Sunscreen recommended";
    } else uv.parentNode.parentNode.childNodes[5].textContent = "";

    if (chanceOfRain.textContent.slice(0, -1) >= 50) {
      chanceOfRain.parentNode.parentNode.childNodes[5].textContent =
        "Remember to bring umbrella";
    } else chanceOfRain.parentNode.parentNode.childNodes[5].textContent = "";
  }

  static setGreeting() {
    const greeting = document.querySelector(".greeting");
    const timeOfTheDay = utilities.getTimeOfDay();
    greeting.textContent = timeOfTheDay;
  }

  static handleSearchBar() {
    const searchBar = document.querySelector(".search-bar");
    const searchIcon = document.querySelector(".search-icon");
    const searchInput = document.querySelector("#search");
    searchBar.addEventListener("click", () => {
      searchBar.classList.add("active");
    });
    searchIcon.addEventListener("click", async () => {
      searchInput.focus();
      const weatherData = await weather.getData(searchInput.value);
      ui.setLocation(weatherData);
      ui.clear();
    });
    searchInput.addEventListener("focusout", ui.clear);
  }

  static OpenLoadingIcon() {
    const searchMessage = document.querySelector(".loading-icon");
    searchMessage.classList.toggle("active");
  }

  static clear() {
    const searchBar = document.querySelector(".search-bar");
    const searchInput = document.querySelector("#search");
    const sliders = document.querySelectorAll(".hour-forecast>div");

    sliders.forEach((slider) => {
      slider.scrollLeft = slider.scrollLeft - 5000;
    });
    searchBar.classList.remove("active");
    searchInput.blur();
  }
}
