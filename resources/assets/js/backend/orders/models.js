(function(angular, undefined) {
	'use strict';
	
	var modules = [];
	
	angular.module('app.orders.models', modules)

	.factory('Order', [
		function()
		{
			function Order(data)
			{
				this.id = null;
				this.name = null;
				this.email = null;
				this.phone = null;

				if (data) {
					angular.extend(this, data);
				}
			}

			return Order;
		}
	])

	.service('OrderService', [
		'$q', 'HttpService', 'Order', 
		function ($q, HttpService, Order)
		{
			var url = 'orders';

			return {
				blank: function() {
					var deferred = $q.defer();

					var order = new Order();

					deferred.resolve(order);

					return deferred.promise;
				}, 
				findAll: function(data) 
				{
					var deferred = $q.defer();

					HttpService.get(url)
						.success(function(resp) 
						{
							var orders = []
								, count = resp.orders.length;

							for (var i = 0; i < count; i++)
							{
								orders.push(new Order(resp.orders[i]));
							}

							deferred.resolve(orders);
						})
						.error(function(resp) 
						{
							deferred.reject(resp);
						});

					return deferred.promise;
				}, 
				find: function(data) 
				{
					var deferred = $q.defer();

					HttpService.get(url + '/' + data.id)
						.success(function(resp) 
						{
							var order = new Order(resp.order);

							deferred.resolve(order);
						})
						.error(function(resp) 
						{
							deferred.reject(resp);
						});

					return deferred.promise;
				}, 
				save: function(data) 
				{
					var deferred = $q.defer();

					if (data.id)
					{
						HttpService.put(url + '/' + data.id, {order: data})
							.success(function(resp) 
							{
								var order = new Order(resp.order);
								
								deferred.resolve(order);
							})
							.error(function(resp) 
							{
								deferred.reject(resp.error);
							});
					}
					else
					{
						HttpService.post(url, {order: data})
							.success(function(resp) 
							{
								var order = new Order(resp.order);

								deferred.resolve(order);
							})
							.error(function(resp) 
							{
								deferred.reject(resp.error);
							});
					}

					return deferred.promise;
				}, 
				destroy: function(data) {
					var deferred = $q.defer();

					HttpService.delete(url + '/' + data.id)
						.success(function(resp) {
							deferred.resolve(resp);
						})
						.error(function(resp) {
							deferred.reject(resp);
						});

					return deferred.promise;
				}, 
			};
		}
	])
	;

})(angular);