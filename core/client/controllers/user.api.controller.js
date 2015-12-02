bulletinApp.controller("myController", ["$scope", "userService", function($scope, userService){

    $scope.getUsers = function() {
            userService.getUsers()
              .then(function(response) {
                $scope.users = response.data;
                console.log($scope.users);
              })
        };

      };


}]);
