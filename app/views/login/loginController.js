angular.module('checkin')
  .controller('LoginController', [
    '$scope',
    'AuthService',
    function($scope, AuthService) {

      function onSuccess(data) {
        console.log('success', data);
      }

      function onFailure(data) {
        console.log('failure', data);
      }

      $scope.login = function() {
        AuthService.loginWithPassword(
          $scope.email, $scope.password
        ).then(onSuccess, onFailure);
      };
    }
  ]);
