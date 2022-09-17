let now = new Date();
let h3 = document.querySelector("h3");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let date = now.getDate();
let month = now.getMonth();
let year = now.getFullYear();
h3.innerHTML = `${day}, ${hours}:${minutes} (${date}/ ${month}/ ${year})`;

function searching(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#query");
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${searchInput.value}`;
  searchCity(searchInput.value);
}

function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2eef83074441b3c32befbcb4126998a0&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let forms = document.querySelector("#form");
forms.addEventListener("submit", searching);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${temperature}`;
  let thirdElement = document.querySelector(".third");
  thirdElement.innerHTML =
    "Humidity:" + " " + response.data.main.humidity + "%";
  let firstElement = document.querySelector(".first");
  firstElement.innerHTML =
    "Wind:" + " " + Math.round(response.data.wind.speed) + "Km/H";
  let secondElement = document.querySelector(".second");
  secondElement.innerHTML =
    "Cloudiness:" + " " + response.data.clouds.all + "%";
  let emojiElement = document.querySelector("#emoji");
  emojiElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  emojiElement.setAttribute("alt", response.data.weather[0].description);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
}
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="50"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
displayForecast();
