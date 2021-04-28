$('#search-btn').on('click', function(){
   let cityName = $('#city-name').val();
   getWeatherInfo(cityName);
});

function getWeatherInfo(cityName) {
   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=a4fc2c49c4ea222299041dc24c1b4c99&units=imperial`;

   fetch(apiUrl)
   .then(res => res.json())
   .then(data => {
      let card = $('<div>').addClass('card');
      let title = $('<h3>').addClass('card-title').text(data.name);
      // let icon = data.weather.icon;
      // title.append(icon);
      let temp = $('<p>').addClass('card-text').text(`Temp: ${data.main.temp}\xB0F`);
      let wind = $('<p>').addClass('card-text').text(`Wind Speed: ${data.wind.speed} MPH`);
      let humidity = $('<p>').addClass('card-text').text(`Humidity: ${data.main.humidity}\x25`);
      let lat = data.coord.lat;
      let lon = data.coord.lon;

      //getUvi(lat, lon);

      card.append(title, temp, wind, humidity);

      $('#current-weather').append(card);


   });
};

// function getUvi(lat, lon) {
//    let secondApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=a4fc2c49c4ea222299041dc24c1b4c99`;

//    fetch(secondApiUrl)
//    .then(res => res.json())
//    .then(data => {
//       let uvIndex = $('<p>').addClass('uv-index').text(`UV Index: ${data.current.uvi}`);
//       console.log(uvIndex);
//    });

//};

function getForecast(cityName) {
   let thirdApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=a4fc2c49c4ea222299041dc24c1b4c99`;

   fetch(thirdApiUrl)
   .then(res => res.json())
   .then(data => {

   });   
};