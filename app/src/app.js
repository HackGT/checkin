var app = angular.module('checkin', [
  'ui.router',
]);

app.config([
  '$httpProvider',
  function($httpProvider, SERVER_URL) {

    // add root url to all api and auth requests
    $httpProvider.interceptors.push('ApiAuthenticator');
  }
]);

app.factory('ApiAuthenticator', [
  'Session',
  'SERVER_URL',
  function(Session, SERVER_URL) {
    return {
      request: function(config) {
        if (config.url.indexOf('api/') === 0 || config.url.indexOf('auth/') === 0) {
          config.url = SERVER_URL.BASE_URL + config.url;
          config.headers['Access-Control-Allow-Origin'] = SERVER_URL.BASE_URL;
        }
        var token = Session.getToken();
        if (token) {
          config.headers['x-access-token'] = token;
        }
        return config;
      }
    };
  }
]);

app.directive('title', ['$rootScope', '$timeout',
  function($rootScope, $timeout) {
    return {
      link: function() {

        var listener = function(event, toState) {

          $timeout(function() {
            $rootScope.title = (toState.data && toState.data.pageTitle) ?
              toState.data.pageTitle : 'Default title';
          });
        };

        $rootScope.$on('$stateChangeSuccess', listener);
      }
    };
  }
]);
