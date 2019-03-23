app.controller("formCtrl", [
  "$scope",
  "$routeParams",
  "userService",
  function($scope, $routeParams, userService) {
    let id = $routeParams.id;
    if (id.length > 1) {
      userService.get(id).then(response => {
        $scope.user = response;
      });
    }
    $scope.getUsers = () => {
      userService.getAllUsers().then(response => ($scope.users = response));
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
