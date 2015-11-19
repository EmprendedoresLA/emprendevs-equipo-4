(function(angular, undefined) {
	'use strict';
	
	var modules = [];
	
	angular.module('app.experiences.models', modules)

	.factory('Experience', [
		function()
		{
			function Experience(data)
			{
				this.id = null;
				this.name = null;
				this.email = null;
				this.phone = null;

				if (data) {
					angular.extend(this, data);
				}
			}

			return Experience;
		}
	])

	.service('ExperienceService', [
		'$q', 'HttpService', 'Experience', 
		function ($q, HttpService, Experience)
		{
			var url = 'experiences';

			return {
				blank: function() {
					var deferred = $q.defer();

					var experience = new Experience();

					deferred.resolve(experience);

					return deferred.promise;
				}, 
				findAll: function(data) 
				{
					var deferred = $q.defer();

					HttpService.get(url)
						.success(function(resp) 
						{
							var experiences = []
								, count = resp.experiences.length;

							for (var i = 0; i < count; i++)
							{
								experiences.push(new Experience(resp.experiences[i]));
							}

							deferred.resolve(experiences);
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
							var experience = new Experience(resp.experience);

							deferred.resolve(experience);
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
						HttpService.put(url + '/' + data.id, {experience: data})
							.success(function(resp) 
							{
								var experience = new Experience(resp.experience);
								
								deferred.resolve(experience);
							})
							.error(function(resp) 
							{
								deferred.reject(resp.error);
							});
					}
					else
					{
						HttpService.post(url, {experience: data})
							.success(function(resp) 
							{
								var experience = new Experience(resp.experience);

								deferred.resolve(experience);
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