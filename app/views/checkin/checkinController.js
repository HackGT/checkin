angular.module('checkin')
  .controller('CheckinController', [
    '$scope',
    'UserService',
    function($scope, UserService) {
      // TODO make this a directive
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
        currentQuery = query;

        // this is all a low-key workaround for $http's lack of cancel()
        UserService.getUsers({
          page: 0, // indicate that we want this to be paged (size is default 50)
          text: query,
        }).then(function(response) {
          // if this is no longer the most recent query, then ignore
          if (query !== currentQuery) { return; }
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
          getNextPage: function() {
            if (this.busy) { return; }

            this.busy = true;

            UserService.getUsers({
              text: getQuery(),
              page: this.nextPage,
            }).then(loadFromResponse.bind(this));

            this.nextPage = this.nextPage + 1;
          },
        };
      }
      resetUserList();

      $scope.selectedUser = null;
      var $userDetails = $('.userDetails');

      $scope.setSelectedUser = function(user) {
        $userDetails.modal();
        $scope.selectedUser = user;
        if (user) {
          $userDetails.modal('show');
        } else {
          $userDetails.modal('hide');
        }
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

      $scope.checkin = function(user) {
        console.log('checkin', user);
        UserService.checkin(user)
          .then(function(data) {
            console.log('checked in', data);
            user.status.checkedIn = true;
            $userDetails.modal('hide');
          });
      };

      $scope.checkout = function(user) {
        console.log('checkout', user);
        UserService.checkout(user)
          .then(function(data) {
            console.log('checked out', data);
            user.status.checkedIn = false;
            $userDetails.modal('hide');
          });
      };
    }
  ]);
