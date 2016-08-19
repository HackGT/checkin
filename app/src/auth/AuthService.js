angular.module('checkin')
  .factory('AuthService', [
    '$q',
    '$http',
    '$rootScope',
    '$state',
    'Session',
    function($q, $http, $rootScope, $state, Session) {
      var authService = {};

      function getResponseData(response) {
        return response.data;
      }

      function loginSuccess(data) {
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
          .post('auth/login', {
            email: email,
            password: password,
          })
          .then(getResponseData, getResponseData)
          .then(loginSuccess, loginFailure);
      };

      // TODO unsure if this works!
      authService.loginWithToken = function(token) {
        console.warn("Not actually sure if this works yet!");
        return $http
          .post('auth/login', {
            token: token
          })
          .then(getResponseData)
          .then(loginSuccess, function() {
            if (status === 400) {
              Session.destroy().then(loginFailure);
            }
          });
      };

      return authService;
    }
  ]);
