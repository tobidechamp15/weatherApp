const apiKey = "3e300be3558d50948cd69d2514d50a1a";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Function to update the weather information on the page
function updateWeather(data) {
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

  if (data.weather[0].main == "Clouds") {
    weatherIcon.src = "assets/clouds.png";
  } else if (data.weather[0].main == "Clear") {
    weatherIcon.src = "assets/clear.png";
  } else if (data.weather[0].main == "Rain") {
    weatherIcon.src = "assets/rain.png";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.src = "assets/drizzle.png";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.src = "assets/mist.png";
  }
  document.querySelector(".weather").style.display = "block";
  document.querySelector(".error").style.display = "none";
}

// Function to handle the search and update localStorage
function handleSearch(city) {
  fetch(apiUrl + city + `&appid=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("lastCity", JSON.stringify(data)); // Store the data
      updateWeather(data); // Update the weather information on the page
    })
    .catch((error) => {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    });
}

// Event listener for the search button
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  handleSearch(searchBox.value);
});

// Check localStorage on page load and update weather information if data is available
document.addEventListener("DOMContentLoaded", () => {
  const lastCityData = localStorage.getItem("lastCity");
  if (lastCityData) {
    const lastCityWeather = JSON.parse(lastCityData);
    updateWeather(lastCityWeather);
  }
});

// const apiUrl2 =
//   "https://wft-geo-db.p.rapidapi.com/v1/geo/countries/US/regions/CA/cities";
const apiUrl2 = "wft-geo-db.p.rapidapi.com";
const apiKey2 = "e9dea959b7mshacefc397242e54cp19b33ejsna4df7b5e9c57";

//fetch api

// Function to fetch cities using the API key
async function fetchCities() {
  try {
    const response = await fetch(apiUrl2, {
      headers: {
        Authorization: `Bearer ${apiKey2}`,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }
    console.log(response);
    const data = await response.json();
    return data.cities;
    console.log(data.cities);
    // Assuming the response contains an array of cities
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
}
 

// Function to display cities on the page
// function displayCities(cities) {
//   const cityList = document.querySelector(".city-list");
// console.log(cityList)
//   cities.forEach((city) => {
//     // const cityItem = document.createElement("li");
//     // cityItem.textContent = city.name;
//     // cityList.appendChild(cityItem);
//     console.log(cityList)
//   });
// }

// // Load and display cities when the page is loaded
document.addEventListener("DOMContentLoaded", async () => {
  fetchCities();
});
