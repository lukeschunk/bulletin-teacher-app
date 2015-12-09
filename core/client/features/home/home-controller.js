bulletinApp.controller("homeController", ["$scope", "ngDialog", "userService", "$state", "classroomService", "lobbyService",
  function($scope, ngDialog, userService, $state, classroomService, lobbyService) {
    $scope.test = "Hey there buddy";
    //NG DIALOGS





    //NG Dialog Modal Toggeling Panes

    $scope.showMe = true;

    $scope.next = function() {
      if ($scope.showMe) {
        $scope.showMe = '';
      } else {
        $scope.showMe = true;
      }
    }

    //opens 'Create a New Class' Modal
    $scope.clickToOpen = function() {
      ngDialog.open({
        template: 'createNewTemplate',
        scope: $scope
      });
    }

    //at End of 'Create a New Class Modal'
        $scope.goToLobby = function() {
            $scope.postNewClass($scope.newUser);
            ngDialog.closeAll();
          };



    //opens 'Login' Modal
    $scope.clickToOpenLoginPrompt = function() {
      ngDialog.open({
        template: 'loginTemplate',
        scope: $scope
      });
    }

      //At End of 'Login Modal', grabs user by LoginInfo
      $scope.login = function(loginUserEmail, loginUserPassword) {
        userService.getUserByLogin(loginUserEmail, loginUserPassword)
          .then(function(response) {
            console.log("alksjdglk", response);
            console.log("response[0]", response[0].classesBelongTo[0]);
            $scope.currentLoggedInUser = response[0];
            var loginClassId = response[0].classesBelongTo[0];
            $state.go('mainLobby', {"classId":loginClassId});
            lobbyService.saveLoggedInUserData($scope.currentLoggedInUser);

          })
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
