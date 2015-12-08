bulletinApp.controller("lobbyController", ["$scope", "messageService", "userService", "socketService", "lobbyService", "$stateParams", "ngDialog",
  function ($scope, messageService, userService, socketService, lobbyService, $stateParams, ngDialog) {

    $scope.glued = true;

    $scope.communities = [
      "Advanced Reading",
      "Beginning Reading",
      "Advancved Math",
      "Beginning Math"
    ];

    $scope.recentMessages = [
      "Gabe",
      "Tim",
      "Alexander",
      "Sophia",
      "Erica",
      "Christina"
    ];

    $scope.messages = [];

    $scope.currentClassId = $stateParams.classId;
    //GET MESSAGES
    $scope.getMessages = function(classId) {
      messageService.getMessages(classId)
      .then(function(response) {
        $scope.populatedClass = response;
        $scope.messages = $scope.populatedClass.messagesInClass;
        //SOCKET
        socketService.emit('message', $scope.messages);
        console.log("THIS IS %SCOPE>MESSAGES", $scope.messages);
      })
    }
    //INVOKING GET MESSAGES SO PAGE LOADS WITH MESSAGES LOADED

    $scope.getMessages($scope.currentClassId);


    //POST NEW MESSAGE ( ALSO GETS MESSAGE AND EMITS SOCKET )
    $scope.postNewMessage = function(messageText, currentClassId, userId) {
      console.log("XX", messageText);
      console.log("XX", currentClassId);
      console.log("XX", userId);
      var newMessage = {
        content: messageText,
        date: new Date(),
        sender: userId
      };

      // SOCKETS


      messageService.postNewMessage(newMessage, currentClassId)
        .then(function(response) {
          console.log("THE .then is being hit");
          $scope.getMessages(currentClassId);
        });

        $scope.messageText = "";
    };

    //SOCKET LISTENER TO POST MESSAGE COMING BACK FROM SERVER

    socketService.on('messageFromServer', function(messageArrayFromServer) {
        console.log("in socket:", $scope.currentClassId);
        console.log("message in socket", messageArrayFromServer[0].sender.classesBelongTo[0]);
        if(messageArrayFromServer[0].sender.classesBelongTo[0] === $scope.currentClassId) {
        console.log("this is messageArrayFromServer(onController)", messageArrayFromServer);
        $scope.messages = messageArrayFromServer;
        $scope.$digest();
        }
    });


    $scope.getUsers = function() {

            userService.getUsers()
              .then(function(response) {
                $scope.users = response;
                console.log($scope.users);
              })
        };

    $scope.myLoggedInUser = "";

    $scope.testOutService = function() {
        $scope.getMessages($scope.currentClassId);
        $scope.myLoggedInUser = lobbyService.myNewVar;
        console.log("$scope.myLoggedInUser", $scope.myLoggedInUser);
        return $scope.myLoggedInUser;
    }

    $scope.testOutService();

    $scope.addStudents = function() {
      console.log("TEST 5083p98");
      ngDialog.open({
        template: 'addStudents',
        scope: $scope
      });
    };

    $scope.addNewStudent = function(student) {
      console.log("THIS IS STUDENT", student);
      var newUserToAdd = {
        firstName: student.firstName,
        lastName: student.lastName,
        teacher: false,
        email: student.email,
        password: student.firstName + '.' + student.lastName,
        classesBelongTo: [$scope.currentClassId],
        image: student.image
      };
      console.log("this is newUserToAdd", newUserToAdd);

      userService.postNewUser(newUserToAdd)
        .then(function(response) {
          $scope.loggedInUser = response.data;
          console.log("This is $scope.loggedInUser", $scope.loggedInUser);
        })

        console.log("this is $scope.newStudent", $scope.newStudent);
        console.log("$scope.newStudent.firstName", $scope.newStudent.firstName);

    }

    $scope.closeModal = function() {
      ngDialog.closeAll();
    }



}]);
