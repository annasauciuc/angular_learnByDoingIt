app.controller("tableCtrl", [
  "$scope",
  "userService",
  "$location",
  function($scope, userService, $location) {
    $scope.data = userService.data;
    $scope.editBtn = user => {
      $scope.data.id = user._id;
      $scope.data.name = user.name;
      $scope.data.lastName = user.lastName;
      $scope.data.age = user.age;
      $scope.data.roles = user.roles.toString();
      console.log("$scope.data.name", $scope.data.name);
    };
    $scope.data = userService.data;
    $scope.editBtnForm = user => {
      $scope.editBtn(user);
      $location.path("form/"); // path not hash
    };

    $scope.getUsers = () => {
      userService.getAllUsers().then(response => ($scope.users = response));
    };

    $scope.getUsers();
    $scope.previewUser = user => {
      //  $scope.userModal.id = user._id;
      $scope.user.name = user.name;
      $scope.user.lastName = user.lastName;
      $scope.user.age = user.age;
      $scope.user.roles = user.roles;

      // $scope.initialUser(user);
    };
    $scope.deleteUser = user => {
      // const userIndex = $scope.users.indexOf(user);
      // $scope.users.splice(userIndex, 1);

      userService.delete(user).then(response => $scope.getUsers());
    };
  }
]);
