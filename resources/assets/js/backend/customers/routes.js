(function(angular, undefined) {
	'use strict';

	var modules = [
		'ngRoute', 
	];

	angular.module('app.customers.routes', modules)

	.config(['$routeProvider', function($routeProvider) 
	{
		var path = '/partials/backend/customers/';

		$routeProvider
			.when('/customers', {
				templateUrl: path + 'index.html',
				controller: 'CustomerListCtrl', 
			})
			.when('/customers/create', {
				templateUrl: path + 'create.html',
				controller: 'CustomerCreateCtrl', 
			})
			.when('/customers/:id', {
				templateUrl: path + 'edit.html',
				controller: 'CustomerEditCtrl', 
			})
			;
	}])
	;
})(angular);