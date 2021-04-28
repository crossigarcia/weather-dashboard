$('#search-btn').on('click', function(){
   let cityName = $('#city-name').val();

   $('#current-weather').html('');

   getWeatherInfo(cityName);
   
});

function getWeatherInfo(cityName) {
   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=a4fc2c49c4ea222299041dc24c1b4c99&units=imperial`;

   fetch(apiUrl)
   .then(res => res.json())
   .then(data => {
      let mainCard = $('<div>').addClass('col main-card card w-100');
      let title = $('<h3>').addClass('card-title').text(`${data.name}`);
      let icon = $('<img>').attr('src', `http://openweathermap.org/img/w/${data.weather[0].icon}.png`).addClass('forecast-icon');
      let date = $('<p>').addClass('card-text').text(`${new Date().toLocaleString().split(',')[0]}`);
      let temp = $('<p>').addClass('card-text').text(`Temp: ${data.main.temp}\xB0F`);
      let wind = $('<p>').addClass('card-text').text(`Wind Speed: ${data.wind.speed} MPH`);
      let humidity = $('<p>').addClass('card-text').text(`Humidity: ${data.main.humidity}\x25`);
      let lat = data.coord.lat;
      let lon = data.coord.lon;

      title.append(date, icon);
      mainCard.append(title, temp, wind, humidity);

      $('#current-weather').append(mainCard);

      getUvi(lat, lon);
      getForecast(cityName);
   });
};

function getUvi(lat, lon) {
   let secondApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=a4fc2c49c4ea222299041dc24c1b4c99`;

   fetch(secondApiUrl)
   .then(res => res.json())
   .then(data => {
      let uvIndex = $('<p>').addClass('uv-index').text(`UV Index: ${data.current.uvi}`);
      
      $('.main-card').append(uvIndex);
   });

};

function getForecast(cityName) {
   let thirdApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=a4fc2c49c4ea222299041dc24c1b4c99&units=imperial`;

   fetch(thirdApiUrl)
   .then(res => res.json())
   .then(data => {
      $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\"\justify-content-center\">");

      for (let i = 4; i < 40; i += 8) {
         let card = $('<div>').addClass('card col-sm-12 col-md-6 col-lg-2');
         let title = $('<h4>').addClass('card-title').text(new Date(data.list[i].dt_txt).toLocaleString().split(',')[0]);
         let icon = $('<img>').attr('src', `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`).addClass('forecast-icon');
         let temp = $('<p>').addClass('card-text').text(`Temp: ${data.list[i].main.temp}\xB0F`);
         let wind = $('<p>').addClass('card-text').text(`Wind Speed: ${data.list[i].wind.speed} MPH`);
         let humidity = $('<p>').addClass('card-text').text(`Humidity: ${data.list[i].main.humidity}\x25`);

         card.append(title, icon, temp, wind, humidity);

         $('#forecast .row').append(card);
      }
   });   
};