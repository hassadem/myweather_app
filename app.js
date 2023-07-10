let weather = {
  apiKey: "1dbc1c79e001bf751501e79786b6afad",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    const city = document.querySelector(".search-box").value;
    this.fetchWeather(city);
  },
  getDeviceLocation: function () {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          this.fetchCityByCoordinates(latitude, longitude);
        },
        (error) => {
          console.log("Error getting device location:", error);
          // Fallback to a default city if location access is denied or unavailable
          this.fetchWeather("Abeokuta");
        }
      );
    } else {
      console.log("Geolocation is not supported.");
      // Fallback to a default city if geolocation is not supported
      this.fetchWeather("Abeokuta");
    }
  },
  fetchCityByCoordinates: function (latitude, longitude) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${this.apiKey}"
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => {
        const { name } = data;
        this.fetchWeather(name);
      })
      .catch((error) => {
        console.log("Error fetching city by coordinates:", error);
        // Fallback to a default city if an error occurs while fetching city by coordinates
        this.fetchWeather("Abeokuta");
      });
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document.querySelector(".search-box").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    weather.search();
  }
});

// Fetch weather based on the device location when the page loads
window.addEventListener("load", function () {
  weather.getDeviceLocation();
});