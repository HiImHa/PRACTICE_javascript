const API_KEY = "b3f386fb4a231aecda7320932cfeaba8";

const SEARCH_INPUT = document.querySelector(".search input");
const SEARCH_BTN = document.querySelector(".search button");
const WEATHER_ICON = document.querySelector(".weather-icon");
const INFO = document.querySelector(".info");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        INFO.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    let lat = position.coords.latitude.toString();
    let lon = position.coords.longitude.toString();
    async function checkCityName() {
        const DATA_CITYNAME_RESPONSE = await fetch("https://api.openweathermap.org/geo/1.0/reverse?" + "lat=" + lat + "&lon=" + lon + "&appid=" + API_KEY);
        var dataCityName = DATA_CITYNAME_RESPONSE.json();
        return dataCityName;
    }
    //Call .then on the promise to capture the results regardless of the promise state (resolved or still pending)
    checkCityName().then(
        function (value) {
            checkWeather(value[0].name);
        }
    )
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            INFO.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            INFO.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            INFO.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            INFO.innerHTML = "An unknown error occurred."
            break;
    }
}


getLocation();


async function checkWeather(cityName) {
    const RESPONSE = await fetch("https://api.openweathermap.org/data/2.5/weather?units=metric&lang=vi&" + "q=" + cityName + "&appid=" + API_KEY);
    var data = await RESPONSE.json(); //parsing it to produce a JavaScript object.

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    if (data.weather[0].main == "Clouds") {
        WEATHER_ICON.src = "./img/clouds.png";
    }
    else if (data.weather[0].main == "Clear") {
        WEATHER_ICON.src = "./img/clear.png";
    }
    else if (data.weather[0].main == "Rain") {
        WEATHER_ICON.src = "./img/rain.png";
    }
    else if (data.weather[0].main == "Drizzle") {
        WEATHER_ICON.src = "./img/drizzle.png";
    }
    else if (data.weather[0].main == "Mist") {
        WEATHER_ICON.src = "./img/mist.png";
    }
    else if (data.weather[0].main == "Snow") {
        WEATHER_ICON.src = "./img/snow.png";
    }
}


SEARCH_BTN.addEventListener("click", () => {
    checkWeather(SEARCH_INPUT.value);
});


// https://cssgradient.io/gradient-backgrounds/
// https://openweathermap.org/current#name
// https://support.google.com/maps/answer/2839911?hl=vi&authuser=0&visit_id=638263757293700581-2478272077&co=GENIE.Platform%3DDesktop&oco=&p=browser_lp&rd=1#permission&zippy=%2Cmicrosoft-edge