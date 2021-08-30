var searchSection = document.querySelector(".search-section");
var searchResultsSection = document.querySelector(".search-results");
var currentCityStats = document.querySelector(".current-city-stats")
var fiveDaysEl = document.querySelector(".five-days");
var cityName =  document.querySelector(".city-name");
var currentDate =  document.querySelector(".current-date");
var symbol =  document.querySelector(".symbol");
var dailyUV = document.querySelector(".daily-UV");


// Search input
var searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value.trim();

  if (!searchInputVal) {
    console.error('Please input city name');
    return;
  }

  var stored = localStorage.setItem('searchedCities', searchInputVal);
  // var retrieved = localStorage.getItem(stored);
  clearBox(fiveDaysEl)
  getCurrentWeather(searchInputVal)
  

}
searchFormEl.addEventListener('submit', handleSearchFormSubmit);


// Clear the 5 days forecast before appending new data for the next searched city
function clearBox(fiveDaysEl){
  fiveDaysEl.innerHTML = "";
}


// Fetch chain to get the current weather and create the five day forecast
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
        var latestSearched = document.createElement("h3");
        // Set the text content to the new variables
        cityName.textContent=data.name;
        dailyTemp.textContent="Temperature = " + Math.floor((data.main.temp - 273)*(9/5)+32) + "°F";
        dailyWind.textContent="Wind Speed = " + data.wind.speed + " mph";
        dailyHumidity.textContent="Humidity = " + data.main.humidity + "%";
        latestSearched.textContent=data.name;
        searchSection.appendChild(latestSearched);
        
    }) 
    function getFiveDay(lat, lon) {
      var fiveDayUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=87c52a24cb3270fe385fbd5306e97665`
      console.log(fiveDayUrl);
      
      fetch(fiveDayUrl)
        .then(function (response) {;
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          for (var i=0; i<5; i++) {
            var container = document.createElement('div');
            var dailyDate = document.createElement("p");
            var temp = document.createElement("p");
            var wind = document.createElement("p");
            var humidity = document.createElement("p");
          // Set the text content to the new variables
            dailyDate.textContent= (+today.getDate()+ +[i])+ '/' + (today.getMonth() + 1) + '/' + (today.getFullYear());
            temp.textContent="Temp: " + Math.floor((data.daily[i].temp.day - 273)*(9/5)+32) + "°F";
            wind.textContent="Wind speed: " + data.daily[i].wind_speed + " mph";
            humidity.textContent="Humidity: " + data.daily[i].humidity + "%";
            dailyUV.textContent= "UVI: " + data.current.uvi;
          // Add new variables to the div
            container.appendChild(dailyDate);
            container.appendChild(temp);
            container.appendChild(wind);
            container.appendChild(humidity);
            fiveDaysEl.appendChild(container);
          // Style of the cards that appear
            dailyDate.style.fontWeight= "bolder";
            container.style.border = "rgb(20, 20, 89) solid 2px";
            container.style.backgroundColor= "rgb(137, 203, 254)"; 
            container.style.color = "rgb(20, 20, 89)";
            container.style.padding = "5px";
            container.style.borderRadius = "3px";
            container.style.width = "19%";
          }
        });
    }
}   

var today = new Date();







  

  