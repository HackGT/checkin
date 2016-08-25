angular.module('checkin')
  .factory('GroupService', [
    '$q',
    '$http',
    'Session',
    function($q, $http, Session) {
      var groups = 'api/groups/';

      var GroupService = {};

      GroupService.getGroups = function() {
        return $http.get(groups);
      };

      GroupService.createGroup = function(groupName) {
        return $http.post(groups, { groupName: groupName });
      };

      GroupService.getVolunteers = function(groupId) {
        return $http.get(groups + groupId + '/volunteers');
      };

      GroupService.addVolunteerToGroup = function(volunteerId, groupId) {
        return $http.put(groups + groupId + '/volunteers/' + volunteerId);
      };

      GroupService.removeVolunteerFromGroup = function(volunteerId, groupId) {
        return $http.delete(groups + groupId + '/volunteers/' + volunteerId);
      };

      GroupService.addUsersToGroup = function(groupId, users) {
        return $http.put(group + groupId, users);
      };

      GroupService.removeUsersFromGroup = function(groupId, users) {
        return $http.delete(groups + groupId, users);
      };

      return GroupService;
    }
  ]);
