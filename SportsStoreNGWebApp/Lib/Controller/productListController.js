
sportsStoreApp
    .constant("productListActiveClass","bg-primary")
    .constant("productListPageCount",4)
    .controller("productListController", productListController)

function productListController($scope, $filter, productListPageCount, productListActiveClass,cart) {
    var selectedCategory = null;
    $scope.selectedPage = 1;
    $scope.pageSize = productListPageCount;
    $scope.selectCategory = function (newCategory) {
        selectedCategory = newCategory;
        $scope.selectedPage = 1;
    };//selectCategory
    $scope.categoryFilterFN = function (product) {
        return selectedCategory == null || selectedCategory == product.Category;
    };//categoryFilterFN
    $scope.getCategoryClass = function (category) {
        return selectedCategory == category ? productListActiveClass : "";
    };//getCategoryClass (for category button highlighting
    $scope.selectPage = function (newPage) {
        $scope.selectedPage = newPage;
    };//selectPage

    $scope.getPageClass = function (page) {
        return $scope.selectedPage = page ? productListActiveClass : "";
    };
    $scope.addProductToCart = function (product) {
        cart.addProduct(product.ProductID, product.ProductName, product.Price);
    };//addProductCart
}//productListController