angular.module('checkin')
  .factory('UserService', [
    '$q',
    '$http',
    'Session',
    function($q, $http, Session) {
      var users = 'api/users';
      var base = users + '/';
      var groups = 'api/groups/';

      var UserService = {};

      UserService.getUsers = function(options) {

        var me = Session.getUser();
        // if not an admin and no groups are selected, automatically scope
        // to only groups that are permissioned
        if (!(me.admin || (me.checkin && me.checkin.all))) {
          if (!options.group) {
            options.group = me.checkin.groups;
          }
        }

        if (options.group && !Array.isArray(options.group)) {
          options.group = [options.group];
        }

        if (options.page !== undefined || options.size !== undefined) {
          options.page = options.page || 0;
          options.size = options.size || 50;
        }

        console.log(options);

        // TODO [adai] yes this is kinda dumb and should be better
        var url = options ? users + '?' + $.param(
          {
            text: options.text,
            page: options.page,
            size: options.size,
            group: options.group,
          }) : base;

        return $http.get(url);
      };

      UserService.checkin = function(attendee) {
        var attendeeId = attendee._id;
        var url = base + attendeeId + '/checkin';

        var me = Session.getUser();
        // if the user is not omnipotent, find the intersection of between
        // groups that the user can checkin the and attendee is a member of
        if (!(me.admin || (me.checkin && me.checkin.all))) {
          var groupId = attendee.groups.find(function(groupId) {
            return me.check.groups.indexOf(groupId) !== -1;
          });
          url = groups + groupId + '/users/' + attendeeId + '/checkin';
        }

        return $http.post(url);
      };

      UserService.checkout = function(attendee) {
        var attendeeId = attendee._id;
        var url = base + attendeeId + '/checkout';

        var me = Session.getUser();
        // if the user is not omnipotent, find the intersection of between
        // groups that the user can checkout the and attendee is a member of
        if (!(me.admin || (me.checkin && me.checkin.all))) {
          var groupId = attendee.groups.find(function(groupId) {
            return me.check.groups.indexOf(groupId) !== -1;
          });
          url = groups + groupId + '/users/' + attendeeId + '/checkout';
        }

        return $http.post(url);
      };

      return UserService;
    }
  ]);
