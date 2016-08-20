angular.module('checkin')
  .controller('CheckinController', [
    '$scope',
    'UserService',
    function($scope, UserService) {

      $scope.users = {
        users: [],
        busy: false,
        nextPage: 0,
        totalPages: Infinity,
      };

      $scope.users.getNextPage = function() {
        if (this.busy) { return; }
        if (this.nextPage >= this.totalPages) { return; }

        this.busy = true;

        UserService.getUsers({
          page: this.nextPage,
        }).then(function(response) {
          console.log(response.data);

          this.users = this.users.concat(response.data.users);

          this.totalPages = response.data.totalPages;
          this.nextPage += 1;
          this.busy = false;
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
