/// =====================================================================================
/// 							ADMIN CONTROLLER
/// =====================================================================================

url.controller('adminCtrl',['$scope','$firebase','$moment','$routeParams',function($scope,$firebase,$moment,$routeParams){
	var ref = new Firebase('https://wodvenom.firebaseio.com/wods/');
	
	$scope.wods = $firebase(ref).$asArray();
	
	// Function to add the workout to the database with date beeing 1 day after the current day.
	$scope.addWod = function()
	{
		var today = $moment();
		// Increment the date by 1 so it's posted for the next day the workout
		var tomorrow = $moment(today).add('days', 1);
		// Format the date nicely
		$scope.newWod.time = $moment(tomorrow).format('L');

		// Then only runs one
		$scope.wods.$add($scope.newWod,$scope.newWod.time).then(function()
		{
			$scope.newWod = {};
			$scope.newWod.time = "";
		});
	}
	// Delete the wod
	$scope.destroy = function(r)
	{
		$scope.wods.$remove(r);
	}

	// Update the wod
	$scope.save = function(e)
	{
		
		$scope.wods.$save(e);
	}

}]);