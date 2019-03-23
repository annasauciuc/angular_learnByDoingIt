angular.module("myApp").factory("userService", [
  "$http",
  "$location",
  function($http, $location) {
    return {
      getAllUsers: function() {
        console.log("getUsers???");
        return $http.get("http://localhost:3000/users").then(response => {
          return response.data;
        });
      },
      get: function(id) {        
        return $http.get(`http://localhost:3000/users/${user.id}`).then(response => {
          return response.data[0];
        });
      },
      save: function(user) {
        $location.path("form/"); // path not hash
        let data = JSON.stringify(user);
        const req = {
          method: "PUT",
          url: `http://localhost:3000/users/${user.id}`,
          headers: {
            "Content-Type": "application/json"
          },
          data
        };
        return $http(req).then(response => {
          console.log("response :", response);
          $location.path("table/"); // path not hash
        });
      },
      create: function(user) {
        let data = JSON.stringify(user);
        const req = {
          method: "POST",
          url: `http://localhost:3000/users`,
          headers: {
            "Content-Type": "application/json"
          },
          data
        };
        return $http(req).then(response => {
          console.log("response :", response);
          $location.path("table/"); // path not hash
        });
      },
      delete: function(user) {
        return $http
          .delete(`http://localhost:3000/users/${user._id}`)
          .then(response => console.log("response :", response));
      }
    };
  }
]);
