const app = angular.module("myApp", []);
app.controller("usersCtrl", function($scope, $http) {
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

  $scope.orderDesc = property => {
    const sorted = $scope.users.sort((a, b) => {
      return a[property] < b[property] ? -1 : b[property] < a[property] ? 1 : 0;
    });

    $scope.users = sorted;
  };
  $scope.toogleShowHide = function() {
    $scope.showMe = !$scope.showMe;
    $scope.showMe ? ($scope.textBtn = "Hide me") : ($scope.textBtn = "Show me");
  };
  $scope.editBtn = user => {
    $scope.user.id = user._id;
    $scope.user.name = user.name;
    $scope.user.lastName = user.lastName;
    $scope.user.age = user.age;
    $scope.user.roles = user.roles;
  };
  $scope.cleanInputs = () => {
    $scope.user;
  };
  $scope.saveUser = () => {
    let method = "post";
    let url = "http://localhost:3000/users";
    if ($scope.user.id.length > 0) {
      method = "put";
      url = `http://localhost:3000/users/${$scope.user.id}`;
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
    console.log("$scope.users :", $scope.users);
    $http
      .delete(`http://localhost:3000/users/${user._id}`)
      .then(response => $scope.getUsers())
      .then(response => console.log("response :", response));
  };
  $scope.previewUser = user => {
    console.log("user :", user);
  $scope.nameUser=user.name
  };
});
