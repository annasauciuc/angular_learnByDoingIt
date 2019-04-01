app.controller("tableCtrl", [
  "$scope",
  "userService",
  "$location",
  function($scope, userService, $location) {
    $scope.editBtnForm = user => {
      $location.path("form/" + user._id); // path not hash
    };

    $scope.getUsers = () => {
      userService.getAllUsers().then(response => ($scope.users = response));
    };

    $scope.getUsers();

    $scope.previewUser = user => {
      $scope.user = user;
    };
    $scope.deleteUser = user => {
      // const userIndex = $scope.users.indexOf(user);
      // $scope.users.splice(userIndex, 1);

      userService.delete(user).then(response => $scope.getUsers());
    };
    $scope.goToForm = () => {
      console.log("form? :");
      $location.path("form/0"); // path not hash
    };

  }
]);
