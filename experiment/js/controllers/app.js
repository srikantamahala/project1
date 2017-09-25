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