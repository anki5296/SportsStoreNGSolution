sportsStoreAdmin
.constant("authUrl", "http://localhost:5000/api/token")
.constant("orderUrl", "http://localhost:5000/api/order")
.constant("orderDetailUrl", "http://localhost:5000/api/orderdetail")
.controller("authController", authController)
.controller("mainController", mainController)
.controller("ordersController", ordersController);

function authController($scope,$http, $window, $location,authUrl) {
    $scope.Username = "admin@a.com";
    $scope.Password = "Pass@word1";
    $scope.accessToken = "";
    $scope.authenticate = function (user, pass) {
        var authData = "UserName=" + user + "&Password=" + pass + "&grant_type=Password";
        var userInfo;
        $http.post(authUrl, authData)
        .then(function (result) {
            $scope.accessToken = result.data.access_token;
            console.log("result.data.access_token->", result.data.access_token);
            userInfo = { "accessToken": $scope.accessToken, "Username": user };
            $window.sessionStorage["userInfo"] = JSON.stringify(userInfo, null, 3);
            $location.path("/main");
        },function(err){
            console.log("Auth Error:",err.data);
            $scope.authenticationError=error.data.Message;
        
        });
    };//authenticate
}//authController
function mainController($scope, $window, $location) {
    $scope.screens = ["Products", "Orders"]
    $scope.current = $scope.screens[0];
    $scope.setScreen = function (index) {
        $scope.current = $scope.screens[index];
    };//setScreen
    $scope.getScreen = function () {
        var userInfo = $window.sessionStorage["userInfo"];
        if (userInfo == null)
        {
            $location.path("/login");
        }
        return $scope.current == "Products" ? "../Views/AdminProducts.html" : "../Views/AdminOrders.html"
    };//getScreen
}//main controller
function ordersController($scope, $http, orderUrl, orderDetailUrl) {
    $http.get(orderUrl)
    .then(function (result) {
        $scope.orders = result.data;
    }, function (err) {
        console.log("Get Order Error:", err.data);
    });//then
    $scope.selectedOrder//variable
    $scope.selectOrder = function (order) {
        var url = orderDetailUrl + "/" + order.OrderID;
        $http.get(url).then(function (orderDetailData) {
            $scope.selectedOrder = orderDetailData.data;
            $scope.grandTotal = 0;
            for (var i = 0; i < orderDetailData.data.length; i++) {
                $scope.grandTotal += (orderDetailData.data[i].Count * orderDetailData.data[i].Price);
            }//for
        }, function (err) {

            console.log("select order get OrderDetail Error", err.data);
            $scope.error = err.data.Message;
        });//then
    };//select Order
    var getOrderDetails = function (url) {
        var subTotal = 0;
        var total = 0;
        $http.get(url).then(function (orderDetailData) {
            if (orderDetailData.data.length != 0) {
                for (var i = 0; i < orderDetailData.length; i++) {
                    total += (orderDetailData.data[i].Count * orderDetailData.data[i].Price);
                }
            }
        }, function (err) {

            console.log("select order get OrderDetail Error", err.data);
            $scope.error = err.data.Message;
        });//then
        return total;

    };//getOrderDetails
}//orderscontroller
