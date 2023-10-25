import "./styles/index.scss";
import ui from "./modules/ui.js";
import weather from "./modules/weather.js";

ui.handleSearchBar();
ui.setGreeting();

// load default search
document.addEventListener("DOMContentLoaded", async () => {
  const weatherData = await weather.getData("Beijing");
  ui.setLocation(weatherData);
});

// fire weather data after search input
const searchInput = document.querySelector("#search");
searchInput.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    ui.clear();
    if (searchInput.value !== "") {
      const weatherData = await weather.getData(searchInput.value);
      ui.setLocation(weatherData);
      ui.clear();
    } else ui.clear();
  }
});
