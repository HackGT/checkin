angular.module('checkin')
  .controller('SidebarController', [
    '$scope',
    '$state',
    'Session',
    function($scope, $state, Session) {
      $('.logout').click(function() {
        Session.destroy().then(function() {
          $state.go('login');
        });
      });
    }
  ]);
