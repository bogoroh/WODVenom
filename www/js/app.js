var url = angular.module('url',['ngRoute','angular-momentjs','ui.bootstrap','firebase']);

url.config(['$routeProvider',function ($routeProvider){

	$routeProvider
	.when('/', {
		templateUrl: 'views/login.html'
	})
	.when('/admin', {
		templateUrl: 'views/adminHome.html',
		controller: 'adminCtrl',
	})
	.when('/admin/addwod', {
		templateUrl: 'views/addWod.html',
		controller: 'adminCtrl'
	})
	.when('/login', {
		templateUrl: 'views/login.html'
	})
	.when('/user', {
		templateUrl: 'views/userHome.html'
	})
	.when('/user/wod', {
		templateUrl: 'views/userWod.html',
		controller: 'homeCtrl'
	})
	.when('/user/submit/:id', {
		templateUrl: 'views/userSubmit.html',
		controller: 'submitCtrl'
	})
	.when('/user/bench', {
		templateUrl: 'views/userBenchmark.html',
		controller: 'homeCtrl'
	})
	.when('/user/leaderboards', {
		templateUrl: 'views/userLeader.html',
		controller: 'homeCtrl'
	})
}]);

/// =====================================================================================
/// 							URL filter
/// =====================================================================================

// Custom filter to slice the array that you get back from firebase
url.filter('slice', function() {
  return function(arr, start, end) {
    return (arr || []).slice(start, end);
  };
});