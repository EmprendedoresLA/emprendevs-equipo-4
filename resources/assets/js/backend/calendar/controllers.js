(function(angular, undefined) {
	'use strict';
	
	var modules = [
		// 'app.calendar.models'
	];
	
	angular.module('app.calendar.controllers', modules)

	.controller('CalendarCtrl', [
		'$scope', 
		function($scope)
		{
			function _getCalendar()
			{
				$scope.getting = true;
				
				CalendarService.findAll().then(function(calendar) {
					$scope.calendar = calendar;
					$scope.getting = false;
				}, function(resp) {
					$scope.getting = false;
				});
			}

			function _init()
			{
				$scope.eventSources = [
					// '/v1/calendar/backend'
				];
				// $scope.getCalendar = _getCalendar;

				// _getCalendar();
			}

			_init();
		}
	])
	;
})(angular);