var app = angular.module("myApp", []);
app.controller("customersCtrl", function($scope, $http) {
  $scope.showMe = false;
  $scope.textBtn = "Show me";
  let url = "http://localhost:3000/users";
  $http.get(url).then(function(response) {
    $scope.names = response.data;
  });
  $scope.orderDesc = property => {
    const sorted = $scope.names.sort((a, b) => {
      return a[property] < b[property] ? -1 : b[property] < a[property] ? 1 : 0;
    });

    $scope.names = sorted;
  };
  $scope.toogleShowHide = function() {
    $scope.showMe = !$scope.showMe;
    $scope.showMe ? ($scope.textBtn = "Hide me") : ($scope.textBtn = "Show me");
  };
});
