var app=angular.module("checkin",["ui.router"]);app.config(["$httpProvider","SERVER_URL",function(e,t){e.defaults.headers.common["Access-Control-Allow-Origin"]="*",e.interceptors.push(function(){return{request:function(e){return 0!==e.url.indexOf("api/")&&0!==e.url.indexOf("auth/")||(e.url=t.BASE_URL+e.url,e.headers["Access-Control-Allow-Origin"]="*"),console.log(e),e}}})}]),angular.module("checkin").config(["$stateProvider","$urlRouterProvider",function(e,t){e.state("login",{url:"/login",templateUrl:"views/login/login.html",controller:"LoginController"}).state("checkin",{url:"/checkin",templateUrl:"views/checkin/checkin.html"})}]),angular.module("checkin").factory("AuthService",["$q","$http","$rootScope","$state","Session",function(e,t,n,o,r){function l(e){return e.data}function c(t){return console.log("auth success",t),r.create(t.token,t.user),e(function(e){e(t.user)})}function i(t,n){return console.log("auth fail",t),o.go("login"),e(function(e,n){n(t)})}var u={};return u.loginWithPassword=function(e,n){return t.post("auth/login",{email:e,password:n}).then(l,l).then(c,i)},u.loginWithToken=function(e){return console.warn("Not actually sure if this works yet!"),t.post("auth/login",{token:e}).then(l).then(c,function(){400===status&&r.destroy().then(i)})},u}]),angular.module("checkin").service("Session",["$rootScope","$window","$q",function(e,t,n){this.create=function(n,o){t.localStorage.jwt=n,t.localStorage.userId=o._id,t.localStorage.currentUser=JSON.stringify(o),e.currentUser=o},this.destroy=function(){return delete t.localStorage.jwt,delete t.localStorage.userId,delete t.localStorage.currentUser,e.currentUser=null,n(function(e,t){e()})},this.getToken=function(){return t.localStorage.jwt},this.getUserId=function(){return t.localStorage.userId},this.getUser=function(){return JSON.parse(t.localStorage.currentUser)}}]),angular.module("checkin").controller("LoginController",["$scope","AuthService",function(e,t){function n(e){console.log("success",e)}function o(e){console.log("failure",e)}e.login=function(){t.loginWithPassword(e.email,e.password).then(n,o)}}]),angular.module("checkin").constant("SERVER_URL",{BASE_URL:"https://apply.hackgt.com/"});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInJvdXRlcy5qcyIsImF1dGgvQXV0aFNlcnZpY2UuanMiLCJzZXNzaW9uL1Nlc3Npb24uanMiLCJsb2dpbi9sb2dpbkNvbnRyb2xsZXIuanMiLCJjb25maWcuanMiXSwibmFtZXMiOlsiYXBwIiwiYW5ndWxhciIsIm1vZHVsZSIsImNvbmZpZyIsIiRodHRwUHJvdmlkZXIiLCJTRVJWRVJfVVJMIiwiZGVmYXVsdHMiLCJoZWFkZXJzIiwiY29tbW9uIiwiaW50ZXJjZXB0b3JzIiwicHVzaCIsInJlcXVlc3QiLCJ1cmwiLCJpbmRleE9mIiwiQkFTRV9VUkwiLCJjb25zb2xlIiwibG9nIiwiJHN0YXRlUHJvdmlkZXIiLCIkdXJsUm91dGVyUHJvdmlkZXIiLCJzdGF0ZSIsInRlbXBsYXRlVXJsIiwiY29udHJvbGxlciIsImZhY3RvcnkiLCIkcSIsIiRodHRwIiwiJHJvb3RTY29wZSIsIiRzdGF0ZSIsIlNlc3Npb24iLCJnZXRSZXNwb25zZURhdGEiLCJyZXNwb25zZSIsImRhdGEiLCJsb2dpblN1Y2Nlc3MiLCJjcmVhdGUiLCJ0b2tlbiIsInVzZXIiLCJyZXNvbHZlIiwibG9naW5GYWlsdXJlIiwiY2FsbGJhY2siLCJnbyIsInJlamVjdCIsImF1dGhTZXJ2aWNlIiwibG9naW5XaXRoUGFzc3dvcmQiLCJlbWFpbCIsInBhc3N3b3JkIiwicG9zdCIsInRoZW4iLCJsb2dpbldpdGhUb2tlbiIsIndhcm4iLCJzdGF0dXMiLCJkZXN0cm95Iiwic2VydmljZSIsIiR3aW5kb3ciLCJ0aGlzIiwibG9jYWxTdG9yYWdlIiwiand0IiwidXNlcklkIiwiX2lkIiwiY3VycmVudFVzZXIiLCJKU09OIiwic3RyaW5naWZ5IiwiZ2V0VG9rZW4iLCJnZXRVc2VySWQiLCJnZXRVc2VyIiwicGFyc2UiLCIkc2NvcGUiLCJBdXRoU2VydmljZSIsIm9uU3VjY2VzcyIsIm9uRmFpbHVyZSIsImxvZ2luIiwiY29uc3RhbnQiXSwibWFwcGluZ3MiOiJBQUFBLEdBQUFBLEtBQUFD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bGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2NoZWNraW4nLCBbXG4gICd1aS5yb3V0ZXInLFxuXSk7XG5cbmFwcC5jb25maWcoW1xuICAnJGh0dHBQcm92aWRlcicsXG4gICdTRVJWRVJfVVJMJyxcbiAgZnVuY3Rpb24oJGh0dHBQcm92aWRlciwgU0VSVkVSX1VSTCkge1xuICAgICRodHRwUHJvdmlkZXIuZGVmYXVsdHMuaGVhZGVycy5jb21tb25bJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbiddID0gJyonO1xuXG4gICAgLy8gYWRkIHJvb3QgdXJsIHRvIGFsbCBhcGkgYW5kIGF1dGggcmVxdWVzdHNcbiAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVxdWVzdDogZnVuY3Rpb24oY29uZmlnKSB7XG4gICAgICAgICAgaWYgKGNvbmZpZy51cmwuaW5kZXhPZignYXBpLycpID09PSAwIHx8IGNvbmZpZy51cmwuaW5kZXhPZignYXV0aC8nKSA9PT0gMCkge1xuICAgICAgICAgICAgY29uZmlnLnVybCA9IFNFUlZFUl9VUkwuQkFTRV9VUkwgKyBjb25maWcudXJsO1xuICAgICAgICAgICAgY29uZmlnLmhlYWRlcnNbJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbiddID0gJyonO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zb2xlLmxvZyhjb25maWcpO1xuICAgICAgICAgIHJldHVybiBjb25maWc7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSk7XG4gIH1cbl0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ2NoZWNraW4nKVxuICAuY29uZmlnKFtcbiAgICAnJHN0YXRlUHJvdmlkZXInLFxuICAgICckdXJsUm91dGVyUHJvdmlkZXInLFxuICAgIGZ1bmN0aW9uKFxuICAgICAgJHN0YXRlUHJvdmlkZXIsXG4gICAgICAkdXJsUm91dGVyUHJvdmlkZXIpIHtcbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgICAgICAuc3RhdGUoJ2xvZ2luJywge1xuICAgICAgICAgICAgdXJsOiAnL2xvZ2luJyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcInZpZXdzL2xvZ2luL2xvZ2luLmh0bWxcIixcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdMb2dpbkNvbnRyb2xsZXInLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLnN0YXRlKCdjaGVja2luJywge1xuICAgICAgICAgICAgdXJsOiAnL2NoZWNraW4nLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9jaGVja2luL2NoZWNraW4uaHRtbCcsXG4gICAgICAgICAgfSk7XG4gICAgfVxuICBdKTtcbiIsImFuZ3VsYXIubW9kdWxlKCdjaGVja2luJylcbiAgLmZhY3RvcnkoJ0F1dGhTZXJ2aWNlJywgW1xuICAgICckcScsXG4gICAgJyRodHRwJyxcbiAgICAnJHJvb3RTY29wZScsXG4gICAgJyRzdGF0ZScsXG4gICAgJ1Nlc3Npb24nLFxuICAgIGZ1bmN0aW9uKCRxLCAkaHR0cCwgJHJvb3RTY29wZSwgJHN0YXRlLCBTZXNzaW9uKSB7XG4gICAgICB2YXIgYXV0aFNlcnZpY2UgPSB7fTtcblxuICAgICAgZnVuY3Rpb24gZ2V0UmVzcG9uc2VEYXRhKHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBsb2dpblN1Y2Nlc3MoZGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZygnYXV0aCBzdWNjZXNzJywgZGF0YSk7XG4gICAgICAgIFNlc3Npb24uY3JlYXRlKGRhdGEudG9rZW4sIGRhdGEudXNlcik7XG4gICAgICAgIHJldHVybiAkcShmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICAgICAgcmVzb2x2ZShkYXRhLnVzZXIpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gbG9naW5GYWlsdXJlKGRhdGEsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdhdXRoIGZhaWwnLCBkYXRhKTtcbiAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xuICAgICAgICByZXR1cm4gJHEoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgcmVqZWN0KGRhdGEpO1xuICAgICAgICB9KTtcblxuICAgICAgfVxuXG4gICAgICBhdXRoU2VydmljZS5sb2dpbldpdGhQYXNzd29yZCA9IGZ1bmN0aW9uKGVtYWlsLCBwYXNzd29yZCkge1xuICAgICAgICByZXR1cm4gJGh0dHBcbiAgICAgICAgICAucG9zdCgnYXV0aC9sb2dpbicsIHtcbiAgICAgICAgICAgIGVtYWlsOiBlbWFpbCxcbiAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZCxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC50aGVuKGdldFJlc3BvbnNlRGF0YSwgZ2V0UmVzcG9uc2VEYXRhKVxuICAgICAgICAgIC50aGVuKGxvZ2luU3VjY2VzcywgbG9naW5GYWlsdXJlKTtcbiAgICAgIH07XG5cbiAgICAgIC8vIFRPRE8gdW5zdXJlIGlmIHRoaXMgd29ya3MhXG4gICAgICBhdXRoU2VydmljZS5sb2dpbldpdGhUb2tlbiA9IGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIk5vdCBhY3R1YWxseSBzdXJlIGlmIHRoaXMgd29ya3MgeWV0IVwiKTtcbiAgICAgICAgcmV0dXJuICRodHRwXG4gICAgICAgICAgLnBvc3QoJ2F1dGgvbG9naW4nLCB7XG4gICAgICAgICAgICB0b2tlbjogdG9rZW5cbiAgICAgICAgICB9KVxuICAgICAgICAgIC50aGVuKGdldFJlc3BvbnNlRGF0YSlcbiAgICAgICAgICAudGhlbihsb2dpblN1Y2Nlc3MsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gNDAwKSB7XG4gICAgICAgICAgICAgIFNlc3Npb24uZGVzdHJveSgpLnRoZW4obG9naW5GYWlsdXJlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBhdXRoU2VydmljZTtcbiAgICB9XG4gIF0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ2NoZWNraW4nKVxuICAuc2VydmljZSgnU2Vzc2lvbicsIFtcbiAgICAnJHJvb3RTY29wZScsXG4gICAgJyR3aW5kb3cnLFxuICAgICckcScsXG4gICAgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHdpbmRvdywgJHEpe1xuICAgICAgdGhpcy5jcmVhdGUgPSBmdW5jdGlvbih0b2tlbiwgdXNlcil7XG4gICAgICAgICR3aW5kb3cubG9jYWxTdG9yYWdlLmp3dCA9IHRva2VuO1xuICAgICAgICAkd2luZG93LmxvY2FsU3RvcmFnZS51c2VySWQgPSB1c2VyLl9pZDtcbiAgICAgICAgJHdpbmRvdy5sb2NhbFN0b3JhZ2UuY3VycmVudFVzZXIgPSBKU09OLnN0cmluZ2lmeSh1c2VyKTtcbiAgICAgICAgJHJvb3RTY29wZS5jdXJyZW50VXNlciA9IHVzZXI7XG4gICAgICB9O1xuXG4gICAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbigpe1xuICAgICAgICBkZWxldGUgJHdpbmRvdy5sb2NhbFN0b3JhZ2Uuand0O1xuICAgICAgICBkZWxldGUgJHdpbmRvdy5sb2NhbFN0b3JhZ2UudXNlcklkO1xuICAgICAgICBkZWxldGUgJHdpbmRvdy5sb2NhbFN0b3JhZ2UuY3VycmVudFVzZXI7XG4gICAgICAgICRyb290U2NvcGUuY3VycmVudFVzZXIgPSBudWxsO1xuICAgICAgICByZXR1cm4gJHEoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuZ2V0VG9rZW4gPSBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gJHdpbmRvdy5sb2NhbFN0b3JhZ2Uuand0O1xuICAgICAgfTtcblxuICAgICAgdGhpcy5nZXRVc2VySWQgPSBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gJHdpbmRvdy5sb2NhbFN0b3JhZ2UudXNlcklkO1xuICAgICAgfTtcblxuICAgICAgdGhpcy5nZXRVc2VyID0gZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoJHdpbmRvdy5sb2NhbFN0b3JhZ2UuY3VycmVudFVzZXIpO1xuICAgICAgfTtcbiAgfV0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ2NoZWNraW4nKVxuICAuY29udHJvbGxlcignTG9naW5Db250cm9sbGVyJywgW1xuICAgICckc2NvcGUnLFxuICAgICdBdXRoU2VydmljZScsXG4gICAgZnVuY3Rpb24oJHNjb3BlLCBBdXRoU2VydmljZSkge1xuXG4gICAgICBmdW5jdGlvbiBvblN1Y2Nlc3MoZGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZygnc3VjY2VzcycsIGRhdGEpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBvbkZhaWx1cmUoZGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZygnZmFpbHVyZScsIGRhdGEpO1xuICAgICAgfVxuXG4gICAgICAkc2NvcGUubG9naW4gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgQXV0aFNlcnZpY2UubG9naW5XaXRoUGFzc3dvcmQoXG4gICAgICAgICAgJHNjb3BlLmVtYWlsLCAkc2NvcGUucGFzc3dvcmRcbiAgICAgICAgKS50aGVuKG9uU3VjY2Vzcywgb25GYWlsdXJlKTtcbiAgICAgIH07XG4gICAgfVxuICBdKTtcbiIsIi8qKlxuICogSGVyZSBsYXkgdGhlIGJhc2UgdXJscyB1c2VkIGluIHRoZSBodHRwIHVybCBpbmplY3RvclxuICovXG5hbmd1bGFyLm1vZHVsZSgnY2hlY2tpbicpLmNvbnN0YW50KCdTRVJWRVJfVVJMJywge1xuICBCQVNFX1VSTDogICdodHRwczovL2FwcGx5LmhhY2tndC5jb20vJyxcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9