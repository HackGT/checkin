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
      var $smsNotifications = $('.smsNotifications');

      $scope.setSelectedUser = function(user) {
        $scope.selectedUser = user;
        if (user) {
          $userDetails.modal({
            // 'approval' = checking in
            onApprove: function() {
              checkin(user).then(function(user) {
                // not working plz ignore
                // if (!user.confirmation.wantsSMSNotifications) {
                //   $smsNotifications.modal({
                //     onDeny: function() {
                //       user.confirmation.wantsSMSNotifications = false;
                //       updateConfirmation(user);
                //     },
                //     onApprove: function() {
                //       user.confirmation.wantsSMSNotifications = true;
                //       updateConfirmation(user);
                //     }
                //   }).modal('show');
                // }
              });
            },
            onDeny: function() {
              checkout(user).then(function(user) {
                // nothing right now
              });
            }
          }).modal('show');
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

      function checkin(user) {
        return UserService.checkin(user)
          .then(function(data) {
            console.log('checked in', data);
            user.status.checkedIn = true;
            return user;
          });
      }

      function checkout(user) {
        return UserService.checkout(user)
          .then(function(data) {
            console.log('checked out', data);
            user.status.checkedIn = false;
            return user;
          });
      }

      // not working yet
      // function updateConfirmation(user) {
      //   return UserService.updateConfirmation(user)
      //     .then(function(data) {
      //       console.log('update confirmation', data);
      //       return data;
      //     });
      // }
    }
  ]);
