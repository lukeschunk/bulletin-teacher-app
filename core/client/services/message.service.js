bulletinApp.service('messageService', function ($http, $q) {

  this.getMessages = function() {
    return $http.get('/api/messages')
      .then(function(response) {
        return response.data;
      });
  };

  this.getMessageById = function (id) {
      return $http.get('/api/messages/' + id)
        .then(function (response) {

            console.log('this is response from service' + response);
            return response.data;
        }, function (error) {

              console.log("this is error from service" + error);
              return "sorry there is nobody by that ID"
        });
  };

  this.postNewMessage = function(message) {

      return $http.post('/api/messages', message)
        .then(function(response) {
          console.log(response);

          return "message added!";
        }, function(error) {
          console.log(error);
          return error;
        });
  };


})
