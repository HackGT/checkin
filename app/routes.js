angular.module('checkin')
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    function(
      $stateProvider,
      $urlRouterProvider) {
        $stateProvider
          .state('login', {
            url: '/login',
            templateUrl: "views/login/login.html"
          });
    }
  ]);
