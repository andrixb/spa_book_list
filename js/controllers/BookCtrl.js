app.controller('bookCtrl', function($scope, bookListService, filterFilter) {

  $scope.currentPage = 1;
  $scope.maxSize = 5;
  $scope.entryLimit = 5;


  var promise = bookListService.getBooks();
  promise.then(function(data) {
    $scope.books = data.data;

    var category = [];
    var genre = [];

    data.data.forEach(function(d){
        category.push( d.genre.category);
    });
    $scope.category = unique(category);

    data.data.forEach(function(d){
        genre.push( d.genre.name);
    });
    $scope.genre = unique(genre);

    $scope.totalItems = $scope.books.length;

    $scope.noOfPages = Math.ceil($scope.books.length/$scope.entryLimit);

    $scope.$watch('search', function(term) {
      $scope.filtered = filterFilter($scope.books, term);
      $scope.size = $scope.filtered.length;
      $scope.noOfPages = Math.ceil($scope.filtered.length / $scope.entryLimit);
    });

  });
})

app.filter('startFrom', function() {
  return function(input, start) {
    if (input) {
      start = +start; //parse to int
      return input.slice(start);
    }
    return [];
  }
});

function unique(list) {
    var result = [];
    $.each(list, function(i, e) {
        if ($.inArray(e, result) == -1) result.push(e);
    });
    return result;
}
