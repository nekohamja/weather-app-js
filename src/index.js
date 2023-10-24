import "./styles/index.scss";
import ui from "./modules/ui.js";
import weather from "./modules/weather.js";

// fire weather data after search input
const searchInput = document.querySelector("#search");
searchInput.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    if (searchInput.value !== "") {
      const weatherData = await weather.getData(searchInput.value);
      ui.setLocation(weatherData);
    } else searchInput.blur();
  }
});
