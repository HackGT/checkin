angular.module('checkin')
  .factory('AuthService', [
    '$q',
    '$http',
    '$rootScope',
    '$state',
    'Session',
    function($q, $http, $rootScope, $state, Session) {
      var authService = {};
      var baseUrl = 'auth/';

      function loginSuccess(response) {
        var data = response.data;
        console.log('auth success', data);
        Session.create(data.token, data.user);
        return $q(function(resolve) {
          resolve(data.user);
        });
      }

      function loginFailure(data, callback) {
        console.log('auth fail', data);
        $state.go('login');
        return $q(function(resolve, reject) {
          reject(data);
        });

      }

      authService.loginWithPassword = function(email, password) {
        return $http
          .post(baseUrl + 'login', {
            email: email,
            password: password,
          })
          .then(loginSuccess, loginFailure);
      };

      // TODO unsure if this works!
      authService.loginWithToken = function(token) {
        console.warn("Not actually sure if this works yet!");
        return $http
          .post(baseUrl + 'login', {
            token: token
          })
          .then(loginSuccess, function() {
            if (status === 400) {
              Session.destroy().then(loginFailure);
            }
          });
      };

      return authService;
    }
  ]);
