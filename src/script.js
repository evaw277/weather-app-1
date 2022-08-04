let now = new Date();

let h1 = document.querySelector("h1");

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();

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

let months = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

h1.innerHTML = `${hours}:${minutes}, ${day}  ${month} ${date}, ${year}`;

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = `${temperature}°C`;
  let windSpeed = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  windSpeed.innerHTML = `wind: ${response.data.wind.speed}`;
  humidity.innerHTML = `humidity: ${response.data.main.humidity}%`;

  let city = document.querySelector("h2");
  city.innerHTML = `${response.data.name}`;

  let description = response.data.weather[0].description;
  let currentDescription = document.querySelector("#weather-description");
  currentDescription.innerHTML = `${description}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  console.log(response);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input");
  let h2 = document.querySelector("h2");

  if (city.value) {
    h2.innerHTML = `{$city.value}`;
    let units = "metric";
    let apiKey = "a5dcf72a868ff3572b4a1a8358099667";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=${units}`;
    axios.get(url).then(showWeather);
  } else {
    h1.innerHTML = null;
    alert("Please type a city");
  }
}

function currentLocation(position) {
  let apiKey = "a5dcf72a868ff3572b4a1a8358099667";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let form = document.querySelector("#search-box");
form.addEventListener("submit", search);

let button = document.querySelector("#current-button");
button.addEventListener("click", getLocation);

let apiKey = "a5dcf72a868ff3572b4a1a8358099667";
let city = "New York";
let units = "metric";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
axios.get(url).then(showWeather);
