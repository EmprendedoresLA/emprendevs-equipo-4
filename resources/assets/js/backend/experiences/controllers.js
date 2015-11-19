(function(angular, undefined) {
	'use strict';
	
	var modules = [
		'app.experiences.models'
	];
	
	angular.module('app.experiences.controllers', modules)

	.controller('ExperienceListCtrl', [
		'$scope', 'ExperienceService', 
		function($scope, ExperienceService)
		{
			function _getExperiences()
			{
				$scope.getting = true;
				
				ExperienceService.findAll().then(function(experiences) {
					$scope.experiences = experiences;
					$scope.getting = false;
				}, function(resp) {
					$scope.getting = false;
				});
			}

			function _init()
			{
				$scope.getExperiences = _getExperiences;

				_getExperiences();
			}

			_init();
		}
	])

	.controller('ExperienceCreateCtrl', [
		'$scope', '$location', 'ExperienceService', 
		function($scope, $location, ExperienceService)
		{
			function _save(data)
			{
				var fd = angular.copy(data);

				$scope.validate = true;

				if (!fd.experience.name && !fd.experience.phone) {
					return false;
				}

				$scope.saving = true;

				ExperienceService.save(fd.experience).then(function(experience) {
					$scope.notify('La experiencia ha sido creada.');
					$location.path('/experiences/' + experience.id);
				}, function(resp) {
					$scope.saving = false;
					$scope.form.$setDirty();
				});
			}

			function _init()
			{
				$scope.fd = {};

				ExperienceService.blank().then(function(resp) {
					$scope.fd.experience = resp;
				});

				$scope.save = _save;
			}

			_init();
		}
	])

	.controller('ExperienceEditCtrl', [
		'$scope', 'ExperienceService', '$routeParams', '$modal', '$location', 
		function($scope, ExperienceService, $routeParams, $modal, $location)
		{
			function _getExperience(id)
			{
				ExperienceService.find({id: id}).then(function(experience) {
					$scope.fd.experience = experience;
				}, function(resp) {
					$location.path('/experiences');
				});
			}

			function _save(data)
			{
				var fd = angular.copy(data);

				$scope.validate = true;

				if (!fd.experience.name && !fd.experience.email) {
					return false;
				}

				$scope.saving = true;

				ExperienceService.save(fd.experience).then(function(experience) {
					$scope.notify('La experiencia ha sido actualiada.');
				}, function(resp) {
					$scope.saving = false;
					$scope.form.$setDirty();
				});
			}

			function _deleteModal(experience)
			{
				var scope = $scope.$new();
				scope.experience = experience;

				var deleteModal = $modal({
					scope: scope, 
					title: 'Eliminar experiencia', 
					templateUrl: '/partials/backend/core/delete-modal.html', 
					controller: 'ExperienceDeleteCtrl', 
					show: true, 
				});
			}

			function _init()
			{
				$scope.fd = {
					experience: {}
				};

				_getExperience($routeParams.id);

				$scope.save = _save;
				$scope.confirmDelete = _deleteModal;
			}

			_init();
		}
	])

	.controller('ExperienceDeleteCtrl', [
		'$scope', 'ExperienceService', '$location', 
		function($scope, ExperienceService, $location)
		{
			function _delete()
			{
				$scope.deleting = true;
				ExperienceService.destroy({id: $scope.experience.id}).then(function(resp) {
					$scope.$hide();
					$scope.notify('La experiencia ha sido eliminada.');
					$scope.deleting = false;
					$location.path('/experiences');
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