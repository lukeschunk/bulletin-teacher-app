bulletinApp.service('userService', function ($http, $q) {

  this.getUsers = function() {
    return $http.get('/api/users')
      .then(function(response) {
        return response.data;
      });
  };

  this.getUserByLogin = function (emailToCheckFor, passwordToCheckFor) {
    console.log("service is being hit!");
      return $http.post('/api/users/login', {
        email: emailToCheckFor,
        password: passwordToCheckFor
      })
        .then(function (response) {

            console.log('this is response from service' + response);
            return response.data;
        }, function (error) {

              console.log("this is error from service" + error);
              return "sorry there is nobody by that ID"
        });
  };

  this.postNewUser = function(user) {

      return $http.post('/api/users', user)
        .then(function(response) {
          console.log(response);
          return "user added!";
        }, function(error) {
          console.log(error);
          return error;
        });
  };


})
