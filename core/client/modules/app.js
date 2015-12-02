var bulletinApp = angular.module("bulletinApp", ['ui.router']);


bulletinApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        .state('home', {
            url: '/home',
            templateUrl: './features/home/home-view.html',
            controller: 'homeController'

        })

        .state('mainLobby', {
            url: '/lobby',
            templateUrl: './features/main-lobby/main-lobby.html',
            controller: 'lobbyController'
        })

});
