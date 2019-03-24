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

    // $scope.previewUser = user => {
    //   userService.get(user._id).then(data => {
    //     console.log("data", data);
    //     console.log("user", user);

    //     console.log("$scope.user", $scope.user);
    //     $scope.user.nameModal = data.name;
    //     $scope.user.lastNameModal = data.lastName;
    //     $scope.user.ageModal = data.age;
    //     $scope.user.rolesModal = data.roles;
    //   });
    // };

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
