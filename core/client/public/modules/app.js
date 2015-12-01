var bulletinApp = angular.module("bulletinApp", ['ui.router']);


bulletinApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        .state('home', {
            url: '/home',
            templateUrl: './public/views/home-view.html',
            controller: 'homeController'

        })

        .state('createClass', {
            url: '/create-class',
            templateUrl: './public/views/create-class.html',
            controller: 'homeController'
        })

        .state('mainLobby', {
            url: '/lobby',
            templateUrl: './public/views/main-lobby.html',
            controller: 'lobbyController'
        })

});
