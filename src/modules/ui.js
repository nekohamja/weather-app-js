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

    ui.setPercentageBars(data);
  }

  static setPercentageBars(data) {
    const humidity = document.querySelector("#humidity");
    const wind = document.querySelector("#wind");
    const uv = document.querySelector("#uv");

    humidity.textContent = `${data.current.humidity} %`;
    wind.textContent = `${data.current.wind_kph} km/h`;
    uv.textContent = data.current.uv;

    humidity.parentNode.parentNode.childNodes[3].childNodes[1].style.width = `${data.current.humidity}%`;
    wind.parentNode.parentNode.childNodes[3].childNodes[1].style.width = `${weather.calculateWindSpeed(
      data.current.wind_kph
    )}%`;
    uv.parentNode.parentNode.childNodes[3].childNodes[1].style.width = `${weather.calculateUV(
      data.current.uv
    )}%`;
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

  static setGreeting() {
    const greeting = document.querySelector(".greeting");
    const timeOfTheDay = utilities.getTimeOfDay();
    greeting.textContent = timeOfTheDay;
  }

  static clear() {
    const searchBar = document.querySelector(".search-bar");
    const searchInput = document.querySelector("#search");
    searchBar.classList.remove("active");
    searchInput.blur();
  }
}
