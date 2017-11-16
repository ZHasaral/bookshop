var app = angular.module("app", ['ngRoute', 'LocalStorageModule']);
app.config(function($routeProvider){

    $routeProvider.when("/addPrepod", {
        templateUrl:'templates/addPrepod.html',
        controller:'menuOneController'

    })

    $routeProvider.when("/addStudent", {
        templateUrl:'templates/addStudent.html',
        controller:'menuTwoController'

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
function Prepodavatel(prepid,surname, name)
{
    this.id = prepid;
    this.surname = surname;
    this.name = name;
    this.getSurname    = function()      { return surname; }
    this.getName       = function()      { return name; }


}

function Book(title, shifr) {

    var title = title;
    var shifr = shifr;
    var Prepodavatel = null;
    var avtors = [];
    var studentsCounter = 0;

    this.getName     = function()      {
        return title; }
    this.getShifr     = function()      {
        return shifr; }
    this.getStudents = function()      { return avtors; }

    this.setPrepod = function(prepod)
    {
        Prepodavatel = prepod;
    }
    this.getPrepod  = function()      {
        return Prepodavatel;
    }
    this.addStudent = function(student)
    {
        avtors[studentsCounter] = student;
        studentsCounter++;

    }
}


app.controller('menuOneController', function($scope,localStorageService){

    document.getElementById("groupsList").innerHTML = localStorageService.get('key');
    $scope.addNewPrepodavatel = function() {

        var groupIndex;
        for (var i = 0; i < books.length; i++)
            if (books[i].getName() === $scope.group)
                groupIndex = i;
        books[groupIndex].setPrepod(new Prepodavatel($scope.prepId,$scope.prepSurname,$scope.prepName));


    }





})
app.controller('menuTwoController', function($scope,localStorageService){
    document.getElementById("groupsList").innerHTML = localStorageService.get('key');
    $scope.addNewStudent = function () {
        var bookIndex;
        for (var i = 0; i < books.length; i++)
            if (books[i].getName() === $scope.group)
                bookIndex = i;
        books[bookIndex].addStudent(new Avtor( $scope.studSurname, $scope.studName,$scope.studKurs, $scope.studGpa));


 }

})



app.controller('AppCtrl', function ($scope,localStorageService) {

    $scope.addNewGroup=function () {

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

