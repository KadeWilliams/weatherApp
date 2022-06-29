
const APIkey = 'ab0188c6e0049173f7b0de32663d42c4';
const searchButton = document.querySelector('.searchButton');
const weatherInfo = document.querySelector('.weatherInfo');
const mainContent = document.querySelector('.mainContent');
const header = document.querySelector('.header');

const colors = {
  "burning": "#ed1a1a",
  "hot": "#ed4f1a",
  "warm": "#ed871a",
  "neutral": "#eeff00",
  "cool": "#1aede3",
  "cold": "#1a25ed",
  "freezing": "#ed1ae3"
}

const getCityData = async (city) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIkey}`);
  const cityData = await response.json();
  return cityData;
}

const changeBGC = (temp) => {
  switch (true) {
    case temp > 99:
      console.log('damn hot!');
      mainContent.style.backgroundColor = colors.burning;
      break;
    case temp > 85:
      mainContent.style.backgroundColor = colors.hot;
      break;
    case temp > 70:
      mainContent.style.backgroundColor = colors.neutral;
      break;
    case temp > 60:
      mainContent.style.backgroundColor = colors.cool;
      break;
    case temp > 40:
      mainContent.style.backgroundColor = colors.cold;
      break;
    case temp > 32:
      mainContent.style.backgroundColor = colors.freezing;
      break;
  }


}

const changeHeader = () => {
  header.innerHTML += '<i class="fa-thin fa-sun"></i>';
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('.header')) {
      header.appendChild(skyVector);
      console.log(e)
    }
  })  
}

changeHeader();

const populateUI = (data) => {
  if(weatherInfo.hasChildNodes()) {
    weatherInfo.innerHTML = '';
  } 
  const cityNameElement = document.createElement('p');
  cityNameElement.classList.add("city")
  cityNameElement.innerText = data.name;

  const temperatureElement = document.createElement('p');
  temperatureElement.classList.add("temp")
  temperatureElement.innerText = Math.trunc(data.main.temp);

  weatherInfo.appendChild(cityNameElement);
  weatherInfo.appendChild(temperatureElement);

  mainContent.appendChild(weatherInfo);

  changeBGC(data.main.temp);
}

const searchForm = document.querySelector('form');
searchForm.addEventListener('click', function(e) {
    e.preventDefault();
})

searchButton.addEventListener('click', async (e) => {
  const cityName = document.querySelector('#city');
  const validityState = cityName.validity;

  if (!validityState.valueMissing && !validityState.rangeUnderflow) {
    const cityData = await getCityData(cityName.value);
    populateUI(cityData);  
  } else if (validityState.valueMissing){
    cityName.reportValidity("Please enter a city name!");
  } 
  cityName.value = '';
})
