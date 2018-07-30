
sportsStoreApp
    .constant("productsDataUrl", "http://localhost:5000/api/product")
     .constant("orderUrl", "http://localhost:5000/api/order")
     .constant("orderDetailUrl", "http://localhost:5000/api/orderdetail")
    .controller("sportsStoreController", sportsStoreController);
function sportsStoreController($scope, $http,$location, productsDataUrl, orderUrl, orderDetailUrl, cart) {
    $scope.productsData = {};
    $http.get(productsDataUrl).then(function (result) {
        $scope.productsData.products = result.data;
    }, function (err) {
        console.log(err.data.Message);


    });
    $scope.sendOrder = function (shippingDetails) {
        var order = angular.copy(shippingDetails);
        console.log("ShippingDetails->", shippingDetails);
        if (order.giftwrap == null) {
            order.giftwrap = false;
        }
        var tempOrders = cart.getProducts();
        var productsOrdered = [];
        $http.post(orderUrl, order).then(function (orderData) {
            $scope.productsData.orderID = orderData.data.OrderID;
            console.log("orderData.data.OrderID->", orderData.data.OrderID);
            for (var i = 0; i < tempOrders.length; i++) {    //we have done lopping here because tempOrders contains the data now by taking it from cart.getProducts, orderID is an autoincreemented property so we will first take it from orders table where it is being updated then give it to orderDetail
                productsOrdered.push({
                    "OrderID": orderData.data.OrderID,
                    "ProductID": tempOrders[i]["productID"],
                    "ProductName": tempOrders[i]["productName"],
                    "Price": tempOrders[i]["price"],
                    "Count": tempOrders[i]["count"]
                });//productsOrdered
                $http.post(orderDetailUrl, productsOrdered[i])
                    .then(function (orderDetailData) {
                        console.log("orderDetailData.data.OrderID->", orderDetailData.data.OrderID);
                    }, function (orderDetailErr) {
                        console.log("orderDetailErr.data.Message->", orderDetailErr.data.Message);

                    })//orderDetail then
                .finally(function () {
                    cart.getProducts().length = 0;
                });
            }//for
        }, function (error) {

            console.log("error from SportsStoreController $http outer post", error.data.Message);

        })//orderthen
        .finally(function () {
            $location.path("/complete");
        })
    };//send order

}//sportsStoreController


//First
//function sportsStoreController($scope) {
//    $scope.productsData = model;
//}//sportsStoreController
//http://localhost:59932 (from HTML 5 cross browsing is not supported)