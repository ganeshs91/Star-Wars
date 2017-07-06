app.directive('planetWidget', function(){
	return {
		restrict: 'E',
		scope: {
			'planet': '=',
		    'maxPopulation': '=' 
		},
		templateUrl: './partials/planetWidget.html'
	}
});