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
        var url = options ? users + '?' + $.param(
          {
            text: options.text,
            page: options.page ? options.page : 0,
            size: options.size ? options.size : 50
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
