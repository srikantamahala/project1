/*describe('calculator', function () {
		
	beforeEach(angular.mock.module('myApp', 'ngRoute'));

	var $controller;

	beforeEach(angular.mock.inject(function(_$controller_){
	  $controller = _$controller_;
	}));

	describe('sum', function () {
		it('1 + 1 should equal 2', function () {
			var $scope = {};
			var controller = $controller('CalculatorController', { $scope: $scope });
			expect($scope.colors[0]).toBe("red");
		});	
	});

});*/

// for(var i=0;i<ctrl.getAllProjects.length;i++){
// 	for(var j = 0; j<ctrl.getAllProjects[i].usersGroup.length;j++){
// 		for(var k = 0;k<ctrl.getAllProjects[i].usersGroup[j].userRoles.length;k++){
// 			if(ctrl.getAllProjects[i].usersGroup[j].userRoles[k].permissions.indexOf("VIEW_DASHBOARD") > -1){
// 				//do what u want
// 			}
// 		}
// 	}
// }

describe('calculator', function () {
	var $rootScope,
	    $scope, 
	    controller,
	    mockloginService = {
	    	setColor: function(){
	    		return "thisdata"
	    	}
	    }


	beforeEach(function(){
        module('ngRoute');
		module('myApp', function($provide){
            $provide.value('loginService', mockloginService);
		})
		inject(function($injector){
			$rootScope = $injector.get('$rootScope');
			$scope = $rootScope.$new();
			controller = $injector.get('$controller')('homeCtrl', {$scope: $scope})

		});
	});

	describe('just for checking', function(){
		it('1 + 1 should equal 2', function () {
			expect($scope.colors[0]).toBe("red");
		});
		it('should return correct data from service', function(){
			expect($scope.getdataFromService).toBe("thisdata");
		})

	})
})
