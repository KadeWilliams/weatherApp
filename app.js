const APIkey = 'ab0188c6e0049173f7b0de32663d42c4';
let cityData;

const tempType = document.querySelector('.tempType');
const search = document.querySelector(".searchButton");

const convertKelvin = (tempF) => {
    return Math.ceil((9 / 5) * (tempF - 273) + 32);
}

const createWeatherDisplay = (data) => {
    const weatherInfoCard = document.querySelector('.weatherInfoCard');

    const weatherInfo = document.querySelector('.weatherInfo');
    if (weatherInfo.classList.contains('hidden')) {
        weatherInfo.classList.toggle('hidden');
    }

    const cardHeader = document.querySelector(".card-header");
    cardHeader.textContent = data.name;

    const temperatureF = document.querySelector('.temperatureF');
    temperatureF.innerHTML = `${convertKelvin(data.main.temp)}&deg;`;

    const icon = document.querySelector('.icon');
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    const highTemp = document.querySelector('.tempHighF');
    highTemp.innerHTML = `High: ${convertKelvin(data.main.temp_max)}&deg;`;

    const lowTemp = document.querySelector('.tempLowF');
    lowTemp.innerHTML = `Low: ${convertKelvin(data.main.temp_min)}&deg;`;

    const description = document.querySelector('.description');
    description.innerHTML = `${data.weather[0].description}`;

    const wind = document.querySelector('.wind');
    wind.innerHTML = `Wind: ${data.wind.speed}`;
}

async function getWeatherData(city) {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`);
    return await response.json();
}

search.addEventListener('click', async (e) => {
    let cityName = document.querySelector('#city');
    if (!cityName.checkValidity()) {
        alert("Please enter a city!");
    } else {
        e.preventDefault();
        cityData = await getWeatherData(cityName.value);
        cityName.value = '';
        createWeatherDisplay(cityData);
    }
});

