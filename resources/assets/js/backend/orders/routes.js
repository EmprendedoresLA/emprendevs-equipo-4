(function(angular, undefined) {
	'use strict';

	var modules = [
		'ngRoute', 
	];

	angular.module('app.orders.routes', modules)

	.config(['$routeProvider', function($routeProvider) 
	{
		var path = '/partials/backend/orders/';

		$routeProvider
			.when('/orders', {
				templateUrl: path + 'index.html',
				controller: 'OrderListCtrl', 
			})
			;
	}])
	;
})(angular);