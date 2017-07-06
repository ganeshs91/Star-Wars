var app = angular.module("myStarWarsApp", ["ngRoute"]);	

app.controller('myStarWarsCtrl', ['$scope', '$http', function($scope){
	$scope.iframeHeight = window.innerHeight;
}]);
	