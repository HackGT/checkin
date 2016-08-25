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

      // TODO move this to a directive
      $('.add-volunteer').search({
        apiSettings: {
          responseAsync: function(settings, callback) {
            var query = settings.urlData.query;
            UserService.getUsers({text: settings.urlData.query})
              .then(function(serverResponse) {
                results = serverResponse.data.users.map(function(user) {
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
    }
  ]);
