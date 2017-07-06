app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "./partials/login.html", 
        controller: "loginCtrl"
    })
    .when("/login", {
        templateUrl : "./partials/login.html",
        controller: "loginCtrl"
    })
    .when("/planets", {
        templateUrl : "./partials/planets.html",
        controller: "planetCtrl"
    }).
    otherwise("/");
});