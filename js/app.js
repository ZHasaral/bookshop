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

    $routeProvider.otherwise({redirectTo: '/'});
})
var books = [];

function Avtor(surname, name, kurs, gpa)
{
    var fam = surname;
    var nam = name;
    var course = kurs;
    var gpaa = gpa;

    this.getSurname = function()      {
        return surname; }

    this.getName    = function()      {
        return name; }


    this.getGpa     = function()      {
        return gpa;  }
    this.getkurs    = function()      {
        return kurs; }

}

function Book(title, shifr) {

    var title = title;
    var shifr = shifr;
    var avtors = [];

    this.getName     = function()      {
        return title; }
    this.getShifr     = function()      {
        return shifr; }
    this.getStudents = function()      { return avtors; }

    this.addStudent = function(student)
    {
        avtors[studentsCounter] = student;
        studentsCounter++;

    }
}


app.controller('menuOneController', function($scope,localStorageService){

    $scope.books = [
        {
            name: 'The Book of Trees',
            idbook: 1,
            price: 19
        },
        {
            name: 'ADSDasD',
            idbook: 2,
            price: 21
        }
    ];
    $scope.addnewBook = function () {
        $scope.books.push(
            {
                name:  $scope.name,
                idbook:$scope.id,
                price: $scope.price


            });
        localStorageService.set('key',$scope.books);
    };





})
app.controller('menuTwoController', function($scope,localStorageService){
  $scope.books  = localStorageService.get('key');


})



app.controller('AppCtrl', function ($scope,localStorageService) {

     $scope.addNewBook=function () {

        books.push(new Book($scope.grupTitle, $scope.grupShifr));
        var options = "";
        for (var i = 0; i < books.length; i++)
            options += "<option value = " + books[i].getName() + " />";
        document.getElementById("groupsList").innerHTML = options;
        localStorageService.set('key',options);
    }

    $scope.information=function () {
        var groupIndex;
        for (var i = 0; i < books.length; i++)
            if (books[i].getName() === $scope.group)
                groupIndex = i;

        $scope.infTitle =  books[groupIndex].getName();
        $scope.infshifr =  books[groupIndex].getShifr();

        var p = books[groupIndex].getPrepod();
         $scope.prepod = p.getSurname() + " " + p.getName();
        var slist = "";
        var students = books[groupIndex].getStudents();
        for (var i = 0; i < students.length; i++)
        {
            var s = students[i];
            slist +=  "Фамилия: "+ s.getSurname() +", " + " Имя:" + s.getName() +", " + "Курс: " + s.getkurs() + " GPA: " + s.getGpa() + "\n";
        }

        $scope.students = slist;





    }
    /*this.getAverageGpa = function()
    {
        var averageGpa = 0.0;
        for (var i = 0; i < students.length; i++)
            averageGpa += Number(students[i].getGpa());
        return (averageGpa / students.length).toFixed(4);
    }
*/






});

