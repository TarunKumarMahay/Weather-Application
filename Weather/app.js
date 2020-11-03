// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");
//App data
const weather = {};
weather.temperature ={
    unit : "celsius"
}
const KELVIN = 273;
const key = "712cb1825fca762bd65ee3dc5824bff4";
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition , showError);    
}
else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't support geoLocation </p>";
}

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude, longitude);
}

function showError(error){
     notificationElement.style.display = "block";
     notificationElement.innerHTML = '<p>${error.message}</p>';
}

   // const proxy = "https://cors-anywhere.herokuapp.com/";
function getWeather(latitude , longitude){
    
    
    let api =  'http://api.openweathermap.org/data/2.5/weather?lat='+latitude + '&lon='+longitude+'&appid=712cb1825fca762bd65ee3dc5824bff4';
    console.log(api);
    fetch(api)
        .then(function(response){
              let data = response.json();
              return data;
            })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather(); 
              })   
      
        }
     function displayWeather(){
         const temp = "icons/"+weather.iconId+".png";
         iconElement.innerHTML = '<img src ='+temp +'>';
         tempElement.innerHTML = weather.temperature.value+'&deg<span>C</span>';
         descElement.innerHTML = weather.description;
         locationElement.innerHTML = weather.city, weather.country;
         
     }

    function celsiusToFarhenheit(temperature){
        return((temperature*(9/5)) + 32);
    }

    tempElement.addEventListener("click", function(){
        if(weather.temperature.value === undefined) return;
        if(weather.temperature.unit === "celsius"){
            let farhenheit =celsiusToFarhenheit(weather.temperature.value);
            farhenheit = Math.floor(farhenheit);
            
            tempElement.innerHTML = farhenheit+'&deg<span>F</span>';
            weather.temperature.unit = "farhenheit";
        }
        else{
            tempElement.innerHTML = weather.temperature.value+'&deg<span>C</span>';
            weather.temperature.unit = "celsius";
        }
    })


