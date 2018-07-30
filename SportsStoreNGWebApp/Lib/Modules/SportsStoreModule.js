var sportsStoreApp = angular.module("sportsStoreApp", ["customFilters", "cart", "ngRoute"])
.config(function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('');//here # is considered a breakpoint
    $routeProvider.when("/products", { templateUrl: "../Lib/Views/ProductList.html" });
    $routeProvider.when("/checkout", { templateUrl: "../Lib/Views/CheckoutSummary.html" });
    $routeProvider.when("/placeorder", { templateUrl: "../Lib/Views/PlaceOrder.html" });
    $routeProvider.when("/complete", { templateUrl: "../Lib/Views/Thankyou.html" });
    $routeProvider.otherwise({ templateUrl: "../Lib/Views/ProductList.html" });
});//config
//sportsStoreApp.run(function ($http) {
//    $http.get("../Lib/Data/Products.json").then(function (result) {
//        console.log("Result object:", result);
//        model.products = result.data;
//    },function(err){
//        console.log("Error from SportsStoreModule.js",err.data.Message);
  
//    });//then

//});//run