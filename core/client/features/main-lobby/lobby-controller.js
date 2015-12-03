bulletinApp.controller("lobbyController", ["$scope", "messageService", "userService", "socketService", function ($scope, messageService, userService, socketService) {

    $scope.glued = true;

    $scope.test = "Hey there cutie";

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
    //GET MESSAGES
    $scope.getMessages = function() {
      messageService.getMessages()
      .then(function(response) {
        $scope.messages = response;
      })
    }
    //INVOKING GET MESSAGES SO PAGE LOADS WITH MESSAGES LOADED
    $scope.getMessages();


    //POST NEW MESSAGE ( ALSO GETS MESSAGE AND EMITS SOCKET )
    $scope.postNewMessage = function(messageText) {
      var newMessage = {
        content: messageText,
        date: new Date()
      };

      // SOCKETS
      socketService.emit('message', newMessage);

      messageService.postNewMessage(newMessage)
        .then(function(response) {
          messageService.getMessages()
            .then(function (response) {
              console.log('this is sresponse.data', response);
              $scope.messages = response;
            })
        });


    };

    //SOCKET LISTENER TO POST MESSAGE COMING BACK FROM SERVER
    socketService.on('messageFromServer', function(messageObjectFromServer) {
        console.log("this is messageFromServer(onController)", messageObjectFromServer);
        $scope.messages.push(messageObjectFromServer);
        $scope.$digest();
    });


    $scope.getUsers = function() {

            userService.getUsers()
              .then(function(response) {
                $scope.users = response;
                console.log($scope.users);
              })
        };


      var element = document.getElementById("right-body");
      element.scrollTop = element.scrollHeight;

}]);
