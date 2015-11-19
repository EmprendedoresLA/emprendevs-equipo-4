(function(angular, undefined)
{
	var modules = [
		'app.dashboard.controllers', 
		'chart.js', 
	];

	angular.module('app.dashboard', modules)
	
	.config(['$routeProvider', 
		function($routeProvider) {
			$routeProvider.
				when('/dashboard', {
					templateUrl: '/partials/backend/dashboard/index.html',
					controller: 'DashboardCtrl', 
				});
		}
		])
	;
})(angular);