let citiesArray = [];

$('#search-btn').on('click', function(){
   let cityName = $('#city-name').val();

   getWeatherInfo(cityName);

   citiesArray.push(cityName);

   localStorage.setItem('cities', JSON.stringify(citiesArray));

   searchHistory();
   
});

function getWeatherInfo(cityName) {
   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=a4fc2c49c4ea222299041dc24c1b4c99&units=imperial`;

   fetch(apiUrl)
   .then(res => res.json())
   .then(data => {
      $('#current-weather').empty();
      let mainCard = $('<div>').addClass('col-11 main-card card border-dark mb-3 card-body text-dark');
      let title = $('<h3>').addClass('card-title').text(`${data.name}`);
      let icon = $('<img>').attr('src', `http://openweathermap.org/img/w/${data.weather[0].icon}.png`).addClass('forecast-icon');
      let date = $('<p>').addClass('card-text').text(` (${new Date().toLocaleString().split(',')[0]}) `);
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
      let uvIndex = $('<div>').text('UV Index: ');
      let uvSpan = $('<span>').text(data.current.uvi).attr('id', 'uv-span');

      let testNumber = parseInt(data.current.uvi);

       if (testNumber < 3) {
          uvSpan.addClass('badge badge-success');
       } else if (testNumber < 8) {
          uvSpan.addClass('badge badge-warning');
       } else {
          uvSpan.addClass('badge badge-danger');
       }

      uvIndex.append(uvSpan);
      $('.main-card').append(uvIndex);
   });

};

function getForecast(cityName) {
   let thirdApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=a4fc2c49c4ea222299041dc24c1b4c99&units=imperial`;

   fetch(thirdApiUrl)
   .then(res => res.json())
   .then(data => {
      let cardDeck = $('<div>').addClass('row justify-content-between');
      $("#forecast").html("<h4>5-Day Forecast:</h4>").addClass('mt-3 row justify-content-start').append(cardDeck);

      for (let i = 4; i < 40; i += 8) {
         let card = $('<div>').addClass('col-sm-12 col-md-6 col-lg-2 card text-white bg-dark').attr('id', 'forecast-card');
         let title = $('<h4>').addClass('card-title').text(new Date(data.list[i].dt_txt).toLocaleString().split(',')[0]);
         let icon = $('<img>').attr('src', `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`).addClass('forecast-icon');
         let temp = $('<p>').addClass('card-text').text(`Temp: ${data.list[i].main.temp}\xB0F`);
         let wind = $('<p>').addClass('card-text').text(`Wind Speed: ${data.list[i].wind.speed} MPH`);
         let humidity = $('<p>').addClass('card-text').text(`Humidity: ${data.list[i].main.humidity}\x25`);

         card.append(title, icon, temp, wind, humidity);

         cardDeck.append(card);
      }
   });   
};

function searchHistory() {
   $('#search-history').addClass('border-top');
   $('#search-history').empty();
   let searchHistoryList = $('<ul>').addClass('history-list list-group');

   let searchHistory = localStorage.getItem('cities');
   let historyArray = JSON.parse(searchHistory);

   for (let i = 0; i < historyArray.length; i++) {
      let temp = $('<li>');
      let recentSearchItems = $('<button>').addClass('list-btn btn btn-outline-info btn-block').text(historyArray[i]).attr('id', historyArray[i]);

      temp.append(recentSearchItems)

      searchHistoryList.append(temp);
   }

   $('#search-history').append(searchHistoryList);

};

$('#search-history').on('click', 'li', 'button', function() {

   getWeatherInfo($(this).children('button').attr('id'));
   
});