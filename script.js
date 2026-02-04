// OpenWeather API key (⚠ In production, never expose this in frontend code)
const apiKey = "9aad041a93f4bea4f8275e60bb156f6d";

// Base API URL with metric units (Celsius)
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// DOM elements for search input, button, and weather icon image
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Main function to fetch and display weather data
async function checkWeather(city) {

    // Prevent empty API calls if input is blank
    if (!city) return;

    try {
        // Fetch weather data from OpenWeather API
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        // If response is not successful (404, 401, 500 etc)
        if (!response.ok) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            return;
        }

        // Convert response into JSON data
        const data = await response.json();

        // Update city name and temperature
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML =
            Math.round(data.main.temp) + "°C";

        // Update humidity percentage
        document.querySelector(".humidity").innerHTML =
            data.main.humidity + "%";

        // Convert wind speed from meters/sec → Km/h and display
        document.querySelector(".wind").innerHTML =
            (data.wind.speed * 3.6).toFixed(1) + " Km/h";

        // Change weather icon based on weather condition
        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "./cloudy1.jpeg";
        }
        else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "./clear.jpeg";
        }
        else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "./rain3.png";
        }
        else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "./drizzle.jpeg";
        }
        else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "./misty.jpeg";
        }

        // Show weather card and hide error message on success
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

    } catch (error) {
        // Handle network errors or unexpected failures
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

// Event listener for search button click
// Trims whitespace before sending request
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value.trim());
});
