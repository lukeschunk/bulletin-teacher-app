bulletinApp.service('classroomService', function($http, $q) {

  this.postNewClass = function(newClass) {
    return $http.post('/api/classroom', newClass)
      .then(function(response) {
          return response.data;
      });
  };

  this.getUsersInClass = function(classId) {
    return $http.get('/api/classroom/users/' + classId)
      .then(function(response) {
        return response.data;
      })
  };

  this.updateClassWithUser = function(userId, classId) {

    console.log("this is userId on clasroom service", userId);
    console.log("this is classId on classroom service", classId);

    return $http.post('/api/classroom/users/' + classId, userId)
      .then(function (response) {
          return response.data;
      })
  };

  this.getClassById = function(classId) {
    return $http.get('/api/classroom/current/:id' + classId)
      .then(function(response) {
        return response.data
      })
  }



})
