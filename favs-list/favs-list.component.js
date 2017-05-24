'use strict';

// register favs list component onto the favsList module

angular
  .module('FavsList')
  .component('favsList', {
    templateUrl: 'favs-list/favs-list.template.html',
    controller: 'FavsController'
  });
