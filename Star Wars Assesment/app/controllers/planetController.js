app.controller('planetCtrl', ['$scope', '$http', '$location', '$interval', function($scope, $http, $location, $interval){
	var searchCount;

	if(!localStorage.starWarsUser){
		$location.url('/login');
	}

	$scope.logUser = localStorage.starWarsUser;
        
	// Planet Search Limitation
	if(localStorage.starWarsUser != "Luke Skywalker"){
		searchCount = 0;
		$interval(searchValidation, 60000);	
	}

	function searchValidation() {
		searchCount = 0;
		$scope.dsblSearchBtn = false;
	}
 
	$scope.searchPlanet = function() {
	  if($scope.planet != ""){
		  if(localStorage.starWarsUser != "Luke Skywalker") {
			   if(searchCount <= 14) {
			      searchCount += 1;	
			      planetSearchService();
			   }else {
				  alert("You crossed the limit. So you shouldn't able to make more than 15 searches in a minute.");
				  $scope.dsblSearchBtn = true;
			   }
		  }else {
			  planetSearchService();
		  }	
	   }
	}

	function planetSearchService() {
   	  $http.get("http://swapi.co/api/planets/?search="+$scope.planet).then(function(response){
		if(response.data.count !== 0){
		    // Get max population			
			function getPopulations(planet, index){
				return (planet.population && (planet.population != "unknown") ? Number(planet.population) : 0);
			}
			$scope.populations = response.data.results.map(getPopulations);
			$scope.populations.sort(function(a, b){ return b-a; });
			$scope.maxPopulation = $scope.populations[0];

			// Convert to percent by using max population
			function convertToPercent(planet, index){
				if(planet.population && planet.population != "unknown"){
					planet.populationPercent = Math.round((Number(planet.population) / $scope.maxPopulation) * 100);
				}else{
					planet.populationPercent = 0;
				}
				return planet;
			}
			$scope.planets = response.data.results.map(convertToPercent);
		}else{
			$scope.planets = [ ];
		} 
	   }, function(err){
       		console.log("Error: Planet Search Service");
	   })
	}

	$scope.logOut = function() {
		localStorage.removeItem('starWarsUser');
		$location.url('/login');
	}
}]);
