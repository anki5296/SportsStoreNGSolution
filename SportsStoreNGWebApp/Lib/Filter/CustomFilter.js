angular.module("customFilters", [])
    .filter("unique", function () {
        return function (data, propertyName) {
            if (angular.isArray(data) && angular.isString(propertyName)) {
                var result = [];
                var keys = {};
                for (var i = 0; i < data.length; i++) {
                    var val = data[i][propertyName];
                    if (angular.isUndefined(keys[val])) {
                        keys[val] = true;
                        result.push(val)
                    }//if
                }//for
                return result;
            }//outer if
            else {
                return data;
            }
        };//return
    })
.filter("range", function ($filter) {
    return function (data,page,size) {
        if (angular.isArray(data) &&angular.isNumber(page) && angular.isNumber(size)) {
            var startIndex = (page - 1) * size;
            if (data.length < startIndex) {
                return [];
            } else {
                return $filter("limitTo")(data.splice(startIndex), size);
            }
        }//if
        else {
            return data;
        }
    };//return
})
.filter("pageCount", function () {
    return function (data, size) {
        if (angular.isArray(data)) {
            var result = [];
            for (var i = 0; i < Math.ceil(data.length / size) ; i++) {
                result.push(i);
            }//for
            return result;
        }
        else {
            return data;
        }
    };//return
})