var app = angular.module('checkin', [
  'ui.router',
]);

app.config([
  '$httpProvider',
  'SERVER_URL',
  function($httpProvider, SERVER_URL) {
    $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

    // add root url to all api and auth requests
    $httpProvider.interceptors.push(function() {
      return {
        request: function(config) {
          if (config.url.indexOf('api/') === 0 || config.url.indexOf('auth/') === 0) {
            config.url = SERVER_URL.BASE_URL + config.url;
            config.headers['Access-Control-Allow-Origin'] = '*';
          }
          console.log(config);
          return config;
        }
      };
    });
  }
]);
