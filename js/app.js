var app = angular.module("app", ['ngRoute', 'LocalStorageModule']);
app.config(function($routeProvider){

    $routeProvider.when("/addBook", {
        templateUrl:'templates/addBook.html',
        controller:'menuOneController'

    })

    $routeProvider.when("/bookList", {
        templateUrl:'templates/bookLlist.html',
        controller:'menuTwoController'

    })
    $routeProvider.when("/edit", {
        templateUrl:'templates/bookLlist.html',
        controller:'menuThreeController'

    })
    $routeProvider.when("/bookDelete", {
        templateUrl:'templates/bookDelete.html',
        controller:'bookDeleteController'

    })

    $routeProvider.otherwise({redirectTo: '/'});
})
var books = [];


Book.idCounter = 0;
function Book(titleValue) {
    var id = ++Book.idCounter;
    var title = titleValue;
    var image = image;
    var avtors = [];
    var genres = [];
    this.getId              = function()      {
        return id;
    }
    this.getTitle              = function()      {
        return title;
    }
}

app.controller('menuOneController', function($scope,localStorageService){
    $scope.addNewBook=function () {

        books.push(new Book($scope.bookTitle));
        var options = "";
        for (var i = 0; i < books.length; i++)
            options += "<option value = " + books[i].getTitle() + " />";

        localStorageService.set('key',options);
        console.log(books[1]);
        console.log(books[2]);
    }


})
app.controller('menuTwoController', function($scope,localStorageService){
  $scope.books  = localStorageService.get('key');


})
app.controller('menuThreeController', function($scope,localStorageService){
   var  blist = '';

    var bookIndex;
    for (var i = 0; i < books.length; i++)
        bookIndex = i;
   blist = books[bookIndex].getTitle();
    $scope.booktitle =blist;


})
app.controller('bookDeleteController', function($scope,localStorageService){
    $scope.books  = localStorageService.get('key');


})



app.controller('AppCtrl', function ($scope,localStorageService) {








});

