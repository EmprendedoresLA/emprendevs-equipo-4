(function(angular, undefined) {
	'use strict';

	var modules = [
		'ngRoute', 
	];

	angular.module('app.experiences.routes', modules)

	.config(['$routeProvider', function($routeProvider) 
	{
		var path = '/partials/backend/experiences/';

		$routeProvider
			.when('/experiences', {
				templateUrl: path + 'index.html',
				controller: 'ExperienceListCtrl', 
			})
			.when('/experiences/create', {
				templateUrl: path + 'create.html',
				controller: 'ExperienceCreateCtrl', 
			})
			.when('/experiences/:id', {
				templateUrl: path + 'edit.html',
				controller: 'ExperienceEditCtrl', 
			})
			;
	}])
	;
})(angular);