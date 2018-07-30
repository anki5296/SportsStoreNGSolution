angular.module("cart", [])
.factory("cart", function () {
    var cartData = [];
    return {
        addProduct: function (productID, productName, price) {
            var addedToExistingItem = false;
            for (var i = 0; i < cartData.Length; i++) {
                if (cartData[i].productID == productID) {
                    cartData[i].count++;
                    addedToExistingItem = true;
                    break;
                }
            }//for
            if (!addedToExistingItem) {
                cartData.push({ count: 1, productID: productID, price: price, productName: productName });
            }
        },//addProduct
        removeProduct: function (productID) {
            for (var i = 0; i < cartData.length; i++) {
                if (cartData[i].productID == productID) {
                    cartData.splice(i, 1);
                    break;
                }
            }//for
        },//removeProduct
        getProducts: function () {
            return cartData;
        }//getProducts
    };//return
})//factory
.directive("cartSummary", function (cart) {
    return {
        restrict: "E",//"E" stands for element it can be used as element only,"EA" Element and attribute ,"C" for class
        templateUrl: "../lib/Components/Cart/CartSummary.html",
        controller: function ($scope) {
            var cartData = cart.getProducts();
            $scope.total = function () {
                var total = 0;
                for (var i = 0; i < cartData.length; i++) {
                    total += (cartData[i].price * cartData[i].count);
                }//for
                return total;
            };//total
            $scope.itemCount = function () {
                var total = 0;
                for (var i = 0; i < cartData.length; i++) {
                    total += cartData[i].count;
                }//for
                return total;
            };//itemCount
        }//controller
    };//return
});//directive


//Here we are using factory to encompass all the functionalities of cart and directive can now be used as an element 
//we can pass cart to it now