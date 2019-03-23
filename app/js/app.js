const app = angular.module("myApp", ["ngRoute"]);
app.config([
  "$routeProvider",
  function($routeProvider) {
    $routeProvider
      .when("/home", {
        templateUrl: "views/home.html"
      })
      .when("/directory", {
        templateUrl: "views/directory.html",
        controller: "usersCtrl"
      })
      .when("/table", {
        templateUrl: "views/table.html",
        controller: "usersCtrl"
      })
      .otherwise({
        redirectTo: "/home"
      });
  }
]);

app.controller("usersCtrl", [
  "$scope",
  "$http",
  function($scope, $http) {
    $scope.getUsers = () => {
      console.log("getUsrs??");
      const url = "http://localhost:3000/users";
      $http.get(url).then(response => {
        $scope.users = response.data;
      });
    };

    $scope.getUsers();
    $scope.showMe = true;
    $scope.textBtn = "Show me";
    $scope.user = {};
    $scope.user.name = "";
    $scope.user.lastName = "";
    $scope.user.age = "";
    $scope.user.roles = [];
    $scope.toogleShowHide = () => {
      $scope.showMe = !$scope.showMe;
      $scope.showMe;

      // ? ($scope.textBtn = "Hide me")
      // : ($scope.textBtn = "Show me");
    };
    $scope.initialUser = user => {
      $scope.user.id = user._id;
      $scope.user.name = user.name;
      $scope.user.lastName = user.lastName;
      $scope.user.age = user.age;
      $scope.user.roles = user.roles.toString();
    };
    $scope.editBtn = user => {
      $scope.initialUser(user);
    };
    $scope.cleanInputs = () => {
      $scope.user.name = "";
      $scope.user.lastName = "";
      $scope.user.age = "";
      $scope.user.roles = [];
    };
    $scope.saveUser = () => {
      let method = "post";
      let url = "http://localhost:3000/users";
      if ($scope.user.id) {
        console.log("$scope.user.id :", $scope.user.id);
        method = "put";
        url = `http://localhost:3000/users/${$scope.user.id}`;
      } else {
        method = "post";
        url = "http://localhost:3000/users";
      }

      const headers = {
        "Content-Type": "application/json"
      };
      let data = JSON.stringify($scope.user);
      const config = {
        method,
        headers,
        url,
        data
      };
      $http(config)
        .then(response => console.log("response :", response))
        .then(response => $scope.getUsers())
        .catch(error => console.log("error :", error));
      $scope.cleanInputs();
    };
    $scope.deleteUser = user => {
      // const userIndex = $scope.users.indexOf(user);
      // $scope.users.splice(userIndex, 1);

      $http
        .delete(`http://localhost:3000/users/${user._id}`)
        .then(response => $scope.getUsers())
        .then(response => console.log("response :", response));
    };
    $scope.previewUser = user => {
      //  $scope.userModal.id = user._id;
      $scope.user.name = user.name;
      $scope.user.lastName = user.lastName;
      $scope.user.age = user.age;
      $scope.user.roles = user.roles;

      // $scope.initialUser(user);
    };
  }
]);
