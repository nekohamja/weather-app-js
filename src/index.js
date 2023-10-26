import "./styles/index.scss";
import ui from "./modules/ui.js";
import weather from "./modules/weather.js";

ui.handleSearchBar();
ui.setGreeting();

// load default search
document.addEventListener("DOMContentLoaded", async () => {
  ui.OpenLoadingIcon("fetching data...");
  const weatherData = await weather.getData("Tokyo");
  ui.setLocation(weatherData);
  setTimeout(ui.OpenLoadingIcon, 2000);
});

// fire weather data after search input
const searchInput = document.querySelector("#search");
searchInput.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    ui.clear();
    if (searchInput.value !== "") {
      ui.OpenLoadingIcon();
      const weatherData = await weather.getData(searchInput.value);
      ui.setLocation(weatherData);
      setTimeout(ui.OpenLoadingIcon, 1000);
      ui.clear();
    } else ui.clear();
  }
});
