angular.module('checkin')
  .controller('CheckinController', [
    '$scope',
    'UserService',
    function($scope, UserService) {

      var $search = $('.userSearch > .sticky');
      $search.sticky({
        context: '.userList > table',
      });

      var currentQuery = null;
      // only return new query if length >= 3, else return
      function getQuery() {
        if (!$scope.query) {
          return null;
        } else if ($scope.query.length > 0 && $scope.query.length < 3) {
          return currentQuery;
        }
        return $scope.query;
      }

      $scope.searchUsers = function() {
        var query = getQuery();
        console.log("query:", query);
        if (query === currentQuery) { return; }

        // this is all a low-key workaround for $http's lack of cancel()
        //jshint -W120
        var thisQuery = currentQuery = UserService.getUsers({
          text: query,
        });
        //jshint +W120
        thisQuery.then(function(response) {
          // if this is no longer the most recent query, then ignore
          if (thisQuery !== currentQuery) { return; }
          resetUserList();
          loadFromResponse.bind($scope.users)(response);
        });
      };

      $scope.users = {};
      function resetUserList() {
        $scope.users = {
          users: [],
          busy: false,
          nextPage: 0,
          totalPages: 0,
          totalUsers: 0,
        };
      }
      resetUserList();

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

        this.busy = true;
        this.nextPage = this.nextPage + 1;

        UserService.getUsers({
          text: getQuery(),
          page: this.nextPage,
        }).then(loadFromResponse.bind(this));
      };

      $scope.users.getNextPage();

      function loadFromResponse(response) {
        console.log(response.data);

        this.users = this.users.concat(response.data.users);

        this.totalUsers = response.data.totalUsers;
        this.totalPages = response.data.totalPages;
        this.nextPage = this.nextPage + 1;
        this.busy = false;

        $search.sticky('refresh');
      }

      $scope.checkin = function(userId) {
        console.log('checkin', userId);
        // UserService.checkin(userId)
        //   .then(function(data) {
        //     console.log('checked in', data);
        //   });
      };

      $scope.checkout = function(userId) {
        console.log('checkout', userId);
        // UserService.checkout(userId)
        //   .then(function(data) {
        //     console.log('checked out', data);
        //   });
      };
    }
  ]);
