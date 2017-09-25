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

