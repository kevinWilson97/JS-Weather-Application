const weatherIcon= document.querySelector('.weather-icon');
const temperatureElement= document.querySelector('.temperature p');
const weatherDescription= document.querySelector('.weather-description');
const locationElement= document.querySelector('.location p');
const notificationElement= document.querySelector('.notification');
const searchBar= document.querySelector('.searchForCity');


//event listeners

searchBar.addEventListener('keypress',startSearch)


const weather ={}

    weather.temperature= {
        unit: "celsius"
    }


const KELVIN= 273;
const key="82005d27a116c2880c8f0fcb866998a0";

if ('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPostion, showError)
} else{
    notificationElement.style.display="block";
    notificationElement.innerHTML ="<p> Your Browser doesn't Support Geolocation</p>";
}


function setPostion(position){

    let latitude= position.coords.latitude;
    let longitude= position.coords.longitude;

    // getWeather(latitude, longitude);
}

function showError(error){
    notificationElement.style.display="block";
    notificationElement.innerHTML=`<p>${error }</p>`;

}

// function getWeather(latitude, longitude){

//     let api=`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;   
//     console.log(api);
//     fetch(api)
//         .then(function (response){
//             let data= response.json();
//             return data;
//         })
//         .then(function (data){
//             weather.temperature.value= Math.floor(data.main.temp -KELVIN);
//             weather.weatherDescription= data.weather[0].description;
//             weather.iconId= data.weather[0].icon;
//             weather.city= data.name;
//             weather.country= data.sys.country;
    

//         })
//         .then(function(){
//             displayWeather();
//         });



// }


// // function displayWeather(){
// //     weatherIcon.innerHTML=`<img src="icons/${weather.iconId}.png">`;
// //     temperatureElement.innerHTML=`${weather.temperature.value} °<span>C</span>`;
// //     locationElement.innerHTML=`${weather.city}, ${weather.country}`;
// //     weatherDescription.innerHTML=`${weather.weatherDescription}`;    
// // }



function getSearchResult(query){
    let api_search=`http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${key}`;
    
    
    fetch(api_search)
        .then(function (response){
            let weather_data= response.json()
            return weather_data;

           })
           .then(function (weather_data){ 
                weather.temperature.value= Math.floor(weather_data.main.temp -KELVIN);
                weather.weatherDescription= weather_data.weather[0].description;
                weather.iconId= weather_data.weather[0].icon;
                weather.city= weather_data.name;
                weather.country= weather_data.sys.country;
           })
           .then(displayResult);


    }


function displayResult(weather_data){
    console.log(weather_data)
    weatherIcon.innerHTML=`<img src="icons/${weather.iconId}.png">`;
    temperatureElement.innerHTML=`${weather.temperature.value} °<span>C</span>`;
    locationElement.innerHTML=`${weather.city}, ${weather.country}`;
    weatherDescription.innerHTML=`${weather.weatherDescription}`;    
    searchBar.value=  `${weather.city}, ${weather.country}`

}

     





function startSearch(event){

    if(event.keyCode==13){
        getSearchResult(searchBar.value);
    }
}