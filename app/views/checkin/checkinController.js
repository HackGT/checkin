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
            this.nextPage = this.nextPage + 1;

            UserService.getUsers({
              text: getQuery(),
              page: this.nextPage,
            }).then(loadFromResponse.bind(this));
          },
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
