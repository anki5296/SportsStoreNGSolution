sportsStoreAdmin
.constant("productUrl", "http://localhost:5000/api/product/")
.factory("prodResource", ["$resource", function ($resource) {
    return $resource("http://localhost:5000/api/product/:productID",
        { productID: "@productID" },
        {
            save: { method: "POST" },
            update: { method: "PUT" }
        });//$resource
}])//factory
.controller("productController", productController);

function productController($scope, $resource, productUrl, prodResource) {
    $scope.productsResource = prodResource;
    var newNBAProd = { "ProductName": "24 SS Clock", "Description": "NBA Clock for 24 SS countdown", "Category": "Basketball", "Price": 800.90 };
    $scope.editedProduct = newNBAProd;
    $scope.listProducts = function () {
        $scope.products = $scope.productsResource.query();
    };//listProducts
    $scope.deleteProduct = function (product) {
        product.$delete({ productID: product.ProductID })
        .then(function () {
            $scope.products.splice($scope.products.indexOf(product), 1);
        });//then
    };//delete product
    $scope.createProduct = function (product) {
        new prodResource(product).$save
            .then(function (prod) {
                prod.ProductName = product.ProductName;
                prod.Category = product.Category;
                prod.Price = product.Price;
                prod.Description = prod.Description;
                $scope.updateProduct(prod);
                $scope.products.push(prod);
            });//then
    };//createProduct
    $scope.updateProduct=function(product){
        product.$update({productID:product.ProductID});
        $scope.editedProduct=null;
    };//update Product
    $scope.startEdit=function(product){
        $scope.editedProduct=product;
    };//startEdit
    $scope.cancelEdit=function(){
        $scope.editedProduct=null;
    };//cancelEdit
    $scope.listProducts();
}