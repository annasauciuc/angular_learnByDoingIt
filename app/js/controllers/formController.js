app.controller("formCtrl", [
  "$scope",
  "userService",
  function($scope, userService) {
    $scope.user = userService.data;

    $scope.getUsers = () => {
      userService.getAllUsers().then(response => ($scope.users = response));
    };
    $scope.cleanInputs = () => {
      $scope.user.name = "";
      $scope.user.lastName = "";
      $scope.user.age = "";
      $scope.user.roles = [];
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

      $scope.cleanInputs();
    };
  }
]);
