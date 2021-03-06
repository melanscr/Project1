function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}
function search(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
function updateDestination(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-input").value;
  document.querySelector("h1").innerHTML = `${cityName}`;
  search(cityName);
}
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weatherCondition").innerHTML =
    response.data.weather[0].main;
  let message = `Current Temperature is ${temperature}°C`;
  let tempCity = document.querySelector(".currentTemperature");
  tempCity.innerHTML = `${message}`;
}
let dateElement = document.querySelector("#dayTime");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);
let form = document.querySelector("#search-form");
form.addEventListener("submit", updateDestination);
search("Boston");
