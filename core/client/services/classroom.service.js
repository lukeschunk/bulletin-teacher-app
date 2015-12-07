bulletinApp.service('classroomService', function($http, $q) {

  this.postNewClass = function(newClass) {
    return $http.post('/api/classroom', newClass)
      .then(function(response) {
          return response.data;
      });
  };



})
