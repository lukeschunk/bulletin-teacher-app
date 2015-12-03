bulletinApp.controller("homeController", ["$scope", "ngDialog", "userService", function ($scope, ngDialog, userService) {
    $scope.test = "Hey there buddy";

    $scope.saveClass = function () {

    }

    var counter = 1;

    $scope.students = [];
    $scope.addStudentToTable = function () {
        $scope.currentStudent.id = counter;
        console.log("this is current student", $scope.currentStudent);
        //Function below calls from the service
        //        var valid = mainService.seeIfInputIsCorrect($scope.currentPlayer);
        var valid = true;
        if (valid) {

            $scope.students.push($scope.currentStudent);
            $scope.currentStudent = {};
        }
        counter++;
    };
    //NG DIALOGS
    $scope.clickToOpen = function(testy) {
      ngDialog.open({
        template: 'createNewTemplate',
        scope: $scope
      });
    };

    $scope.clickToOpenTwo = function() {
      ngDialog.open({
        template: 'loginTemplate',
        scope: $scope
      });
    };
    //CRUD FUNCTIONS
    $scope.postNewUser = function(newUser) {
      newUser.teacher = true;
      console.log("this is newUser", newUser);
      userService.postNewUser(newUser)
        .then(function(response) {
          console.log("New User Posted - info from home-controller");
        })
        $scope.newUser = {};
    };

    $scope.getOneUser = function(emailToCheckFor, passwordToCheckFor) {
      console.log("hitting controller!");
      userService.getUserByLogin(emailToCheckFor, passwordToCheckFor)
        .then(function(response) {
          console.log("we found a user with those credentials");
        })
    }

}]);
