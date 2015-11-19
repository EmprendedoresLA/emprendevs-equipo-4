(function(angular, undefined) {
	'use strict';

	var modules = [
		'ngRoute', 
	];

	angular.module('app.company.routes', modules)

	.config(['$routeProvider', function($routeProvider) 
	{
		var path = '/partials/backend/company/';

		$routeProvider
			.when('/company', {
				templateUrl: path + 'edit.html',
				controller: 'CompanyEditCtrl', 
			})
			;
	}])
	;
})(angular);