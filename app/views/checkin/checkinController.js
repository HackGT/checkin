angular.module('checkin')
  .controller('CheckinController', [
    '$scope',
    'UserService',
    function($scope, UserService) {

      var $search = $('.userSearch > .sticky');
      $search.sticky({
        context: '.userList > table',
      });

      $scope.users = {
        users: [],
        busy: false,
        nextPage: 0,
        totalPages: Infinity,
        totalUsers: 0,
      };

      $scope.selectedUser = null;
      $scope.setSelectedUser = function(user) {
        var $userDetails = $('.userDetails');
        $userDetails.modal();
        $scope.selectedUser = user;
        if (user) {
          $userDetails.modal('show');
        } else {
          $userDetails.modal('hide');
        }
      };


      $scope.users.getNextPage = function() {
        if (this.busy) { return; }
        if (this.nextPage >= this.totalPages) { return; }
        $search.sticky('refresh');

        this.busy = true;

        UserService.getUsers({
          page: this.nextPage,
        }).then(function(response) {
          console.log(response.data);

          this.users = this.users.concat(response.data.users);

          this.totalUsers = response.data.totalUsers;
          this.totalPages = response.data.totalPages;
          this.nextPage += 1;
          this.busy = false;

          $search.sticky('refresh');
        }.bind(this));
      };


      $scope.checkin = function(userId) {
        UserService.checkin(userId)
          .then(function(data) {
            console.log('checked in', data);
          });
      };

      $scope.checkout = function(userId) {
        UserService.checkout(userId)
          .then(function(data) {
            console.log('checked out', data);
          });
      };
    }
  ]);
