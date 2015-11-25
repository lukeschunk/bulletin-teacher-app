var bulletinApp = angular.module("bulletinApp", ['ui.router']);


bulletinApp.config(function($stateProvider, $urlRouterProvider) {
   
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        .state('home', {
            url: '/home',
            templateUrl: './public/views/home-view.html',
            controller: 'homeController'
        
        })
    
});