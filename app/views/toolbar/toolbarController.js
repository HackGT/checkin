angular.module('checkin')
  .controller('ToolbarController', [
    '$scope',
    '$state',
    '$rootScope',
    'Session',
    function($scope, $state, $rootScope, Session) {
      var user = Session.getUser();

      $scope.states = ([
        {
          name: 'app.checkin',
          title: 'Checkin',
        },
        {
          name: 'app.groups',
          title: 'Groups',
          adminOnly: true,
        }
      ]).filter(function(state) {
        return !(state.adminOnly && !user.admin);
      });

      $('.logout').click(function() {
        Session.destroy().then(function() {
          $state.go('login');
        });
      });
    }
  ]);
