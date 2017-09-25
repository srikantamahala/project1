function ram(){
	this.a = "a";
	this.b = "b";
}
function hari(){
	this.h = "h";
	this.g = "g";
}
var myApp = angular.module('myApp', ['ngRoute', 'ngCookies', 'ui.router'])
/*myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });*/
   /* $routeProvider
    .when('/', {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
    })
    .when('/home',{
    	templateUrl: 'templates/home.html',
    	controller: 'homeCtrl',
        // resolve: {
        //    studentList: function($http){
        //       return $http.get("js/controllers/data.json").then(function(data){
        //           return data.data;
        //       })
        //    } 
        // }
    })
    .when('/sumurl/:a/:b',{
        templateUrl: 'templates/add.html',
        controller: 'addCtrl',
        resolve: {
            addition: function(loginService, $route){
                var x = parseInt($route.current.params.a);
                var y = parseInt($route.current.params.b);
               return loginService.addThis(x,y).then(function(data){
                    return data;
               })
            }
        }
    })
    .otherwise({
    	redirectTo: '/'
    });
}]);*/

myApp.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $urlRouterProvider){
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    $stateProvider.state('firstMessage', {
        url: '/first-message/{a}/{b}',
        templateUrl: 'templates/firstMessage.html',
        controller: 'firstCtrl'
    });
    $stateProvider.state('calc', {
        url: '/calc',
        templateUrl: 'templates/calc.html',
        controller: 'calcCtrl'
    });
    $stateProvider.state('add', {
        url: '/add/:a/:b',
        templateUrl: 'templates/add.html',
        controller: 'sumCtrl',
        resolve: {
            addResult: function(loginService, $stateParams){
                return loginService.addThis($stateParams.a , $stateParams.b);
            }
        }
    });
    $stateProvider.state('secondMessage', {
        url: '/second-message',
        templateUrl: 'templates/secondMessage.html',
        controller: 'secondCtrl',
        resolve: {
           studentList: function($http){
              return $http.get("js/controllers/data.json").then(function(data){
                  return data.data;
              })
           } 
        }
    });
    $stateProvider.state('route', {
        url: '/',
        template: '<h1>Hey u r on route plz click on anyone</h1>'
    });
    $stateProvider.state('noroute', {
        url: '*path',
        template: '<h1>hey u r going on a wrong router</h1>'
    });
    $urlRouterProvider.otherwise('/');

}])

myApp.run(['$rootScope','$location', 'loginService', function($rootScope, $location, loginService){
	$rootScope.$on("$routeChangeStart", function (event, next, current) {
		/*if(!localStorage.getItem("token")){
			$location.path('/')
		}*/
       /* if(!loginService.authenticate()){
            alert("not authenticated");
            $location.path('/');
        }*/
        $rootScope.isLoading = true;
        console.log("in location change start")

	})
    $rootScope.$on("$routeChangeSuccess", function (event, next, current) {
        $rootScope.isLoading = false;
        console.log("location change success")

    })

    $rootScope.$on("$stateChangeStart", function(){
        $rootScope.isLoading = true;
    })

     $rootScope.$on("$stateChangeSuccess", function(){
        $rootScope.isLoading = false;
    })
}]);
myApp.controller('firstCtrl',['$scope','$stateParams', function($scope, $stateParams){
	$scope.a = $stateParams.a;
	$scope.b = $stateParams.b;
}])
myApp.controller('homeCtrl', ['$scope', '$rootScope','loginService', '$location','$cookieStore' ,function($scope, $rootScope,loginService, $location, $cookieStore){
	$scope.logout = function(){
        localStorage.setItem("token","");
        //$cookieStore.remove("auth");
        $location.path('/');
	}
	$scope.colors = ["red", "green", "blue", "black"];
	$scope.$watch("myColor", function(data){
		loginService.setColor(data);
	});
	$scope.getdataFromService = loginService.setColor();
	//console.log("studentlist" +studentList);
	//$scope.myColor = localStorage.getItem("mycolor");
	$scope.a = 0;
	$scope.b = 0;
	$scope.submit = function(){
		//console.log($scope.a+$scope.b);
		$location.path('sumurl/'+$scope.a+'/'+$scope.b);
	}
	

}]);

myApp.controller('allColorCtrl',['$scope', function($scope){
	$scope.colors = [];
	this.red = function(){
		$scope.colors.push('red')
	}
	this.green = function(){
		$scope.colors.push('green');
	}
	this.blue = function(){
		$scope.colors.push('blue')
	}

}])
/*myApp.directive('allColor', function(){
	return {
		link: function(scope, ele, attrs){
            ele.on('click', function(){
            	console.log()
            })
		}
	}
})
myApp.directive('red', function(){
	return {
		require: 'allColorCtrl',
		link: function(){
            
		}
	}
})*/



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
myApp.factory('loginService',['$q', '$cookies', '$http', function($q, $cookies, $http){
	var loginObj = {}
	loginObj.getAuthenticate = function(uname,pwd){
		var deferred = $q.defer();
         if(uname == localStorage.getItem("username") && pwd == localStorage.getItem("password")){
         	deferred.resolve("valid");
         } else{
         	deferred.reject("invalid");
         }
         return deferred.promise;
	},

   loginObj.authenticate = function(){
      var favoriteCookie = $cookies["auth"];
      if(favoriteCookie){
         return true;
      } else {
         return false;
      }
   },

   loginObj.addThis =function(x,y){
      var deferred = $q.defer();
      setTimeout(function(){
         deferred.resolve(x+y); 
      },3000);
      
      return deferred.promise;
   },

   loginObj.setColor = function(){
       return "mydata";
   },

   loginObj.add = function(a,b){
      setTimeout(function(){
         return parseInt(a) + parseInt(b);
      },3000)
   },

   loginObj.setForTest = function(x){
      if(x == "ram"){
         return "ram";
      } else {
         return "hari";
      }
   },

   loginObj.getData = function(){
      return $http.get("../../source/data1.json")
   }


   /*loginObj.setColor = function(data){
      localStorage.setItem("mycolor", data);
   }*/
	return loginObj;

}])
myApp.controller('secondCtrl',['$scope','studentList', function($scope, studentList){
	$scope.students = studentList;
}]);

myApp.controller('calcCtrl',['$scope', '$state', function($scope, $state){

	$scope.a = 0;
	$scope.b = 0;
	$scope.doAdd = function(){

       $state.go('add',{
       	  a: $scope.a,
       	  b: $scope.b
       }) 
	}
}]);

myApp.controller('sumCtrl',['$scope', '$stateParams', '$state', 'addResult', function($scope, $stateParams, $state, addResult){
	
	/*if($stateParams.a){
		$scope.m = $stateParams.a;
	}

	if($stateParams.b){
	    $scope.n = $stateParams.b;
	}*/
	$scope.result = addResult;

	$scope.goBack = function(){
		$state.go('calc');
	}
	console.log($state.employee);

}])

myApp.directive("gridScreen", function(){
	return {
       //templateUrl: '../../templates/gridScreen.html',
       controller: function($scope){
       	 var titleList = [];
       	  this.getColumns = function(cols){
       	  	titleList.push(cols);
       	  	$scope.columns = titleList;
       	    console.log(titleList);
       	     console.log($scope.columns);
       	  }
       }
	}
})


myApp.directive("gridColumns", function(){
	return {
	   require: '^gridScreen',
      /* template: ['<h1>this is second</h1>',
                  '<p>this is second paragraph</p>',
                  '{{ ram }}'].join(''),*/
       controller: function($scope){
       	  
       },
       link: function(scope, ele, attrs, gridController){ 
          gridController.getColumns(attrs.title);

       }
	}
})


myApp.controller('addCtrl',['$scope', 'addition', function($scope, addition){
	    $scope.hari = "srikanta";
     	$scope.addition = addition;
}])
