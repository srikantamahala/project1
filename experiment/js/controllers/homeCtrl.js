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

