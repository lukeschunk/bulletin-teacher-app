bulletinApp.controller("homeController", ["$scope", "ngDialog", "userService", "$state", "classroomService", "lobbyService",
  function($scope, ngDialog, userService, $state, classroomService, lobbyService) {
    $scope.test = "Hey there buddy";

    $scope.saveClass = function() {

    }

    var counter = 1;

    $scope.students = [];
    $scope.addStudentToTable = function() {
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




    //MY TEST

    $scope.showMe = true;

    $scope.next = function() {
      if ($scope.showMe) {
        $scope.showMe = '';
      } else {
        $scope.showMe = true;
      }
    }

    $scope.clickToOpen = function() {
      console.log("this is $scope.classname", $scope.className);
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
        $scope.postNewClass($scope.newUser);

        ngDialog.closeAll();
      }
      //CRUD FUNCTIONS
    $scope.postNewUser = function(newUser) {
      $scope.next();
      newUser.teacher = true;
      console.log("this is newUser", newUser);
      userService.postNewUser(newUser)
        .then(function(response) {
          $scope.currentUser = response.data;
          console.log("this is $scope.currentUser", $scope.currentUser);
        })
      $scope.newUser = {};
    };


    //GET ONE USER FUNCTIONS

    $scope.login = function(loginUserEmail, loginUserPassword) {
      userService.getUserByLogin(loginUserEmail, loginUserPassword)
        .then(function(response) {
          console.log("alksjdglk", response);
          var loginClassId = response[0].classesBelongTo[0];
          $state.go('mainLobby', {"classId":$scope.loginClassId});

        })
        ngDialog.closeAll();
    }

    $scope.userLoggingIn = {};



    $scope.getOneUser = function(emailToCheckFor, passwordToCheckFor) {

      userService.getUserByLogin(emailToCheckFor, passwordToCheckFor)
        .then(function(response) {
          console.log("this is the response", response);
          return response;
        })
    }


    $scope.postNewClass = function() {

      var classToAdd = {
        className: $scope.className,
        usersInClass: [$scope.currentUser._id]
      };

      classroomService.postNewClass(classToAdd)
        .then(function(response) {

          $scope.currentClass = response;
          console.log("this is $scope.currentClass", $scope.currentClass);

          userService.updateUserWithClassId(response._id, $scope.currentUser._id)
            .then(function(response) {
              console.log("This is RESPONSE", response);
              lobbyService.saveLoggedInUserData(response);
              $state.go('mainLobby', {"classId":$scope.currentClass._id });
            })

        })
      $scope.getOneUser($scope.currentUser.email, $scope.currentUser.password);

    }

  }
]);
