app.controller("formCtrl", [
  "$scope",
  "$routeParams",
  "userService",
  "$location",
  function($scope, $routeParams, userService, $location) {
    let id = $routeParams.id;
    $scope.user = {};
    if (id.length > 1) {
      userService.get(id).then(response => {
        console.log("$scope.user :", $scope.user);
        console.log("response :", response);
        $scope.user = response;
      });
    }
    $scope.getUsers = () => {
      userService.getAllUsers().then(response => ($scope.users = response));
    };
    $scope.simpleHeader = () => {
      console.log("entra?");
      console.log("$location.path() :", $location.path());
      if ($location.path().includes("form")) {
        return false;
      }
      return true;
    };
    $scope.saveUser = () => {
      if ($scope.user.id) {
        userService
          .save($scope.user)
          .then(response => console.log("response :", response));
      } else {
        userService
          .create($scope.user)
          .then(response => console.log("response :", response));
      }
    };
  }
]);
