angular.module('checkin')
  .controller('ToolbarController', [
    '$scope',
    '$state',
    'Session',
    function($scope, $state, Session) {
      var user = Session.getUser();
      console.log(user);
      $scope.currentState = $state.current.name;

      $scope.states = ([
        {
          name: 'app.checkin',
          title: 'Checkin',
        },
        // {
        //   name: 'app.groups',
        //   title: 'Groups',
        //   adminOnly: true,
        // }
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
