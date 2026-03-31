const apiKey = "d680f69846fc7b066e11a5dc95b99f97";

// Date Time
function updateTime() {
  const now = new Date();
  document.getElementById("dateTime").innerText =
    now.toLocaleString();
}
setInterval(updateTime, 1000);

// Fetch Weather
function getWeather() {
  const city = document.getElementById("cityInput").value;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => displayWeather(data));
}

// Display
function displayWeather(data) {
  document.getElementById("city").innerText =
    data.name + ", " + data.sys.country;

  document.getElementById("temp").innerText =
    data.main.temp + "°C";

  document.getElementById("desc").innerText =
    data.weather[0].description;

  document.getElementById("humidity").innerText =
    data.main.humidity + "%";

  document.getElementById("wind").innerText =
    data.wind.speed + " km/h";

  // Icon + Animation
  let weather = data.weather[0].main;

  if (weather === "Rain") {
    document.getElementById("icon").innerText = "🌧";
    document.getElementById("animation").className = "rain";
  } 
  else if (weather === "Clouds") {
    document.getElementById("icon").innerText = "☁";
    document.getElementById("animation").className = "cloud";
  } 
  else if (weather === "Clear") {
    document.getElementById("icon").innerText = "☀";
    document.getElementById("animation").className = "";
  } 
  else {
    document.getElementById("icon").innerText = "🌥";
    document.getElementById("animation").className = "";
  }
}

// Location
function getLocation() {
  navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
      .then(res => res.json())
      .then(data => displayWeather(data));
  });
}
