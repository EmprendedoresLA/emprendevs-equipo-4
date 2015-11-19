(function(angular, undefined)
{
	var modules = [];
	
	angular.module('app.dashboard.controllers', modules)
	
	.controller('DashboardCtrl', ['$scope', function($scope)
	{
		$scope.chart1 = {
			labels: ["10/11", "11/11", "12/11", "13/11", "14/11", "15/11", "16/11", "17/11", "18/11", "19/11", "20/11", "21/11", "22/11", "23/11", "24/11"], 
			series: ['Reservas'], 
			data: [
				[20, 21, 34, 25, 30, 32, 44, 45, 43, 50, 55, 76, 81, 78, 81],
			], 
			onClick: function (points, evt) {
				console.log(points, evt);
			}
		};
		$scope.chart2 = {
			labels: ["10/11", "11/11", "12/11", "13/11", "14/11", "15/11", "16/11", "17/11", "18/11", "19/11", "20/11", "21/11", "22/11", "23/11", "24/11"], 
			series: ['Lunch', 'Christmas Lunch', 'Naked Sushi'], 
			data: [
				[1203, 2100, 3203, 2100, 2320, 3200, 4305, 4023, 4300, 5402, 5430, 6434, 7540, 9230, 10020, 11021],
				[1203, 2100, 3203, 2100, 2320, 3200, 6434, 4023, 4300, 5430, 4305, 5402, 7540, 9230, 10020, 11021],
				[2304, 2304, 3204, 3230, 3204, 3230, 5403, 6503, 5403, 6503, 6503, 6503, 7604, 7604, 10020, 11021],
			], 
			onClick: function (points, evt) {
				console.log(points, evt);
			}
		};
	}])
	;
})(angular);