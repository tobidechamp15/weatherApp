const apiKey = "3e300be3558d50948cd69d2514d50a1a";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=bangalore";

async function checkWeather() {
  const response = await fetch(apiUrl + `&appid=${apiKey}`);
  let data = await response.json();

  console.log(data);

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
}

checkWeather();
