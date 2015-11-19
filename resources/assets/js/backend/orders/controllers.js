(function(angular, undefined) {
	'use strict';
	
	var modules = [
		'app.orders.models'
	];
	
	angular.module('app.orders.controllers', modules)

	.controller('OrderListCtrl', [
		'$scope', 'OrderService', 
		function($scope, OrderService)
		{
			function _getOrder()
			{
				$scope.getting = true;
				
				OrderService.findAll().then(function(orders) {
					$scope.orders = orders;
					$scope.getting = false;
				}, function(resp) {
					$scope.getting = false;
				});
			}

			function _init()
			{
				$scope.getOrder = _getOrder;

				_getOrder();
			}

			_init();
		}
	])
	;
})(angular);