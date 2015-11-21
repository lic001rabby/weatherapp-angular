//Module
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']); 

//Routing

weatherApp.config(function ($routeProvider) {
    
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/main.html',
        controller: 'mainController'
    })
    
    .when('/forecast', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })
    
    .when('/second/:num', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })
    
});


//Controllers

weatherApp.controller('mainController', ['$scope', '$log', 'cityService', function($scope, $log, cityService) {
    
    $scope.city = cityService.cityname;
    //$log.log($scope);
    
    $scope.$watch('city', function(){
        cityService.cityname = $scope.city;
        });  

}]);

weatherApp.controller('forecastController', ['$scope', '$log', '$resource', 'cityService', function($scope, $log, $resource, cityService) {
    
    $scope.city = cityService.cityname;
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily",{
        callback : "JSON_CALLBACK" }, {get: {method: "JSONP"}});
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: 7, appid: "4c9d351dec8f037953f62d97316cca2c"})
    $log.log($scope.weatherResult);
    
}]);



//Services

weatherApp.service('cityService', function() {
   
    
    this.cityname = 'Newyork, NY';
    
});