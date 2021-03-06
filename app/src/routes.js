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
            templateUrl: "views/login/login.html",
            controller: 'LoginController',
            data: {
              requireLogin: false,
              pageTitle: 'Login',
            },
          })
          .state('app', {
            abstract: true,
            views: {
              '@': {
                templateUrl: "views/base.html",
              },
              'toolbar@app': {
                templateUrl: "views/toolbar/toolbar.html",
                controller: 'ToolbarController',
              },
            },
            data: {
              requireLogin: true,
              pageTitle: 'Checkin',
            },
          })
          .state('app.checkin', {
            url: '/checkin',
            templateUrl: 'views/checkin/checkin.html',
            controller: 'CheckinController',
          })
          .state('app.groups', {
            url: '/groups',
            templateUrl: 'views/groups/groups.html',
            controller: 'GroupsController',
          });

        $urlRouterProvider.otherwise('/checkin');
    }
  ])
  .run([
    '$rootScope',
    '$state',
    'Session',
    function(
      $rootScope,
      $state,
      Session){

      $rootScope.$on('$stateChangeSuccess', function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      });

      $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        var requireLogin = toState.data.requireLogin;

        if (requireLogin && !Session.getToken()) {
          event.preventDefault();
          $state.go('login');
        }
      });

      if (!Session.getToken()) {
        $state.go('login');
      }
    }
  ]);
