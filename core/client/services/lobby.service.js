bulletinApp.service('lobbyService', function($http, $q) {

  this.saveLoggedInUserData = function(loggedInUser) {
    var myLoggedInUser = {
      id: loggedInUser._id,
      classesBelongTo: loggedInUser.classesBelongTo,
      email: loggedInUser.email,
      firstName: loggedInUser.firstName,
      lastName: loggedInUser.lastName,
      password: loggedInUser.password,
      starredMessages: loggedInUser.starredMessages,
      teacher: loggedInUser.teacher,
      image: loggedInUser.image
    }
    return this.myNewVar = myLoggedInUser;
  }

})
