const app = angular.module("myApp", []);
app.controller("usersCtrl", [
  "$scope",
  "$http",
  ($scope, $http) => {
    $scope.getUsers = () => {
      const url = "http://localhost:3000/users";
      $http.get(url).then(function(response) {
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
    $scope.toogleShowHide = function() {
      $scope.showMe = !$scope.showMe;
      $scope.showMe
        ? ($scope.textBtn = "Hide me")
        : ($scope.textBtn = "Show me");
    };
    $scope.editBtn = user => {
      $scope.user.id = user._id;
      $scope.user.name = user.name;
      $scope.user.lastName = user.lastName;
      $scope.user.age = user.age;
      $scope.user.roles = user.roles;
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
    };
    $scope.deleteUser = user => {
      $http
        .delete(`http://localhost:3000/users/${user._id}`)
        .then(response => $scope.getUsers())
        .then(response => console.log("response :", response));
    };
    $scope.previewUser = user => {};
  }
]);
