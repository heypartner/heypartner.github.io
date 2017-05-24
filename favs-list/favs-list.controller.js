'use strict';

function FavsController(FavsService, FavsEmbed){
  var ctrl = this;
  ctrl.newURL = '';

  ctrl.list = [];

  ctrl.addFav = function() {
    var tempfav = {
      description: 'Double-click to add description.',
      url: ctrl.newURL,
      embedSrc: '',
      embedType: ''
     };
    if (!ctrl.newURL){
      return; // empty string, don't add
    }
    ctrl.list.unshift(FavsEmbed.embed(tempfav));
    ctrl.newURL = '';
  }

  ctrl.updateFav = function(item, index){
    console.log('update ' + item.description);
  }

  ctrl.removeFav = function(item, index) {
    ctrl.list.splice(index, 1);    
  }
}

angular
  .module('app')
  .controller('FavsController', FavsController);