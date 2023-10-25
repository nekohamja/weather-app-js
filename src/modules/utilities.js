// utilities handled here (format date, time)
import { format } from "date-fns";

export default class utilities {
  static formatDate(date) {
    if (date === "") return format(new Date(), "EE, dd MMMM");
    else return format(new Date(date), "EE, dd MMMM");
  }

  static formatTime(time) {
    return format(new Date(time), "p");
  }

  static getTimeOfDay() {
    const hours = new Date().getHours();
    if (hours >= 1 && hours <= 11) return "Good morning";
    else if (hours >= 12 && hours <= 17) return "Good afternoon";
    else return "Good evening";
  }

  static convertCountryToISO(country) {
    const { flag } = require("country-emoji");
    return flag(country);
  }
}
