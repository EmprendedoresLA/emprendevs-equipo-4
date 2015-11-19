(function(angular, undefined) {
	'use strict';
	
	var modules = [];
	
	angular.module('app.company.models', modules)

	.factory('Company', [
		function()
		{
			function Company(data)
			{
				this.id = null;
				this.name = null;
				this.description = null;
				this.website = null;
				this.email = null;
				this.phone = null;

				if (data) {
					angular.extend(this, data);
				}
			}

			return Company;
		}
	])

	.service('CompanyService', [
		'$q', 'HttpService', 'Company', 
		function ($q, HttpService, Company)
		{
			var url = 'company';

			return {
				find: function(data) 
				{
					var deferred = $q.defer();

					HttpService.get(url)
						.success(function(resp) 
						{
							var company = new Company(resp.company);

							deferred.resolve(company);
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
						HttpService.put(url + '/' + data.id, {company: data})
							.success(function(resp) 
							{
								var company = new Company(resp.company);
								
								deferred.resolve(company);
							})
							.error(function(resp) 
							{
								deferred.reject(resp.error);
							});
					}
					else
					{
						HttpService.post(url, {company: data})
							.success(function(resp) 
							{
								var company = new Company(resp.company);

								deferred.resolve(company);
							})
							.error(function(resp) 
							{
								deferred.reject(resp.error);
							});
					}

					return deferred.promise;
				}
			};
		}
	])
	;

})(angular);