(function(angular, undefined) {
	'use strict';
	
	var modules = [];
	
	angular.module('app.customers.models', modules)

	.factory('Customer', [
		function()
		{
			function Customer(data)
			{
				this.id = null;
				this.name = null;
				this.email = null;
				this.phone = null;

				if (data) {
					angular.extend(this, data);
				}
			}

			return Customer;
		}
	])

	.service('CustomerService', [
		'$q', 'HttpService', 'Customer', 
		function ($q, HttpService, Customer)
		{
			var url = 'customers';

			return {
				blank: function() {
					var deferred = $q.defer();

					var customer = new Customer();

					deferred.resolve(customer);

					return deferred.promise;
				}, 
				findAll: function(data) 
				{
					var deferred = $q.defer();

					HttpService.get(url)
						.success(function(resp) 
						{
							var customers = []
								, count = resp.customers.length;

							for (var i = 0; i < count; i++)
							{
								customers.push(new Customer(resp.customers[i]));
							}

							deferred.resolve(customers);
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
							var customer = new Customer(resp.customer);

							deferred.resolve(customer);
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
						HttpService.put(url + '/' + data.id, {customer: data})
							.success(function(resp) 
							{
								var customer = new Customer(resp.customer);
								
								deferred.resolve(customer);
							})
							.error(function(resp) 
							{
								deferred.reject(resp.error);
							});
					}
					else
					{
						HttpService.post(url, {customer: data})
							.success(function(resp) 
							{
								var customer = new Customer(resp.customer);

								deferred.resolve(customer);
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