const getWeatherData = async (cityName) => {
    try {
      const response = await fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${cityName}&days=3`, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
          "x-rapidapi-key": "0451404f0bmshf8d8c5718ec0d79p1698b2jsn676baf67c477"
        },
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);  
      return;
    }
  }

  const getTimeZoneData = async (cityName)=>{
    try{
        const response = await fetch(`https://weatherapi-com.p.rapidapi.com/timezone.json?q=${cityName}`, {
            method: "GET",
            headers: {
            "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
          "x-rapidapi-key": "0451404f0bmshf8d8c5718ec0d79p1698b2jsn676baf67c477"
            },
        });
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch(error){
        console.log(error);
        return;
    }
  }

  const displayCurrentTimeZone = (timeData) =>{
    const currentTimeDiv = document.getElementById("current-time");

    const currentTime = {
     name: timeData.location.name,
     region: timeData.location.region,
     country: timeData.location.country,
     continent: timeData.location.tz_id,
     time: timeData.location.localtime
    }

    const element = `
    <div class="weather-container1">
        <h2>Current Time Zone</h2>
        <h2 style="text">${currentTime.name}</h2>
        <p style="text">${currentTime.region}</p>
        <p>Country: ${currentTime.continent}</p>
        <p>Continent: ${currentTime.continent}</p>
        <p>Real-Time: ${currentTime.time}</p>
    </div>
    `
    currentTimeDiv.innerHTML = element;
  }

  const displayCurrentWeather = (weatherData) => {
    const currentWeatherDiv = document.getElementById("current-weather");

    const currentWeather = {
      condition: weatherData.current.condition.text,
      conditionImage: weatherData.current.condition.icon,
      temperature: weatherData.current.temp_c,
      humidity: weatherData.current.humidity,
      time: weatherData.current.last_updated
    }

    const element = `
      <div class="weather-container1">
        <h2>Current Weather</h2>
        <p style="text">"${currentWeather.condition}"</p>
        <img src="https:${currentWeather.conditionImage}" class="weather-image">
        <p>temperature: ${currentWeather.temperature}℃</p>
        <p>humidity: ${currentWeather.humidity}%</p>
        <p>(updated at ${currentWeather.time})</p>
      </div>
    `;
    currentWeatherDiv.innerHTML =  element;
  }


  const displayCityName = (weatherData)=>{
    const cityNameDiv = document.getElementById("city-description");
    const cityName = weatherData.location.name
    const element = `<h2>Showing the weather and timezone <br> of <br> ${cityName}</h2>`

    cityNameDiv.innerHTML = element;
  }

  const displayWeatherForecast = (weatherData) => {
    const forecastDiv = document.getElementById("weather-forecast");
    forecasts = weatherData.forecast.forecastday;

    let listOfElement = "";

    for (let i = 0; i < forecasts.length; i++) {
      const forecastData = {
        date: forecasts[i].date,
        condition: forecasts[i].day.condition.text,
        conditionImage: forecasts[i].day.condition.icon,
        avg_temp: forecasts[i].day.avgtemp_c,
        max_temp: forecasts[i].day.maxtemp_c,
        min_temp: forecasts[i].day.mintemp_c,
        avg_humidity: forecasts[i].day.avghumidity
      }

      const element = `
        <div class="weather-container">
          <h2>Weather of ${forecastData.date}</h2>
          <p style="text">"${forecastData.condition}"</p>
          <img src="https:${forecastData.conditionImage}" class="weather-image">
          <p>Average Temperture: ${forecastData.avg_temp}℃</p>
          <p>(Maximum: ${forecastData.max_temp}℃, Minimum: ${forecastData.min_temp}℃)</p>
          <p>Average Humidity: ${forecastData.avg_humidity}%</p>
        </div>
      `;
      listOfElement += element;
    }

    forecastDiv.innerHTML = listOfElement;
  }

  const searchWeather = async () => {
    const weatherInput = document.getElementById("city-name").value
    if (!weatherInput) {
        return null
      }
    const weatherData = await getWeatherData(weatherInput);
    const timeData = await getTimeZoneData(weatherInput);
    
    if (!weatherData.error) {
        
        displayCityName(weatherData);
        displayCurrentWeather(weatherData);
        displayWeatherForecast(weatherData);
        displayCurrentTimeZone(timeData);
        showResult()
      }
      else if(weatherData.error){
        errorMessage();
      }
      
  }


  const errorMessage = () =>{
    const errMessage = document.getElementById("error-message");
    errMessage.style.display = "flex";
    
    const cityDescription = document.getElementById("city-description")
    const displayFlex = document.getElementById("displayflex")
    const displayWeatherForecast = document.getElementById("weather-forecast")

    cityDescription.style.display = "none"
    displayFlex.style.display = "none"
    displayWeatherForecast.style.display = "none"
  }

const showResult = ()=>{
    const errMessage = document.getElementById("error-message");
    errMessage.style.display = "none";

    const cityDescription = document.getElementById("city-description")
    const displayFlex = document.getElementById("displayflex")
    const displayWeatherForecast = document.getElementById("weather-forecast")

    cityDescription.style.display = "inline"
    displayFlex.style.display = "flex"
    displayWeatherForecast.style.display = "flex"
}