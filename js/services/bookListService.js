app.service('bookListService', function($http, $q) {

  var deferred = $q.defer();
  //  $http.get('./resources/book.json').then(function(data){
  $http.get(' https://gist.githubusercontent.com/madwork/adfae25c174bb246c650/raw/db225e4b9c74e1865da1c9cd54cf87d3dee171a5/book.json').then(function(data) {
    deferred.resolve(data);
  });

  this.getBooks = function() {
    return deferred.promise;
  }
});
