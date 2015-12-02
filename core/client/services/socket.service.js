angular.module('bulletinApp').service('socketService', ['$rootScope', function ($rootScope) {
   var socket = io.connect();

   return socket;

}]);
