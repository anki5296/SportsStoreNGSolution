var sportsStoreAdmin = angular.module("sportsStoreAdmin", ["ngRoute", "ngResource"])
.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset-utf-8';
}])
.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider.when("/login", { templateUrl: "../Views/AdminLogin.html" });
    $routeProvider.when("/main", { templateUrl: "../Views/AdminMain.html" });
    $routeProvider.otherwise({ redirectTo: "/login" });
    //$routeProvider.otherwise({ templateUrl: "../Views/AdminProducts.html" });
});