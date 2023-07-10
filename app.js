const city = document.querySelector(".city") ;
const icon = document.querySelector(".icon");
const description = document.querySelector(".description"); 
const temperature = document.querySelector(".temp");
const humid = document.querySelector(".humidity"); 
const wind = document.querySelector(".wind");
const weather = document.querySelector(".weather");

let weatherApp = {
    apiKey: "1dbc1c79e001bf751501e79786b6afad",
    fetchWeather: function (city) {
      fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey)
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
      city.innerText = "Weather in " + name;
      icon.src = "https://openweathermap.org/img/wn/" + icon + ".png";
      description.innerText = description;
      temperature.innerText = temp + "°C";
      humid.innerText = "Humidity: " + humidity + "%";
      wind.innerText = "Wind speed: " + speed + " km/h";
      weather.classList.remove("loading");
      document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-box").value);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weatherApp.search();
  });
  
  document.querySelector(".search-box").addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weatherApp.search();
      }
    });
  
  weatherApp.fetchWeather("Abeokuta");