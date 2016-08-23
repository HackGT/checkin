angular.module('checkin')
  .controller('LoginController', [
    '$scope',
    '$state',
    'AuthService',
    function($scope, $state, AuthService) {

      function onSuccess(data) {
        console.log('success', data);
        $state.go('app.checkin');
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
