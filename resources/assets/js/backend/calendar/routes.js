(function(angular, undefined) {
	'use strict';

	var modules = [
		'ngRoute', 
	];

	angular.module('app.calendar.routes', modules)

	.config(['$routeProvider', function($routeProvider) 
	{
		var path = '/partials/backend/calendar/';

		$routeProvider
			.when('/calendar', {
				templateUrl: path + 'index.html',
				controller: 'CalendarCtrl', 
			})
			;
	}])
	;
})(angular);