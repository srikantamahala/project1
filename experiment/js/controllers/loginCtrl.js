
myApp.controller('loginCtrl', ['$scope', '$rootScope', 'loginService', '$location', '$cookies',function($scope, $rootScope, loginService, $location, $cookies){
	$scope.username="";
	$scope.password="";
	$scope.submit=function(){
		loginService.getAuthenticate($scope.username, $scope.password).then(function(response){
			if(response=="valid"){
				localStorage.setItem("token", "authtoken");
				/*var favoriteCookie = $cookies.auth;
				$cookies.auth = "thicookie";*/
				//$cookies.put("auth", response);
				$location.path('/home');
			} else{
				alert("please enter correct uname and password");
			}
		})
	}

}]);

myApp.factory('$exceptionHandler', function() {
    'use strict';
    return function(e, cause) {
        console.log('Execption caught in $exceptionHandler. Message: ' + e.message +
        ' \ncaused by: ' + cause);
    };
});