angular.module('checkin')
  .controller('GroupsController', [
    '$scope',
    'UserService',
    'GroupService',
    function ($scope, UserService, GroupService) {
      $scope.groups = [];

      $scope.getGroups = function() {
        GroupService.getGroups().then(function(response) {
          $scope.groups = response.data;
        });
      };
      $scope.getGroups();

      $scope.createGroup = function(groupName) {
        if (!groupName) { return; }

        GroupService.createGroup(groupName).then(function(response) {
          $scope.groups.push(response.data);
        });
      };

      $scope.selectedGroup = null;
      $scope.selectGroup = function(group) {
        $scope.selectedNewVolunteer = null;
        $scope.selectedGroup = group;
        GroupService.getVolunteers(group._id).then(function(response) {
          $scope.selectedGroup.volunteers = response.data.volunteers;
        });
        UserService.getUsers({ group: group._id }).then(function(response) {
          $scope.selectedGroup.users = response.data.users;
        });
      };

      $scope.selectedNewVolunteer = null;
      $scope.setSelectedNewVolunteer = function(user) {
        $scope.selectedNewVolunteer = user;
        // force ui refresh (otherwise wait until another event fires)
        // only when this is initiated by the search
        if (user) {
          $scope.$apply();
        }
      };

      $scope.addNewVolunteer = function(user, group) {
        GroupService.addVolunteerToGroup(user._id, group._id)
          .then(function(response) {
            $scope.selectedGroup.volunteers.push(response.data);
            $scope.setSelectedNewVolunteer(null);
          });
      };

      $scope.removeVolunteerFromGroup = function(user, group) {
        GroupService.removeVolunteerFromGroup(user._id, group._id)
          .then(function(response) {
            $scope.selectedGroup.volunteers.splice(
              $scope.selectedGroup.volunteers.findIndex(function(elem) {
                return elem._id === response.data._id;
              }), 1);
          });
      };

      // TODO move this to a directive?
      $('.add-volunteer').search({
        apiSettings: {
          responseAsync: function(settings, callback) {
            var query = settings.urlData.query;
            UserService.getUsers({text: settings.urlData.query})
              .then(function(serverResponse) {
                results = serverResponse.data.users
                  // filter out volunteers that are already selected
                  .filter(function(user) {
                    return $scope.selectedGroup.volunteers.findIndex(function(volunteer) {
                      return volunteer._id === user._id;
                    }) === -1;
                  })
                  // map server response to match ui search's expected format
                  .map(function(user) {
                    return {
                      title: user.profile.name || user.email,
                      description: user.profile.name ? user.email : undefined,
                      user: user,
                    };
                  });
                callback({
                  results: results,
                });
              });
          },
        },
        minCharacters : 3,
        onSelect: function(selection) {
          $scope.setSelectedNewVolunteer(selection.user);
        },
      });

      // TODO this needs to be in a directive
      // (see almost exact copy of this code in CheckinController)
      var currentQuery = null;
      $scope.searchUsers = function() {
        var query = getQuery();
        console.log("query:", query);

        if (!query || query === currentQuery) { return; }
        currentQuery = query;

        UserService.getUsers({
          text: query,
        }).then(function(response) {
          if (query !== currentQuery) { return; }
          console.log(response.data);

          setSearchUsers(response.data.users);
        });
      };

      function setSearchUsers (searchResults) {
        searchResults = searchResults || $scope.selectedGroup.searchUsers;
        $scope.selectedGroup.searchUsers = searchResults
          // filter out any users that are already in this group
          .filter(function(user) {
            return $scope.selectedGroup.users.findIndex(function(groupUser) {
              return groupUser._id === user._id;
            }) === -1;
          });
      }

      function getQuery() {
        if (!$scope.userQuery || $scope.userQuery.length < 3) {
          return null;
        }
        return $scope.userQuery;
      }

      $scope.addUsersToGroup = function() {
        var selectedUsers = $scope.selectedGroup.searchUsers.filter(function(user) {
          return user.active;
        }).map(function(user) {
          return user._id;
        });

        GroupService.addUsersToGroup($scope.selectedGroup._id, selectedUsers)
          .then(function(response) {
            $scope.selectedGroup.users = response.data.users;
            setSearchUsers();
          });
      };

      $scope.addAllUsersToGroup = function() {
        var selectedUsers = $scope.selectedGroup.searchUsers.map(function(user) {
          return user._id;
        });

        GroupService.addUsersToGroup($scope.selectedGroup._id, selectedUsers)
          .then(function(response) {
            $scope.selectedGroup.users = response.data.users;
            setSearchUsers();
          });
      };
    }
  ]);
