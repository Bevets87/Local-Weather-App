(function (window) {

  'use strict'

  function Model () {
    var self = this;
    this.state = {
      'tempInFarenheight': null,
      'tempInCelsius': null
    }
  }

  Model.prototype.setState = function (newState) {
    var self = this;
    self.state = Object.assign(
      {},
      self.state,
      newState
    )
  }

  window.app = window.app || {};
  window.app.Model = Model;
} (window))
