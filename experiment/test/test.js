describe("test", function(){
	it("should be true", function(){
		expect(true).toBeTruthy();
	})
})
describe("test 1", function(){
	it("should be true", function(){
		expect(true).toBeTruthy();
	})
})
var loginService = {}
var $httpBackend;


describe('login service', function(){
    var ram = "ram"
	beforeEach(angular.mock.module('myApp'));
	beforeEach(angular.mock.inject(function(_loginService_, _$httpBackend_){
       loginService = _loginService_;
       $httpBackend =  _$httpBackend_;
	}))

	it("should return true if put ram", function(){

		//expect(loginService.setForTest("ram").toEqual(ram))
          expect(loginService.setForTest("ram")).toEqual(ram);
	})

	it("should show fake request", function(){
		var response;
		var fakeData = {"ram":"hari"}
		$httpBackend.when("GET", "../../source/data1.json")
		   .respond(200, fakeData);
		console.log(loginService.getData);

		loginService.getData().then(function(data){
            response = data.data;
		})

		$httpBackend.flush();

		expect(response).toEqual(fakeData);
	})
})

