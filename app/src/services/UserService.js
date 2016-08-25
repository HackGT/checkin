angular.module('checkin')
  .factory('UserService', [
    '$q',
    '$http',
    'Session',
    function($q, $http, Session) {
      var users = 'api/users';
      var base = users + '/';

      var UserService = {};

      UserService.getUsers = function(options) {
        if (options.page !== undefined || options.size !== undefined) {
          options.page = options.page || 0;
          options.size = options.size || 50;
        }

        // TODO [adai] yes this is kinda dumb and should be better
        var url = options ? users + '?' + $.param(
          {
            text: options.text,
            page: options.page,
            size: options.size,
            group: options.groupId,
          }) : base;

        return $http.get(url);
      };

      UserService.checkin = function(userId) {
        return $http.post(base + userId + '/checkin');
      };

      UserService.checkout = function(userId) {
        return $http.post(base + userId + '/checkout');
      };

      return UserService;
    }
  ]);
