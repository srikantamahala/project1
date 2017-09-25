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