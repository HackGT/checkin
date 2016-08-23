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
              'sidebar@app': {
                templateUrl: "views/sidebar/sidebar.html",
                controller: 'SidebarController',
              },
            },
            data: {
              requireLogin: true,
              pageTitle: 'Checkin',
            },
          })
          .state('app.checkin', {
            url: '/',
            templateUrl: 'views/checkin/checkin.html',
            controller: 'CheckinController',
          });
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
    }
  ]);
