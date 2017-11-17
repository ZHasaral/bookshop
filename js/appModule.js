var app = angular.module("app", ['ngRoute']);
 app.config(function($routeProvider){

        $routeProvider.when("/menu1", {
                templateUrl:'templates/addBook.html',
            controller:'menuOneController'
                
            })

     $routeProvider.when("/menu2", {
                templateUrl:'templates/bookLlist.html',
         controller:'menuTwoController'
            
            })

     $routeProvider.otherwise({redirectTo: '/'});
    })