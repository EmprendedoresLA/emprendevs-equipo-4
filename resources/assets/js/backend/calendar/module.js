(function(angular, undefined) {
	'use strict';
	
	var modules = [
		'ui.calendar', 
		'app.calendar.routes', 
		'app.calendar.controllers', 
	];

	angular.module('app.calendar', modules)
	
	;
})(angular);