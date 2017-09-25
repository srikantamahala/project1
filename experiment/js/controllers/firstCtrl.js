myApp.controller('firstCtrl',['$scope','$stateParams', function($scope, $stateParams){
	$scope.a = $stateParams.a;
	$scope.b = $stateParams.b;
}])