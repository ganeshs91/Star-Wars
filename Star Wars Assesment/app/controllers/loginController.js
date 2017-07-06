app.controller('loginCtrl', ['$scope', '$http', '$location', function($scope, $http, $location){
	$scope.errorMsgContainer = false;

	if(localStorage.starWarsUser){
		$location.url('/planets');
	}

	$scope.login = function(){
	   $http.get("http://swapi.co/api/people/?search="+$scope.user).then(function(response){
	   		if(response.data.count !== 0){
	   			$scope.person = response.data.results[0];
                if(($scope.user == $scope.person.name) && ($scope.password == $scope.person.birth_year)){
                	if(typeof(Storage) !== "undefined"){
	   					localStorage.starWarsUser = $scope.person.name;	
	   				}
                	$location.url('/planets');
                }else{
                	$scope.errorMsgContainer = true;
                	$scope.errorMsg = "Invalid Login. Please try again.";
                }
			}else{
				$scope.errorMsgContainer = true;
				$scope.errorMsg = "Couldn't find you.";
			} 
	   }, function(err){
       		console.log("Error");
	   })
	}
}]);