bulletinApp.service('messageService', function ($http, $q) {

  this.getMessages = function(classId) {
    return $http.get('/api/classroom/' + classId)
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

  this.postNewMessage = function(message, id) {
      console.log("This is MESSAGE ON SERVICE", message);
      return $http.post('/api/classroom/' + id, message)
        .then(function(response) {
          console.log("THIS IS RESPONSE ON POST NEW MESSAGE SERVICE", response);
          return response;
        }, function(error) {
          console.log(error);
          return error;
        });
  };


})
