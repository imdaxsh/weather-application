const weatherDiv = document.getElementById("weather");
const datetimeDiv = document.getElementById("datetime");

// Replace with your OpenWeatherMap API key
const API_KEY = "cbd5e55d603a3817583d30966ba6beb5";

function showDateTime() {
  const now = new Date();
  const formatted = now.toLocaleString(); // date + time
  datetimeDiv.innerText = `🕒 ${formatted}`;
}

function getWeather(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const temp = data.main.temp;
      const city = data.name;
      const weatherDesc = data.weather[0].description;

      weatherDiv.innerHTML = `
        📍 ${city} <br>
        🌡️ ${temp}°C <br>
        ☁️ ${weatherDesc}
      `;
    })  
    .catch(err => {
      weatherDiv.innerText = "❌ Failed to fetch weather data.";
    });
}

navigator.geolocation.getCurrentPosition(
  (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getWeather(lat, lon);
    showDateTime();
    setInterval(showDateTime, 1000); // Update time every second
  },
  (error) => {
    weatherDiv.innerText = "⚠️ Please allow location access.";
  }
);
