(function (window) {

  'use strict'

  function View () {
    var self = this;

    self.$city = document.getElementById('city');
    self.$state = document.getElementById('state');
    self.$tempButton = document.getElementById('temp-button');
    self.$temp = document.getElementById('temp');
    self.$tempUnit = document.getElementById('unit');
    self.$weatherDescription = document.getElementById('weather-description');
    self.$weatherIcon = document.getElementById('weather-icon');
  }

  View.prototype.bind = function (event, handler) {
    var self = this;
    if (event === 'getWeather') {
      window.addEventListener('load', function () {
        handler()
      })
    }
    if (event === 'convertTemp') {
      self.$tempButton.addEventListener('click', function (e) {
        handler(e)
      })
    }
  }

  View.prototype.render = function (cmd, weatherData) {
    var self = this;
    var viewCommands = {
      'showLocation': function () {
        self.$city.innerText = '';
        self.$city.innerText = weatherData.city;
        self.$state.innerText = '';
        self.$state.innerText = weatherData.region;
      },
      'showWeatherDescription': function () {
        self.$weatherDescription.innerText = '';
        self.$weatherDescription.innerText = weatherData.summary;
      },
      'showIcon': function () {
        switch (weatherData.icon) {
        case 'clear-day':
          weatherData.icon = 'day-sunny';
        case 'clear-night':
          weatherData.icon = 'night-clear';
        case 'wind':
          weatherData.icon = 'windy';
        case 'partly-cloudy-day':
          weatherData.icon = 'day-cloudy';
        case 'partly-cloudy-night':
          weatherData.icon = 'night-alt-cloudy'
        }
        self.$weatherIcon.innerHTML = '';
        self.$weatherIcon.innerHTML = '<i class="wi wi-'+ weatherData.icon +'"></i>';

      },
      'showTemp': function () {
        self.$temp.innerText = '';
        self.$tempUnit.innerText = '';
        self.$temp.innerText = weatherData.temperature;
        self.$tempUnit.innerText = weatherData.unit;
      }
    }
    viewCommands[cmd]();
  }

  window.app = window.app || {};
  window.app.View = View;

}(window))
