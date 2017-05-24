function FavsService($http){
  var API = "//jsonplaceholder.typicode.com/todos/";

  function create(fav) {
    return $http.post(API, fav).then(function (response){
      return response.data;
    });
  }
  function retrieve() {
    return $http.get(API).then( function (response){
      return response.data.splice(0, 10);
    });
  }
  function update(fav) {
    return $http.put(API + fav.id).then( function (response) {
      return response.data;
    });
  }
  function remove(fav) {
    return $http.delete(API + fav.id).then( function (response) {
      return response.data;
    });
  }  

  return {
    create: create,
    retrieve: retrieve,
    update: update,
    remove: remove
  };
}

angular
  .module('app')
  .factory('FavsService', FavsService);