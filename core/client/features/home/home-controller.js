bulletinApp.controller("homeController", ["$scope", "ngDialog", "userService", "$state", function ($scope, ngDialog, userService, $state) {
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
    $scope.login = function(loginUserEmail, loginUserPassword) {
      $scope.getOneUser(loginUserEmail, loginUserPassword);
      $scope.goToLobby();
      ngDialog.closeAll();
    }



//MY TEST

  $scope.showMe = true;

  $scope.next = function() {
    if($scope.showMe) {
      $scope.showMe = '';
    } else {
      $scope.showMe = true;
    }
  }

    $scope.clickToOpen = function() {
      $scope.postNewClass();
                ngDialog.open({
                  template: 'createNewTemplate',
                  scope: $scope
                  });
            }



    $scope.clickToOpenLoginPrompt = function() {
          ngDialog.open({
            template: 'loginTemplate',
              scope: $scope
          });
    }

    $scope.goToLobby = function() {
      $state.go('mainLobby');
      ngDialog.closeAll();
    }
    //CRUD FUNCTIONS
    $scope.postNewUser = function(newUser) {
      $scope.next();
      newUser.teacher = true;
      console.log("this is newUser", newUser);
      userService.postNewUser(newUser)
        .then(function(response) {
          console.log("New User Posted - info from home-controller");
        })
        $scope.newUser = {};
    };



    $scope.getOneUser = function(emailToCheckFor, passwordToCheckFor) {
      console.log("this is emailToCheckFor", emailToCheckFor);
      console.log("this is passwordToCheckFor", passwordToCheckFor);
      console.log("hitting controller!");
      userService.getUserByLogin(emailToCheckFor, passwordToCheckFor)
        .then(function(response) {
          console.log("we found a user with these credentials", response);
        })
    }


    $scope.postNewClass = function(classToPost) {

    }

}]);
