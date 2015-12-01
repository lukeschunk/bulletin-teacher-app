bulletinApp.controller("homeController", ["$scope", function ($scope) {
    $scope.test = "Hey there cutie";

    $scope.saveClass = function () {

    }

    var counter = 1;

    $scope.students = [];
    $scope.addStudentToTable = function () {
        $scope.currentStudent.id = counter;
        console.log("this is current student", $scope.currentStudent);
        //Function below calls from the service 
        //        var valid = mainService.seeIfInputIsCorrect($scope.currentPlayer);
        var valid = true;
        if (valid) {

            $scope.students.push($scope.currentStudent);
            $scope.currentStudent = {};
        }
        counter++;
    };

}]);