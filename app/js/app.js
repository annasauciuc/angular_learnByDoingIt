const app = angular.module("myApp", ["ngRoute", "ngAnimate"]);
app.config([
  "$routeProvider",
  function($routeProvider) {
    $routeProvider
      .when("/home", {
        templateUrl: "views/home.html",
      //  controller: "usersCtrl"
      })
      .when("/form/:id", {
        templateUrl: "views/form.html",
        controller: "formCtrl"
      })
      .when("/table", {
        templateUrl: "views/table.html",
        controller: "tableCtrl"
      })
      // .otherwise({
      //   redirectTo: "/home"
      // });
  }
]);
app.directive("randomUser", [
  function() {
    return {
      restrict: "E",
      scope: {
        users: "=",
        title: "="
      },
      templateUrl: "views/random.html"
      // controller: function($scope) {
      //   $scope.random=Math.floor(Math.random()*4)
      // }
    };
  }
]);

