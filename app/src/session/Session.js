angular.module('checkin')
  .service('Session', [
    '$rootScope',
    '$window',
    '$q',
    function($rootScope, $window, $q){
      this.create = function(token, user){
        $window.localStorage.jwt = token;
        $window.localStorage.userId = user._id;
        $window.localStorage.currentUser = JSON.stringify(user);
        $rootScope.currentUser = user;
      };

      this.destroy = function(){
        delete $window.localStorage.jwt;
        delete $window.localStorage.userId;
        delete $window.localStorage.currentUser;
        $rootScope.currentUser = null;
        return $q(function(resolve, reject) {
          resolve();
        });
      };

      this.getToken = function(){
        return $window.localStorage.jwt;
      };

      this.getUserId = function(){
        return $window.localStorage.userId;
      };

      this.getUser = function(){
        return JSON.parse($window.localStorage.currentUser);
      };
  }]);
