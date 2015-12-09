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

  this.updateClassWithUser = function(classId) {
    return $http.put('/api/classroom/' + classId)
      .then(function (response) {
          return response.data;
      })
  }

})
