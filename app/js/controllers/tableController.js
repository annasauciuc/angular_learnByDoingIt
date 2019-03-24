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
      userService.get(user._id).then(data => {
        console.log("data", data);
        console.log("user", user);

        console.log("$scope.user", user);
        $scope.user.name = data.name;
        $scope.user.lastName = data.lastName;
        $scope.user.age = data.age;
        $scope.user.roles = data.roles;
      });
    };
    $scope.deleteUser = user => {
      // const userIndex = $scope.users.indexOf(user);
      // $scope.users.splice(userIndex, 1);

      userService.delete(user).then(response => $scope.getUsers());
    };
  }
]);
