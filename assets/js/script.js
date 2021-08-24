var searchSection = document.querySelector(".search-section");
var searchResultsSection = document.querySelector(".search-results");
var currentCityStats = document.querySelector(".current-city-stats")
var fiveDaysEl = document.querySelector(".five-days");
var cityName =  document.querySelector(".city-name");
var currentDate =  document.querySelector(".current-date");
var symbol =  document.querySelector(".symbol");



// Search input
var searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value.trim();

  if (!searchInputVal) {
    console.error('Please input city name');
    return;
  }

  getCurrentWeather(searchInputVal)
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

function getCurrentWeather(city) {
    var currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=87c52a24cb3270fe385fbd5306e97665`
    fetch(currentWeatherURL) 
        .then(function(response){
            return response.json(); 
        })
        .then(function (data) {
            console.log(data)
            getFiveDay(data.coord.lat, data.coord.lon); 
        var cityName = document.querySelector(".city-name");
        var dailyTemp = document.querySelector(".daily-temp");
        var dailyWind = document.querySelector(".daily-wind");
        var dailyHumidity = document.querySelector(".daily-humidity");
        // Set the text content to the new variables
        cityName.textContent=data.name;
        dailyTemp.textContent="Temperature = " + Math.floor((data.main.temp - 273)*(9/5)+32) + " degrees Fahrenheit";
        dailyWind.textContent="Wind Speed = " + data.wind.speed + " mph";
        dailyHumidity.textContent="Humidity = " + data.main.humidity + "%";
    }) 
}   






function getFiveDay(lat, lon) {
    var fiveDayUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=87c52a24cb3270fe385fbd5306e97665`
    console.log(fiveDayUrl);

    fetch(fiveDayUrl)
      .then(function (response) {;
        return response.json();
      })
      .then(function (data) {
//         console.log(data.____);
//         for (var i=0; i<data.____.length; i++) {
//           var container = document.createElement('div');
//           var date = document.createElement("h3");
//           var temp = document.createElement("p");
//           var wind = document.createElement("p");
//           var humidity = document.createElement("p");
//         // Set the text content to the new variables
//           date.textContent=data.results[i].date;
//           temp.textContent=((data.results[i].temp - 273)*(9/5)+32) + " degrees Fahrenheit";
//           wind.textContent=data.results[i].wind_speed + " mph";
//           humidity.textContent=data.results[i].humidity;
//         // Add new variables to the div
//           container.appendChild(date);
//           container.appendChild(temp);
//           container.appendChild(wind);
//           container.appendChild(humidity);
//           fiveDaysEl.appendChild(container);
//         // Style of the cards that appear
//           container.style.border = "black";
//           container.style.backgroundColor= "white";  
//           container.style.margin = "5px";
//           container.style.color = "black";
//           container.style.textAlign = "center";
        // }
      });
  }
  

  