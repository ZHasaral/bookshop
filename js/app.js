var app = angular.module("app", ['ngRoute', 'LocalStorageModule']);
app.config(function($routeProvider){

    $routeProvider.when("/addBook", {
        templateUrl:'templates/addBook.html',
        controller:'AppCtrl'

    })

    $routeProvider.when("/bookList", {
        templateUrl:'templates/bookList.html',
        controller:'AppCtrl'

    })
    $routeProvider.when("/bookList/:id", {
        templateUrl:'templates/bookList.html',
        controller:'AppCtrl'

    })
    $routeProvider.when("/edit", {
        templateUrl:'templates/edit.html',
        controller:'AppCtrl'

    })
    $routeProvider.when("/bookDelete", {
        templateUrl:'templates/bookDelete.html',
        controller:'AppCtrl'

    })

    $routeProvider.otherwise({redirectTo: '/'});
})
 var books = [];
books.push(new Book("CSS. 100 и 1 совет, 3-е издание", 10000, "img/css.jpg"));
books.push(new Book("Эффект муравейника. Успешная работа команды и коллективный разум", 6000, "img/effect.jpg"));
books.push(new Book("Программирование на Python, 4-е издание, I том", 9533, "img/python.jpg"));


Book.idCounter = 0;
function Book(titleValue,priceValue,imageValue) {
    var id = ++Book.idCounter;
    var title = titleValue;
    var price = priceValue;
    var image = imageValue;


    this.getId = function()     {
        return id;
    }
    this.getTitle = function()  {
        return title;
    }
    this.getPrice = function () {
        return price;
    }
    this.getImage = function () {
        return image;
    }
    this.setImage = function(value) {
        image = value; 
    }
    this.setTitle = function (value) {
        title = value;
    }
    this.setPrice = function (value) {
        price = value;
    }
}

app.controller('AppCtrl',['$scope','$routeParams', function ($scope,$routeParams) {
    $scope.books = [];
    $scope.$on('$routeChangeSuccess', function()
    {
        $scope.books = books;

        for (var i = 0; i < books.length; i++)
        {
            var book = books[i];
            console.log("**************************");
            console.log(book.getId());
            console.log(book.getTitle());

        }

    });

    $scope.addNewBook=function () {

          var book = new Book($scope.bookTitle, $scope.price,'img/' + $('#poster').val().split('\\').pop());
         var books = $scope.books;
        books.push(book);
        console.log(books[0].getTitle());
        console.log(books[0].getId());

    };
    $scope.bookClick = function()
    {
        var id = $routeParams.id;
        alert(id + ' ' + $routeParams);
    }


}]);

