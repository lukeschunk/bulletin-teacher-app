bulletinApp.controller("lobbyController", ["$scope", "messageService", "userService", "socketService", function ($scope, messageService, userService, socketService) {



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

    $scope.getMessages = function() {
      messageService.getMessages()
      .then(function(response) {
        $scope.messages = response;
      })
    }
    $scope.getMessages();

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
              console.log('this is response.data', response);
              $scope.messages = response;
            })
        });


    };

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




}]);
