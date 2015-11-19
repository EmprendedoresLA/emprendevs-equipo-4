(function(angular, undefined) {
	'use strict';
	
	var modules = [
		'app.customers.routes', 
		'app.customers.controllers', 
	];

	angular.module('app.customers', modules)
	;
})(angular);