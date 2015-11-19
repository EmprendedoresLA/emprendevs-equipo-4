(function(angular, undefined) {
	'use strict';
	
	var modules = [
		'app.customers.models'
	];
	
	angular.module('app.customers.controllers', modules)

	.controller('CustomerListCtrl', [
		'$scope', 'CustomerService', 
		function($scope, CustomerService)
		{
			function _getCustomers()
			{
				$scope.getting = true;
				
				CustomerService.findAll().then(function(customers) {
					$scope.customers = customers;
					$scope.getting = false;
				}, function(resp) {
					$scope.getting = false;
				});
			}

			function _init()
			{
				$scope.getCustomers = _getCustomers;

				_getCustomers();
			}

			_init();
		}
	])

	.controller('CustomerCreateCtrl', [
		'$scope', '$location', 'CustomerService', 
		function($scope, $location, CustomerService)
		{
			function _save(data)
			{
				var fd = angular.copy(data);

				$scope.validate = true;

				if (!fd.customer.name && !fd.customer.phone) {
					return false;
				}

				$scope.saving = true;

				CustomerService.save(fd.customer).then(function(customer) {
					$scope.notify('El cliente ha sido creado.');
					$location.path('/customers/' + customer.id);
				}, function(resp) {
					$scope.saving = false;
					$scope.form.$setDirty();
				});
			}

			function _init()
			{
				$scope.fd = {};

				CustomerService.blank().then(function(resp) {
					$scope.fd.customer = resp;
				});

				$scope.save = _save;
			}

			_init();
		}
	])

	.controller('CustomerEditCtrl', [
		'$scope', 'CustomerService', '$routeParams', '$modal', '$location', 
		function($scope, CustomerService, $routeParams, $modal, $location)
		{
			function _getCustomer(id)
			{
				CustomerService.find({id: id}).then(function(customer) {
					$scope.fd.customer = customer;
				}, function(resp) {
					$location.path('/customers');
				});
			}

			function _save(data)
			{
				var fd = angular.copy(data);

				$scope.validate = true;

				if (!fd.customer.name && !fd.customer.email) {
					return false;
				}

				$scope.saving = true;

				CustomerService.save(fd.customer).then(function(customer) {
					$scope.notify('El cliente ha sido actualiado.');
				}, function(resp) {
					$scope.saving = false;
					$scope.form.$setDirty();
				});
			}

			function _deleteModal(customer)
			{
				var scope = $scope.$new();
				scope.customer = customer;

				var deleteModal = $modal({
					scope: scope, 
					title: 'Eliminar cliente', 
					templateUrl: '/partials/backend/core/delete-modal.html', 
					controller: 'CustomerDeleteCtrl', 
					show: true, 
				});
			}

			function _init()
			{
				$scope.fd = {
					customer: {}
				};

				_getCustomer($routeParams.id);

				$scope.save = _save;
				$scope.confirmDelete = _deleteModal;
			}

			_init();
		}
	])

	.controller('CustomerDeleteCtrl', [
		'$scope', 'CustomerService', '$location', 
		function($scope, CustomerService, $location)
		{
			function _delete()
			{
				$scope.deleting = true;
				CustomerService.destroy({id: $scope.customer.id}).then(function(resp) {
					$scope.$hide();
					$scope.notify('El cliente ha sido eliminado.');
					$scope.deleting = false;
					$location.path('/customers');
				}, function(resp) {
					$scope.deleting = false;
				});
			}

			function _init()
			{
				$scope.delete = _delete;
			}

			_init();
		}
	])

	;
})(angular);