bulletinApp.controller("lobbyController", ["$scope", "messageService", "userService", "socketService", "lobbyService", "$stateParams", "ngDialog", "classroomService",
  function($scope, messageService, userService, socketService, lobbyService, $stateParams, ngDialog, classroomService) {



    $scope.glued = true;

    $scope.messages = [];

    $scope.currentClassId = $stateParams.classId;
    $scope.currentUserId = $stateParams.userId.toString();



    $scope.getClassById = function(classId) {
      classroomService.getClassById(classId)
        .then(function(response) {
          $scope.className = response.test; //SOMETHING
        })
    }
    $scope.getClassById($scope.currentClassId);


    console.log("This is currentUSERID", $scope.currentUserId);
    //GET MESSAGES
    $scope.getMessages = function(classId) {
      messageService.getMessages(classId)
        .then(function(response) {
          $scope.usersInClass = response.usersInClass;
          $scope.populatedClass = response;
          $scope.messages = $scope.populatedClass.messagesInClass;
          //SOCKET
          socketService.emit('myEmitter', $scope.messages);

          $scope.glued = true;
          // getUsersInClass(classId);
        })
    };
    //INVOKING GET MESSAGES SO PAGE LOADS WITH MESSAGES LOADED

    $scope.getMessages($scope.currentClassId);

    // $scope.testOutService = function() {
    //   $scope.getMessages($scope.currentClassId);
    //   $scope.myLoggedInUser = lobbyService.myNewVar;
    //
    //   return $scope.myLoggedInUser;
    // };
    //
    // $scope.testOutService();

    //POST NEW MESSAGE ( ALSO GETS MESSAGE AND EMITS SOCKET )
    $scope.postNewMessage = function(messageText, currentClassId, userId) {
      console.log("XX_messageText", messageText);
      console.log("XX_ClassId", currentClassId);
      console.log("XX_userId", userId);
      console.log("moment", moment().startOf('day').fromNow());
      var myDate = new Date()
      var newMessage = {
        content: messageText,
        date: moment().calendar(),
        sender: userId
      };

      // SOCKETS


      messageService.postNewMessage(newMessage, currentClassId)
        .then(function(response) {

          $scope.getMessages(currentClassId);
        });

      $scope.messageText = "";
    };

    //SOCKET LISTENER TO POST MESSAGE COMING BACK FROM SERVER

    socketService.on('messageFromServer', function(messageArrayFromServer) {
      console.log("SOCKET_this is messageArrayFromServer", messageArrayFromServer);
      console.log("SOCKET_message in socket", messageArrayFromServer[0].sender.classesBelongTo[0]);
	  console.log("this is $scope.currentClassId", $scope.currentClassId);
      if (messageArrayFromServer[0].sender.classesBelongTo[0] === $scope.currentClassId) {
        console.log("this is messageArrayFromServer(onController)", messageArrayFromServer);
        $scope.messages = messageArrayFromServer;
        $scope.glued = true;
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


    $scope.changeSettings = function () {
      ngDialog.open({
        template:'changeSettings',
        scope: $scope
      });
    };


    $scope.addStudents = function() {
      ngDialog.open({
        template: 'addStudents',
        scope: $scope
      });
    };

    $scope.addNewStudent = function(student) {
      console.log("this is currentClassId", $scope.currentClassId);
      var newUserToAdd = {
        firstName: student.firstName,
        lastName: student.lastName,
        teacher: false,
        email: student.email,
        password: student.firstName + '.' + student.lastName,
        classesBelongTo: [$scope.currentClassId],
        image: student.image
      };

      userService.postNewUser(newUserToAdd)
        .then(function(response) {

          $scope.loggedInUser = response.data;
          var loggedInUserId = {
            id: response.data._id
          }
          classroomService.updateClassWithUser(loggedInUserId, $scope.currentClassId)
            .then(function(response) {
              $scope.getMessages($scope.currentClassId);
            })
        })
      console.log("this is $scope.newStudent", $scope.newStudent); //this is undefined

      $scope.newStudent = {};

    };

    $scope.deleteStudent =function(studentId) {
      console.log("this is studentId", studentId);
      userService.deleteStudent(studentId)
        .then(function(response) {
          $scope.getMessages($scope.currentClassId);
          console.log("student has been deleted i think");
          //CHANGING CLASSES
          $scope.rightBodyClass = "right-body-full";
          $scope.rightBodySideBarClass = "right-body-sidebar-hidden";
          $scope.rightBodyBottomClass = "right-body-bottom";
          $scope.submitClass = "submit";
        })
    }

    $scope.closeModal = function() {
      ngDialog.closeAll();
    };

    $scope.filledInStar = true;

    $scope.starMessage = function(index) {
      $scope.messages[index].filledin = true;
      $scope.filledInStar = !$scope.filledInStar;

    };

    $scope.hideSidebar = function() {
      $scope.rightBodyClass = "right-body-full";
      $scope.rightBodySideBarClass = "right-body-sidebar-hidden";
      $scope.rightBodyBottomClass = "right-body-bottom";
      $scope.submitClass = "submit";
    }


    $scope.lookAtStudent = function(studentToPullUp) {
      if ($scope.rightBodyClass !== "right-body") {

        $scope.rightBodyClass = "right-body";
        $scope.rightBodySideBarClass = "right-body-sidebar";
        $scope.rightBodyBottomClass = "right-body-bottom-collapsed";
        $scope.submitClass = "submit-collapsed";
      }
      // $scope.rightBodySideBar = !$scope.rightBodySideBar;
      console.log("this is studentToPullUp", studentToPullUp);
      $scope.studentToPullUp = {
        firstName: studentToPullUp.firstName,
        lastName: studentToPullUp.lastName,
        email: studentToPullUp.email,
        image: studentToPullUp.image,
        id: studentToPullUp._id
      }
    }


    $scope.rightBodyClass = "right-body-full";
    $scope.rightBodySideBarClass = "right-body-sidebar-hidden";
    $scope.rightBodyBottomClass = "right-body-bottom";
    $scope.submitClass = "submit";

    var input = document.getElementById('message-input');
    input.onkdyup = expandTextArea();

    function expandTextArea() {
      console.log("It's Working!");
      input.style.height = "1px";
      input.style.height = (25 + input.scrollHeight) + "px";
    }


  }
]);
