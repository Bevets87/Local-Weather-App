(function (window) {

  'use strict'

  function Controller (model, view) {
    var self = this;
    self.model = model;
    self.view = view;

    self.view.bind('getWeather', function (position) {
      self._getGeoCoords(function (coords) {
        self._getWeather({lat: coords.latitude, lon: coords.longitude}, function (weatherData) {
          var tempInFarenheight = Math.round(weatherData.currently.temperature);
          var tempInCelsius = Math.round((tempInFarenheight - 32) * 0.56);
          self.model.setState({
            tempInFarenheight: tempInFarenheight,
            tempInCelsius: tempInCelsius,
          })
          self.view.render('showLocation', coords);
          self.view.render('showWeatherDescription', weatherData.currently);
          self.view.render('showTemp', {temperature: tempInFarenheight, unit: '℉'});
          self.view.render('showIcon', weatherData.currently);
        })
      })
    })


    self.view.bind('convertTemp', function (e) {
      var { tempInCelsius, tempInFarenheight } = self.model.state;
      switch(e.target.parentNode.children.unit.innerText) {
      case '℃':
        self.view.render('showTemp', {temperature: tempInFarenheight, unit:'℉'})
        break;
      case '℉':
        self.view.render('showTemp', {temperature: tempInCelsius, unit:'℃' })
        break;
      }
    })
  }

  Controller.prototype._getGeoCoords = function (cb) {
    fetch('https://ipapi.co/json/')
    .then(function (response) {
    response.json().then(function (data) {
      cb(data)
      })
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  Controller.prototype._getWeather = function (coords, cb) {
    fetch('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/c3fb5967d4df7497baba5f1d3111acdf/' + coords.lat + ',' + coords.lon)
    .then(function (response) {
      response.json().then(function (data) {
        cb(data)
      })
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  window.app = window.app || {};
  window.app.Controller = Controller;

}(window))
