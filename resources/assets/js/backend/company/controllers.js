(function(angular, undefined) {
	'use strict';
	
	var modules = [
		'app.company.models'
	];
	
	angular.module('app.company.controllers', modules)

	.controller('CompanyEditCtrl', [
		'$scope', 'CompanyService', '$routeParams', '$modal', '$location', 
		function($scope, CompanyService, $routeParams, $modal, $location)
		{
			function _getCompany(id)
			{
				CompanyService.find({id: id}).then(function(company) {
					$scope.fd.company = company;
				}, function(resp) {
					$location.path('/company');
				});
			}

			function _save(data)
			{
				var fd = angular.copy(data);

				$scope.validate = true;

				if (!fd.company.name && !fd.company.email) {
					return false;
				}

				$scope.saving = true;

				CompanyService.save(fd.company).then(function(company) {
					$scope.notify('Los datos ha sido actualiados.');
				}, function(resp) {
					$scope.saving = false;
					$scope.form.$setDirty();
				});
			}

			function _init()
			{
				$scope.fd = {
					company: {}
				};

				_getCompany($routeParams.id);

				$scope.save = _save;
			}

			_init();
		}
	])
	;
})(angular);